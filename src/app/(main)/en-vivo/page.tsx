// src/app/(main)/en-vivo/page.tsx
'use client'; // ¡¡¡IMPORTANTE!!! Esta página es un Client Component.

import React, { useState, useEffect } from 'react'; // Necesitamos useState y useEffect
import Link from 'next/link';
import Image from 'next/image';
import { format, getDay, setHours, setMinutes, isAfter, isBefore, addMinutes, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface LiveOrScheduledEvent {
  id: string;
  title: string;
  league: string;
  matchup: string;
  streamUrl: string;
  thumbnail: string;
  description: string;
  dayOfWeek?: number;
  time?: string;
  dateTime?: string; // ISO string para eventos con fecha y hora específicas
}

// Funciones auxiliares para determinar si un show/PPV está "en vivo" ahora
// Estas funciones se usarán DENTRO de este Client Component
const isShowLive = (show: LiveOrScheduledEvent): boolean => {
  if (show.dayOfWeek === undefined || show.time === undefined) return false;
  const now = new Date();
  const currentDayOfWeek = getDay(now);
  if (show.dayOfWeek !== currentDayOfWeek) {
    return false;
  }
  const [hours, minutes] = show.time.split(':').map(Number);
  let showTimeToday = setMinutes(setHours(now, hours), minutes);
  const liveStartWindow = addMinutes(showTimeToday, -15);
  const liveEndWindow = addMinutes(showTimeToday, 180);
  return isAfter(now, liveStartWindow) && isBefore(now, liveEndWindow);
};

const isPPVLive = (event: LiveOrScheduledEvent): boolean => {
  if (!event.dateTime) return false;
  const now = new Date();
  const eventDateTime = parseISO(event.dateTime);
  const liveStartWindow = addMinutes(eventDateTime, -15);
  const liveEndWindow = addMinutes(eventDateTime, 240);
  return isAfter(now, liveStartWindow) && isBefore(now, liveEndWindow);
};

// --- Función que devuelve los datos estáticos completos (NO ES ASYNC) ---
function getAllStaticScheduledAndPPVEventsData(): { weeklyShows: LiveOrScheduledEvent[], allPpvEvents: LiveOrScheduledEvent[] } {
  const weeklyShows: LiveOrScheduledEvent[] = [
    {
      id: 'wwe-raw-live',
      title: 'WWE Raw',
      league: 'WWE',
      matchup: 'Lunes a las 8:00 PM EST',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      thumbnail: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/12/Ge77Z8_bMAAQofn.jpeg',
      description: 'El show semanal insignia de WWE. Tres horas de acción y drama.',
      dayOfWeek: 1, // Lunes
      time: '20:00', // 8:00 PM
    },
    {
      id: 'wwe-nxt-live',
      title: 'WWE NXT',
      league: 'WWE',
      matchup: 'Martes a las 8:00 PM EST',
      streamUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      thumbnail: 'https://images.cwtv.com/images/masters/cw/universal/shows/wwe-nxt/show-promo.jpg',
      description: 'Las futuras estrellas de WWE en acción, cada martes.',
      dayOfWeek: 2, // Martes
      time: '20:00', // 8:00 PM
    },
    {
      id: 'aew-dynamite-live',
      title: 'AEW Dynamite',
      league: 'AEW',
      matchup: 'Miércoles a las 8:00 PM EST',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      thumbnail: 'https://www.myfmbankarena.com/assets/img/01-08-25-AEW-DYNAMITE-Clarksville-TN-IG-590x380-44f2584034.jpg',
      description: 'El show principal de All Elite Wrestling, con los mejores combates.',
      dayOfWeek: 3, // Miércoles
      time: '20:00', // 8:00 PM
    },
    {
      id: 'wwe-smackdown-live',
      title: 'WWE SmackDown',
      league: 'WWE',
      matchup: 'Viernes a las 8:00 PM EST',
      streamUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      thumbnail: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg',
      description: 'El show azul de WWE con tus superestrellas favoritas.',
      dayOfWeek: 5, // Viernes
      time: '20:00', // 8:00 PM
    },
    {
      id: 'aew-collision-live',
      title: 'AEW Collision',
      league: 'AEW',
      matchup: 'Sábados a las 8:00 PM EST',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BNGU2YWVkMjEtNGE4MC00NWNiLWI2MjgtYTU1YjZhMjdiNjI0XkEyXkFqcGc@._V1_QL75_UX500_CR0,0,500,281_.jpg',
      description: 'Lucha libre de alto impacto en Collision.',
      dayOfWeek: 6, // Sábado
      time: '20:00', // 8:00 PM
    },
  ];

  const allPpvEvents: LiveOrScheduledEvent[] = [ // <-- ESTA VARIABLE SÍ ESTARÁ DEFINIDA
    {
      id: 'mlb',
      title: 'MLB: Reds vs Yankees',
      league: 'MLB',
      matchup: 'Miércoles 25 de Junio, 7:15 PM AST',
      streamUrl: 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/chunks.m3u8',
      thumbnail: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401569746/16x9/1280x720_20240628135918.jpg&showBadge=true&package=ESPN_PLUS_MLB',
      description: 'Duelo de la MLB con los Yankees buscando la victoria en un partido clave.',
      dateTime: '2025-06-25T19:15:00',
    },
    {
      id: 'bsn-1',
      title: 'BSN: Indios de Mayagüez vs Piratas de Quebradillas',
      league: 'BSN',
      matchup: 'Miércoles 25 de Junio, 8:00 PM AST',
      streamUrl: 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/chunks.m3u8',
      thumbnail: 'https://i.ytimg.com/vi/7mW-PKM8nYE/maxresdefault.jpg',
      description: 'Clásico del Baloncesto Superior Nacional de Puerto Rico.',
      dateTime: '2025-06-25T20:00:00',
    },
    {
      id: 'bsn-2',
      title: 'BSN: Osos de Manatí vs Criollos de Caguas',
      league: 'BSN',
      matchup: 'Miércoles 25 de Junio, 8:00 PM AST',
      streamUrl: 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/chunks.m3u8',
      thumbnail: 'https://i.ytimg.com/vi/852XZ9HjuFg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBh2WcIWHlGqmg5bRm0bk2JLWnQGA',
      description: 'Otro emocionante partido del BSN.',
      dateTime: '2025-06-25T20:00:00',
    },
    {
      id: 'bsn-3',
      title: 'BSN: Capitanes de Arecibo vs Vaqueros de Bayamón',
      league: 'BSN',
      matchup: 'Miércoles 25 de Junio, 8:00 PM AST',
      streamUrl: 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/chunks.m3u8',
      thumbnail: 'https://i.ytimg.com/vi/akpYCw9cF_E/maxresdefault.jpg',
      description: 'Choque de titanes en la cancha del BSN.',
      dateTime: '2025-06-25T20:00:00',
    },
    {
      id: 'e',
      title: 'BSN: Leones de Ponce vs Santeros de Aguada',
      league: 'BSN',
      matchup: 'Jueves 26 de Junio, 8:00 PM AST',
      streamUrl: 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/chunks.m3u8',
      thumbnail: 'https://i.ytimg.com/vi/TpZP520nNUc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAf2kJc35WLcNLNDSZB0e9_4TpbbQ',
      description: 'Partido de baloncesto entre Leones y Santeros.',
      dateTime: '2025-06-26T20:00:00',
    },
    {
      id: 'q',
      title: 'MLB: Yankees vs Athletics',
      league: 'MLB',
      matchup: 'Viernes 27 de Junio, 7:15 PM AST',
      streamUrl: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401356109/16x9/1280x720_20220726221639.jpg&showBadge=true&package=ESPN_PLUS_MLB',
      thumbnail: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401356109/16x9/1280x720_20220726221639.jpg&showBadge=true&package=ESPN_PLUS_MLB',
      description: 'Los Yankees en acción contra los Athletics.',
      dateTime: '2025-06-27T19:15:00',
    },
    {
      id: 'evento-1',
      title: 'WWE Night of Champions 2025',
      league: 'WWE PPV',
      matchup: 'Sábado 28 de Junio, 7:00 PM AST',
      streamUrl: 'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=https://3148-209-91-239-6.ngrok-free.app/LiveApp/streams/4Rg5KhuVlJQQfqeN65503110396105.m3u8',
      thumbnail: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg',
      description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
      dateTime: '2025-06-28T19:00:00',
    },
  ];

  return { weeklyShows, allPpvEvents };
}


export default function LiveEventsPage() {
  // Estados para almacenar los shows y PPVs
  const [scheduledData, setScheduledData] = useState<{ weeklyShows: LiveOrScheduledEvent[], ppvEvents: LiveOrScheduledEvent[] } | null>(null);

  // Efecto para cargar los datos cuando el componente se monta
  useEffect(() => {
    // La función que obtiene los datos ahora se llama directamente
    const data = getAllStaticScheduledAndPPVEventsData(); // Esta función ahora no es async
    setScheduledData(data);
  }, []); // Array vacío para que se ejecute solo una vez al montar

  // Lógica de filtrado de PPV basada en la fecha, ahora en el cliente
  const [ppvEvents, setPpvEvents] = useState<LiveOrScheduledEvent[]>([]);

  useEffect(() => {
    // Solo filtra si scheduledData ha cargado
    if (!scheduledData) return; 

    const now = new Date();
    const wednesday25June2025 = new Date(2025, 5, 25, 0, 0, 0); // Mes 5 es Junio (0-indexed)

    if (isAfter(now, wednesday25June2025) || format(now, 'yyyy-MM-dd') === format(wednesday25June2025, 'yyyy-MM-dd')) {
      setPpvEvents(scheduledData.allPpvEvents); // Usa allPpvEvents del estado cargado
    } else {
      setPpvEvents([]); // Vacío si aún no es miércoles 25
    }
  }, [scheduledData]); // Se ejecuta cuando scheduledData cambia (es decir, cuando los datos se cargan)

  // Si los datos aún no se han cargado, muestra un mensaje de carga
  if (!scheduledData) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando programación...</p>
      </div>
    );
  }

  // Desestructurar los shows y PPVs después de que se hayan cargado
  const { weeklyShows } = scheduledData; // ppvEvents ya viene del estado filtrado

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-orange-500">
        En Vivo Ahora / Programación
      </h1>

      <h2 className="text-3xl font-bold mb-6 text-white">Shows Semanales</h2>
      {weeklyShows.length === 0 ? (
        <p className="text-gray-400 mb-8">No hay shows semanales definidos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {weeklyShows.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link href={`/${event.id}`}>
                <div className="relative">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    width={600}
                    height={337}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {isShowLive(event) && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                      EN VIVO
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-gray-400 text-sm mb-1">{event.league}</p>
                  <p className="text-white text-md">{event.matchup}</p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{event.description}</p>
                  <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Ver Transmisión
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-white">Eventos PPV / Especiales</h2>
      {ppvEvents.length === 0 ? (
        <p className="text-gray-400">No hay eventos PPV o especiales programados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ppvEvents.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 transform transition-transform duration-300 hover:scale-105">
              <Link href={`/${event.id}`}>
                <div className="relative">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    width={600}
                    height={337}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {isPPVLive(event) && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                      EN VIVO
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-gray-400 text-sm mb-1">{event.league}</p>
                  <p className="text-white text-md mb-2">
                    {event.dateTime ? format(parseISO(event.dateTime), 'EEEE d \'de\' MMMM, h:mm a', { locale: es }) : 'Fecha y hora por confirmar'}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{event.description}</p>
                  <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Ver Transmisión
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}