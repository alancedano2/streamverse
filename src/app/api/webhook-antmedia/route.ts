// src/app/api/webhook-antmedia/route.ts
import { NextResponse } from 'next/server';
import { getCurrentDate } from '@/utils/date'; // Asumiendo que tienes una utilidad de fecha
import { PROGRAMAS } from '@/utils/program-data'; // Asumiendo que tienes este archivo para los programas

// Esta es una SIMULACIÓN de almacenamiento en memoria para fines de DEMO.
// En producción, DEBES usar una base de datos (Redis, PostgreSQL, etc.)
// para almacenar este estado de forma persistente.
const streamStatuses: { [streamId: string]: { isLive: boolean; lastUpdate: number; streamName?: string; } } = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Webhook de Ant Media recibido:', body);

    const { streamId, action, streamName } = body;

    if (!streamId || !action) {
      return NextResponse.json({ message: 'Missing streamId or action' }, { status: 400 });
    }

    if (action === 'liveStreamStarted') {
      streamStatuses[streamId] = { isLive: true, lastUpdate: Date.now(), streamName };
      console.log(`Stream ${streamId} (${streamName}) is now LIVE.`);

      // Lógica para enviar a Discord
      const now = new Date();
      const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long', locale: 'es' }).toLowerCase(); // "lunes"
      const programaDelDia = PROGRAMAS[dayOfWeek]; // Usa tu estructura PROGRAMAS

      if (programaDelDia && streamName?.includes(programaDelDia.nombre)) { // Ajusta la condición si el streamName de Ant Media coincide con el nombre de tu programa
        const discordMessage = {
          embeds: [
            {
              title: `¡${programaDelDia.nombre} EN VIVO!`,
              description: programaDelDia.mensaje,
              url: programaDelDia.link,
              color: 65280, // Verde
              image: { url: programaDelDia.logo_url },
              fields: [{ name: 'Ver en vivo aquí:', value: programaDelDia.link }],
              footer: { text: `Detectado a las ${now.toLocaleTimeString('es-PR', { hour: '2-digit', minute: '2-digit', hour12: true })} AST` },
            },
          ],
        };
        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // Asegúrate de tener esta variable de entorno
        if (discordWebhookUrl) {
          const discordResponse = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordMessage),
          });
          if (!discordResponse.ok) {
            console.error('Error al enviar mensaje a Discord:', discordResponse.status, await discordResponse.text());
          }
        } else {
          console.warn('DISCORD_WEBHOOK_URL no está configurada.');
        }
      }

    } else if (action === 'liveStreamEnded') {
      streamStatuses[streamId] = { isLive: false, lastUpdate: Date.now(), streamName };
      console.log(`Stream ${streamId} (${streamName}) is now OFFLINE.`);
      // Opcional: Podrías enviar una notificación a Discord de que el stream terminó
    }

    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Ant Media webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
