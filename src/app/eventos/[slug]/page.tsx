// src/app/eventos/[slug]/page.tsx
import { notFound } from 'next/navigation';
import VideoPlayer from './Player';
import { format } from 'date-fns';

async function getEventDetails(slug: string) {
  const allEventsData = {
    // ... (Mantén todos tus eventos existentes aquí: hero, calendario, etc.)

    // --- NUEVOS EVENTOS EN VIVO ---
    'mlb-live-game': {
      title: 'MLB EN VIVO: Chicago Cubs vs St. Louis Cardinals',
      description: 'Disfruta de este emocionante partido en vivo de las Grandes Ligas de Béisbol. ¡Acción en el diamante!',
      date: 'En Vivo Ahora', // O la fecha/hora actual si quieres ser más específico
      league: 'MLB',
      playbackUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      posterUrl: 'https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0624%2Fr1351508_1296x729_16-9.jpg&w=1280&h=720&scale=crop',
    },
    'wwe-nxt-live': {
      title: 'WWE NXT EN VIVO: Especial Semanal',
      description: 'Transmisión en vivo con las futuras estrellas de la lucha libre. ¡Nuevos talentos, nuevas rivalidades!',
      date: 'En Vivo Ahora',
      league: 'WWE NXT',
      playbackUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      posterUrl: 'https://cdn.wwe.com/f/styles/og_image/public/2023/06/NXT_Brand--e7208034d61c6b12a023023b1c674284.jpg',
    },
    'f1-free-practice': {
      title: 'F1 EN VIVO: Práctica Libre 2 - GP de España',
      description: 'Sigue en vivo la segunda sesión de prácticas del Gran Premio de España. ¡Prepara motores!',
      date: 'En Vivo Ahora',
      league: 'F1',
      playbackUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      posterUrl: 'https://www.formula1.com/content/dam/fom-asset/latest/2024/Spanish-Grand-Prix/GettyImages-2158319688.jpg.transform/feature-component-xl/image.jpg',
    },
    // ... Asegúrate de que los IDs del calendario que te di antes también estén aquí
    // 'mlb-reds-yankees-jun24': {...},
    // 'bsn-leones-gigantes-jun24': {...},
    // y todos los demás que usas en los carruseles de page.tsx
  };

  const event = allEventsData[slug as keyof typeof allEventsData];

  if (!event) {
    notFound();
  }
  return event;
}

// ... (El resto de EventDetailPage permanece igual)
export default async function EventDetailPage({ params }: EventPageProps) {
  // ...
}