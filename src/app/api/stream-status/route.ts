// src/app/api/stream-status/route.ts
import { NextResponse } from 'next/server';

// Esta es la misma SIMULACIÓN de almacenamiento en memoria.
// En producción, DEBES usar una base de datos para almacenar este estado.
const streamStatuses: { [streamId: string]: { isLive: boolean; lastUpdate: number; streamName?: string; } } = {};

// Solo para fines de demostración en un entorno sin base de datos real
// Es necesario que el `webhook-antmedia` y este endpoint compartan la misma instancia de `streamStatuses`
// lo cual en un despliegue serverless real NO PASARÁ a menos que uses una base de datos compartida.
// Para hacer que este ejemplo funcione en Vercel sin una DB, necesitarías Upstash Redis.
// Sin una DB, cada invocación de la API route es independiente y `streamStatuses` se resetearía.

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const streamId = searchParams.get('streamId');

  if (!streamId) {
    return NextResponse.json({ message: 'Missing streamId parameter' }, { status: 400 });
  }

  // En un entorno real, aquí consultarías tu base de datos
  const status = streamStatuses[streamId] || { isLive: false, lastUpdate: 0, streamName: 'Unknown' };

  return NextResponse.json({
    streamId: streamId,
    isLive: status.isLive,
    lastUpdate: status.lastUpdate,
    streamName: status.streamName,
  });
}
