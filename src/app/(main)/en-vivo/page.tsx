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

// --- Función que devuelve los datos estáticos completos ---
function getAllStaticScheduledAndPPVEventsData(): { weeklyShows: LiveOrScheduledEvent[], allPpvEvents: LiveOrScheduledEvent[] } {
  const weeklyShows: LiveOrScheduledEvent[] = [
    // ... Aquí tus shows semanales (igual que antes)
    {
      id: 'wwe-raw-live',
      title: 'WWE Raw',
      league: 'WWE',
      matchup: 'Lunes a las 8:00 PM EST',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      thumbnail: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/12/Ge77Z8_bMAAQofn.jpeg',
      description: 'El show semanal insignia de WWE. Tres horas de acción y drama.',
      dayOfWeek: 1,
      time: '20:00',
    },
    // Agrega los demás shows semanales aquí como en tu código original
  ];

  const allPpvEvents: LiveOrScheduledEvent[] = [
    // ... Tus eventos PPV / especiales (igual que antes)
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
    // Agrega los demás eventos PPV aquí igual que antes
  ];

  return { weeklyShows, allPpvEvents };
}

export default function EnVivoPage() {
  // Define estados afuera de cualquier useEffect
  const [scheduledData, setScheduledData] = useState<{ weeklyShows: LiveOrScheduledEvent[], allPpvEvents: LiveOrScheduledEvent[] } | null>(null);
  const [ppvEvents, setPpvEvents] = useState<LiveOrScheduledEvent[]>([]);

  // useEffect para cargar los datos estáticos al montar el componente
  useEffect(() => {
    const data = getAllStaticScheduledAndPPVEventsData();
    setScheduledData({
      weeklyShows: data.weeklyShows,
      allPpvEvents: data.allPpvEvents,
    });
  }, []);

  // useEffect para filtrar los eventos PPV basado en la fecha, cuando scheduledData cambia
  useEffect(() => {
    if (!scheduledData) return;

    const now = new Date();
    const wednesday25June2025 = new Date(2025, 5, 25, 0, 0, 0);

    if (isAfter(now, wednesday25June2025) || format(now, 'yyyy-MM-dd') === format(wednesday25June2025, 'yyyy-MM-dd')) {
      setPpvEvents(scheduledData.allPpvEvents);
    } else {
      setPpvEvents([]);
    }
  }, [scheduledData]);

  if (!scheduledData) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando programación...</p>
      </div>
    );
  }

  const { weeklyShows } = scheduledData;

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
