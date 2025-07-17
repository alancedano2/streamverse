// src/components/EventCalendar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface EventItem {
  id: string;
  title: string;
  league: string;
  dateTime: string; // Formato ISO 8601
  link: string; // Enlace a la página del evento
  description: string;
}

// **Todos los eventos disponibles en tu sistema**
// Estos son los eventos que el calendario filtrará por día.
const allEvents: EventItem[] = [
  // MIÉRCOLES 25 DE JUNIO DE 2025
{
  id: 'MLB',
  title: 'NBA: Miami Heat vs Milwaukee Bucks',
  league: 'NBA 2K26 Summer League',
  dateTime: '2025-07-18T19:00:00',
  link: 'https://streamverse-eventos.vercel.app/eventos/nba-heat-bucks',
  description: '¡Duelo de la Conferencia Este! El Heat se enfrenta a los Bucks en un partido clave con sus estrellas buscando la victoria. Prepárate para triples, clavadas y defensa de élite.',
},
{
  id: 'WWE',
  title: 'MLB: New York Yankees vs Atlanta Braves',
  league: 'MLB',
  dateTime: '2025-07-18T19:15:00',
  link: 'https://streamverse-eventos.vercel.app/eventos/mlb-yankees-braves',
  description: '¡Un choque de titanes en el diamante! Los Yankees reciben a los Braves en un emocionante duelo de interligas con promesas de jonrones y jugadas espectaculares. No te pierdas cada lanzamiento.',
},
{
  id: 'NBA',
  title: 'WWE SmackDown',
  league: 'WWE',
  dateTime: '2025-07-18T20:00:00',
  link: 'https://streamverse-eventos.vercel.app/eventos/wwe-smackdown',
  description: 'Los Raptors y Nuggets se enfrentan en un partido clave de la Summer League.',
},
{
  id: 'NBA',
  title: 'NBA: Denver Nuggets vs Los Angeles Lakers',
  league: 'NBA 2K26 Summer League',
  dateTime: '2025-07-18T22:00:00',
  link: 'https://streamverse-eventos.vercel.app/eventos/nba-nuggets-lakers',
  description: '¡Batalla de pesos pesados del Oeste! Los campeones Nuggets reciben a los Lakers en un enfrentamiento lleno de rivalidad y talento. Un partido imperdible para los amantes del baloncesto.',
},
{
  id: 'NBA',
  title: 'NBA: Portland Trail Blazers vs New Orleans Pelicans',
  league: 'NBA 2K26 Summer League',
  dateTime: '2025-07-10T22:00:00',
  link: '/evento-7',
  description: 'Trail Blazers y Pelicans se enfrentan en un duelo de futuras estrellas.',
},
{
  id: 'NBA',
  title: 'NBA: Golden State Warrions vs Memphis Grizzlies',
  league: 'NBA 2K26 Summer League',
  dateTime: '2025-07-10T22:30:00',
  link: '/evento-8',
  description: 'Warriors vs Grizzlies promete cerrar la jornada con un espectáculo vibrante.',
},


  // JUEVES 26 DE JUNIO DE 2025
  {
    id: 'bsn-leones-santeros-calendar-thursday',
    title: 'BSN: Leones de Ponce vs Santeros de Aguada',
    league: 'BSN',
    dateTime: '2025-06-26T20:00:00', // Jueves 26 de Junio, 8:00 PM AST
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Leones y Santeros.',
  },
  {
    id: 'wwe',
    title: 'WWE Night Of Champions KickOff',
    league: 'WWE',
    dateTime: '2025-06-26T16:00:00', // Jueves 26 de Junio, 8:00 PM AST
    link: '/evento-1',
    description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
  },

  // VIERNES 27 DE JUNIO DE 2025
  {
    id: 'ppv01',
    title: 'Canelo vs. Crawford: Las Vegas Press Conference',
    league: 'PPV',
    dateTime: '2025-06-27T19:00:00', // Viernes 27 de Junio, 7:15 PM AST
    link: '/evento-2',
    description: 'Watch the Canelo vs. Crawford: Las Vegas Press Conference on Friday, June 27 at 7 PM',
  },
  {
    id: 'wwe-smackdown',
    title: 'WWE SmackDown',
    league: 'WWE',
    dateTime: '2025-06-27T20:00:00', // Viernes 27 de Junio, 7:15 PM AST
    link: '/wwe-smackdown',
    description: 'El show azul de WWE con tus superestrellas favoritas.',
  },
  {
    id: 'bsnpr',
    title: 'Criollos de Caguas vs. Osos de Manatí',
    league: 'BSN',
    dateTime: '2025-06-27T20:00:00', // Viernes 27 de Junio, 7:15 PM AST
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Criollos de Caguas y Osos de Manatí.',
  },
  {
    id: 'bsnpr',
    title: 'Mets de Guaynabo vs. Cangrejeros de Santurce',
    league: 'BSN',
    dateTime: '2025-06-27T20:00:00', // Viernes 27 de Junio, 7:15 PM AST
    link: '/bsn-2',
    description: 'Partido de baloncesto entre Mets de Guaynabo y Cangrejeros de Santurce.',
  },


  // SÁBADO 28 DE JUNIO DE 2025
  {
    id: 'wwe-night-of-champions-2025-calendar-saturday',
    title: 'Jake Paul vs Julio Cesar Chavez - DAZN PPV',
    league: 'DAZNPPV',
    dateTime: '2025-06-28T15:00:00', // Sábado 28 de Junio, 7:00 PM AST
    link: '/evento-1',
    description: 'Evento de pago por evento de DAZN',
  },
  {
    id: 'bsnpr',
    title: 'BSN: Santeros de Aguada vs Capitanes de Arecibo',
    league: 'BSN',
    dateTime: '2025-06-28T20:00:00', // Sábado 28 de Junio, 7:00 PM AST
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Santeros y Capitanes.',
  },
  // Puedes añadir más eventos aquí para otros días
];

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyEvents, setDailyEvents] = useState<EventItem[]>([]);

  // Función para obtener eventos para una fecha específica
  const getEventsForDate = (date: Date): EventItem[] => {
    const dateString = format(date, 'yyyy-MM-dd');
    return allEvents.filter(event => format(parseISO(event.dateTime), 'yyyy-MM-dd') === dateString);
  };

  useEffect(() => {
    // Actualizar los eventos diarios cuando la fecha cambie
    const eventsToday = getEventsForDate(currentDate);
    // Ordenar eventos por hora
    eventsToday.sort((a, b) => parseISO(a.dateTime).getTime() - parseISO(b.dateTime).getTime());
    setDailyEvents(eventsToday);

    // Configurar un temporizador para actualizar la fecha a la medianoche del día siguiente
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Establece la hora a medianoche del día siguiente

    const timeToMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date()); // Actualiza la fecha a la nueva fecha (mañana)
    }, timeToMidnight + 1000); // Añade un segundo extra para asegurar que cruza la medianoche

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, [currentDate]); // Dependencia: re-ejecutar cuando currentDate cambie

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Eventos para {format(currentDate, 'EEEE d \'de\' MMMM \'del\' yyyy', { locale: es })}
      </h2>
      <div className="space-y-4">
        {dailyEvents.length > 0 ? (
          dailyEvents.map(event => (
            <Link href={event.link} key={event.id} className="block">
              <div className="bg-gray-700 hover:bg-gray-600 p-4 rounded-md flex items-center justify-between transition-colors duration-200 cursor-pointer">
                <div>
                  <p className="text-lg font-semibold text-orange-400">{event.title}</p>
                  <p className="text-gray-300 text-sm">{event.league}</p>
                  <p className="text-gray-400 text-xs">{event.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-gray-200 text-md">
                    {format(parseISO(event.dateTime), 'h:mm a', { locale: es })}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center text-lg">No hay eventos programados para hoy.</p>
        )}
      </div>
    </div>
  );
}
