// src/app/(main)/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import EventCalendar from '@/components/EventCalendar'; // ¡Este se queda!
import EventDetailsModal from '@/components/EventDetailsModal'; // Si aún usas el modal

// NO USAMOS events.ts. La lista de eventos se define aquí.
import { format, parseISO, isAfter, isBefore, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

interface EventItem {
  id: string;
  title: string;
  league: string;
  dateTime: string; // Formato ISO 8601
  link: string; // Enlace a la página del evento
  description: string;
  posterUrl: string; // ¡NUEVO! Propiedad para la URL de la imagen del evento
  isLive?: boolean; // Opcional, si un evento se considera 'en vivo' siempre
}

// **** ¡IMPORTANTE! LA LISTA DE EVENTOS AHORA ESTÁ AQUÍ MISMO CON SUS IMÁGENES ****
const allEventsForHero: EventItem[] = [
  // MIÉRCOLES 25 DE JUNIO DE 2025 (Ejemplo, usa tus fechas de eventos reales aquí)
  {
    id: 'wwe-raw',
    title: 'WWE Raw',
    league: 'WWE',
    dateTime: '2025-07-07T20:00:00', // Lunes, 7 de Julio de 2025, 8:00 PM AST
    link: '/wwe-raw-live',
    description: 'El show semanal insignia de WWE. ¡En vivo!',
    posterUrl: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/12/Ge77Z8_bMAAQofn.jpeg',
    isLive: true, // Ejemplo: si siempre es considerado en vivo
  },
  {
    id: 'macys-fireworks',
    title: 'Macy\'s 4th of July Fireworks Show',
    league: 'TV',
    dateTime: '2025-07-04T20:00:00', // Viernes, 4 de Julio de 2025, 8:00 PM AST
    link: '/evento-2',
    description: 'El espectáculo de fuegos artificiales más icónico del 4 de Julio.',
    posterUrl: 'https://deadline.com/wp-content/uploads/2022/06/Fourth-of-July-Fireworks.jpg?w=1000',
  },
  {
    id: 'bsn-capitanes-atleticos',
    title: 'BSN: Capitanes de Arecibo vs Atleticos de San German',
    league: 'BSN',
    dateTime: '2025-06-30T20:00:00', // Lunes, 30 de Junio de 2025, 8:00 PM AST
    link: '/bsn-2',
    description: 'Otro emocionante partido del BSN.',
    posterUrl: 'https://i.ytimg.com/vi/edz5ORsTsM8/maxresdefault.jpg',
  },
  {
    id: 'bsn-capitanes-vaqueros',
    title: 'BSN: Capitanes de Arecibo vs Vaqueros de Bayamón',
    league: 'BSN',
    dateTime: '2025-06-25T20:00:00', // Miércoles, 25 de Junio de 2025, 8:00 PM AST
    link: '/bsn-3',
    description: 'Choque de titanes en la cancha del BSN.',
    posterUrl: 'https://i.ytimg.com/vi/akpYCw9cF_E/maxresdefault.jpg',
  },

  // JUEVES 26 DE JUNIO DE 2025
  {
    id: 'bsn-leones-santeros',
    title: 'BSN: Leones de Ponce vs Santeros de Aguada',
    league: 'BSN',
    dateTime: '2025-06-26T20:00:00', // Jueves, 26 de Junio de 2025, 8:00 PM AST
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Leones y Santeros.',
    posterUrl: 'https://i.ytimg.com/vi/eK5C2lFu4Vk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBomgHAfrm5UGTdvyw9NVys6qgf2Q',
  },
  {
    id: 'wwe-night-of-champions-kickoff',
    title: 'WWE Night Of Champions KickOff',
    league: 'WWE',
    dateTime: '2025-06-26T16:00:00', // Jueves, 26 de Junio de 2025, 4:00 PM AST
    link: '/evento-1',
    description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
    posterUrl: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg',
  },

  // VIERNES 27 DE JUNIO DE 2025
  {
    id: 'canelo-crawford-press-conference',
    title: 'Canelo vs. Crawford: Las Vegas Press Conference',
    league: 'PPV',
    dateTime: '2025-06-27T19:00:00', // Viernes, 27 de Junio de 2025, 7:00 PM AST
    link: '/evento-2',
    description: 'Watch the Canelo vs. Crawford: Las Vegas Press Conference on Friday, June 27 at 7 PM',
    posterUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/TMNDWSE35NFG3DNMNGGDFS5J5M.jpg',
  },
  {
    id: 'wwe-smackdown',
    title: 'WWE SmackDown',
    league: 'WWE',
    dateTime: '2025-06-27T20:00:00', // Viernes, 27 de Junio de 2025, 8:00 PM AST
    link: '/wwe-smackdown-live', // Enlace a la página de SmackDown Live si aplica
    description: 'El show azul de WWE con tus superestrellas favoritas.',
    posterUrl: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg',
  },
  {
    id: 'bsn-criollos-osos',
    title: 'Criollos de Caguas vs. Osos de Manatí',
    league: 'BSN',
    dateTime: '2025-06-27T20:00:00', // Viernes, 27 de Junio de 2025, 8:00 PM AST
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Criollos de Caguas y Osos de Manatí.',
    posterUrl: 'https://example.com/bsn-criollos-osos.jpg', // Reemplaza con una URL real
  },
  {
    id: 'bsn-mets-cangrejeros',
    title: 'Mets de Guaynabo vs. Cangrejeros de Santurce',
    league: 'BSN',
    dateTime: '2025-06-27T20:00:00', // Viernes, 27 de Junio de 2025, 8:00 PM AST
    link: '/bsn-2',
    description: 'Partido de baloncesto entre Mets de Guaynabo y Cangrejeros de Santurce.',
    posterUrl: 'https://example.com/bsn-mets-cangrejeros.jpg', // Reemplaza con una URL real
  },

  // SÁBADO 28 DE JUNIO DE 2025
  {
    id: 'jake-paul-chavez',
    title: 'Jake Paul vs Julio Cesar Chavez - DAZN PPV',
    league: 'DAZNPPV',
    dateTime: '2025-06-28T15:00:00', // Sábado, 28 de Junio de 2025, 3:00 PM AST
    link: '/evento-1',
    description: 'Evento de pago por evento de DAZN',
    posterUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/TMNDWSE35NFG3DNMNGGDFS5J5M.jpg', // Usando la misma que la conferencia
  },
  {
    id: 'bsn-santeros-capitanes',
    title: 'BSN: Santeros de Aguada vs Capitanes de Arecibo',
    league: 'BSN',
    dateTime: '2025-06-28T20:00:00', // Sábado, 28 de Junio de 2025, 8:00 PM AST
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Santeros y Capitanes.',
    posterUrl: 'https://example.com/bsn-santeros-capitanes.jpg', // Reemplaza con una URL real
  },
  {
    id: 'mlb-yankees',
    title: 'MLB: Yankees vs Athletics',
    league: 'MLB',
    dateTime: '2025-07-07T18:50:00', // Lunes, 7 de Julio, 6:50 PM AST
    link: '/mlb',
    description: 'Los Yankees en acción contra los Athletics.',
    posterUrl: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401356109/16x9/1280x720_20220726221639.jpg&showBadge=true&package=ESPN_PLUS_MLB',
  },
];

// Función para determinar si un evento debe aparecer en el Hero HOY
const isHeroEventRelevant = (event: EventItem): boolean => {
  if (!event.dateTime) return false; 

  const now = new Date(); 
  const eventDateTime = parseISO(event.dateTime); 

  const startWindow = addMinutes(eventDateTime, -60); 
  const endWindow = addMinutes(eventDateTime, 300); 

  return isAfter(now, startWindow) && isBefore(now, endWindow);
};


export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); 

    const timeToMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date()); 
    }, timeToMidnight + 1000); 

    return () => clearTimeout(timer); 
  }, [currentDate]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);

  const heroCandidates = allEventsForHero.filter(event => 
    isHeroEventRelevant(event) 
  );

  const defaultHeroEvents = [
    allEventsForHero.find(e => e.id === 'wwe-raw'), 
    allEventsForHero.find(e => e.id === 'macys-fireworks'),    
    allEventsForHero.find(e => e.id === 'jake-paul-chavez'),    
  ].filter(Boolean) as EventItem[];

  const finalHeroEvents = heroCandidates.length > 0 ? heroCandidates : defaultHeroEvents;

  const formattedHeroEvents = finalHeroEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: event.dateTime ? format(parseISO(event.dateTime), 'EEEE d \'de\' MMMM, h:mm a', { locale: es }) : event.description,
    description: event.description,
    bgImage: event.posterUrl, // ¡Ahora usamos la posterUrl del evento!
    link: event.link,
  }));

  const trendingEvents = [
    { id: 'wwe-smackdown-trending', title: 'Tonight WWE Raw Preview - Fallout from Night of Champions', thumbnail: 'https://www.pwmania.com/wp-content/uploads/2025/03/raw-logo.jpg', link: 'https://www.wrestlingnewssource.com/news/94204/Tonights-WWE-Raw-Preview-Fallout-from-Night-of/' },
    { id: 'mlb-power-rankings', title: 'WWE Night Of Champion Results (June 28, 2025) – Riyadh, Saudi Arabia', thumbnail: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg', link: 'https://ewrestling.com/article/wwe-night-of-champion-results-june-28-2025-riyadh-saudi-arabia/' },
  ];

  const newEvents = [
    { id: 'nba-finals-takeaways', title: 'Resumen de noticias de la WWE: Excampeón mundial de peso pesado planea no volver a luchar; ¿Jey Uso fue degradado? Actualización desafortunada sobre Drew McIntyre', thumbnail: 'https://i0.wp.com/www.prwrestling.com/nw/wp-content/uploads/2025/06/drew-uso.jpg?w=1280&quality=89&ssl=1', link: 'https://www.prwrestling.com/nw/resumen-de-noticias-de-la-wwe-excampeon-mundial-de-peso-pesado-planea-no-volver-a-luchar-jey-uso-fue-degradado-actualizacion-desafortunada-sobre-drew-mcintyre/' },
    { id: 'yankees-prospects', title: 'WWE SmackDown Results 6/27', thumbnail: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg', link: 'https://www.wwe.com/shows/smackdown/2025-06-27' },
    { id: 'f1-austrian-gp-analysis', title: 'AEW All In: Texas Set To Break Non-WWE Event Records For Attendance And Gate', thumbnail: 'https://www.pwmania.com/wp-content/uploads/2025/06/all-in-texas.jpg', link: 'https://www.pwmania.com/aew-all-in-texas-set-to-break-non-wwe-event-records-for-attendance-and-gate' },
    { id: 'telemundo-pr', title: 'Hamilton explains ‘not spectacular’ start in Austria as Leclerc admits Ferrari have ‘a lot of work’ to do', thumbnail: 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Austria/Hamilton%20Leclerc%20header%20image%20Austria%20Friday.webp', link: 'https://www.formula1.com/en/latest/article/hamilton-explains-not-spectacular-start-in-austria-as-leclerc-admits-ferrari.6YpqT6Eraipy0eRWD6FcL9' },
  ];

  const handleEventClick = (event: EventItem) => {
    setSelectedEventForModal(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventForModal(null);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* El HeroSection ahora muestra los eventos dinámicos basados en la fecha y con sus propias imágenes */}
      <HeroSection events={formattedHeroEvents} />
      
      {/* ¡Y aquí está tu EventCalendar, tal como lo quieres! */}
      <EventCalendar /> 

      <ContentCarousel title="Tendencias Ahora" events={trendingEvents} />
      <ContentCarousel title="Novedades" events={newEvents} />

      {/* Renderizar el modal si está abierto */}
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEventForModal}
      />
    </div>
  );
}
