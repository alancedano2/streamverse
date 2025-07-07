// src/app/api/send-wwe-message/route.ts
import { NextResponse } from 'next/server';

// **¡IMPORTANTE!** Esta debe ser la URL del Webhook de Discord que copiaste.
// Idealmente, guárdala en una variable de entorno para producción (ej. process.env.DISCORD_WEBHOOK_URL)
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1391930158876987535/_a1LHu9d8CsHZ36zcn3IG6W5V9es0ygBrakwaMf1wrO1hRe5Aowyd0i_qXcI53sF30Wo'; // ¡Reemplaza esto!

export async function POST(request: Request) { // Usamos POST para que solo se active cuando lo llamen
  try {
    const { program } = await request.json(); // Esperamos que nos envíen el nombre del programa

    let title = '';
    let description = '';
    let imageUrl = ''; // URL del logo del programa
    let pageLink = ''; // Enlace a la página del programa

    // Lógica para personalizar el mensaje según el programa
    switch (program) {
      case 'WWE Raw':
        title = '¡WWE Raw está por comenzar!';
        description = 'Entren a la página para ver la acción en vivo. ¡No se lo pierdan!';
        imageUrl = 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/12/Ge77Z8_bMAAQofn.jpeg'; // Cambia esto por la URL real de tu logo
        pageLink = 'https://streamverse-neon.vercel.app/wwe-raw-live'; // Cambia esto por la URL real
        break;
      case 'WWE NXT':
        title = '¡Es martes de WWE NXT!';
        description = 'Sintoniza ya la acción en la página. ¡Hoy hay sorpresas!';
        imageUrl = 'URL_DEL_LOGO_WWE_NXT.png'; // Cambia esto por la URL real de tu logo
        pageLink = 'https://streamverse-neon.vercel.app/wwe-nxt-live'; // Cambia esto por la URL real
        break;
      case 'WWE SmackDown':
        title = '¡Llegó el viernes con WWE SmackDown!';
        description = 'Entren a la página y disfruten del show. ¡Prepárense para la acción!';
        imageUrl = 'URL_DEL_LOGO_WWE_SMACKDOWN.png'; // Cambia esto por la URL real de tu logo
        pageLink = 'https://streamverse-neon.vercel.app/wwe-smackdown-live'; // Cambia esto por la URL real
        break;
      default:
        title = '¡Evento especial en StreamVerse!';
        description = 'Un nuevo programa está por empezar. ¡Visita la página!';
        imageUrl = 'URL_GENERICA_DE_STREAMVERSE.png';
        pageLink = 'https://streamverse-neon.vercel.app/';
        break;
    }

    const discordMessage = {
      embeds: [
        {
          title: title,
          description: description,
          url: pageLink,
          color: 3447003, // Un color azul para Discord (puedes cambiarlo)
          image: { url: imageUrl },
          fields: [
            { name: 'Ver en vivo aquí:', value: pageLink },
          ],
          footer: {
            text: `Mensaje automático de StreamVerse`,
          },
        },
      ],
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    });

    if (response.ok) {
      console.log(`Mensaje de Discord para ${program} enviado con éxito.`);
      return NextResponse.json({ message: `Discord message for ${program} sent successfully.` }, { status: 200 });
    } else {
      const errorText = await response.text();
      console.error(`Error al enviar mensaje de Discord para ${program}:`, response.status, errorText);
      return NextResponse.json({ message: `Failed to send Discord message for ${program}`, error: errorText }, { status: response.status });
    }
  } catch (error) {
    console.error('Error en la API Route:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}
