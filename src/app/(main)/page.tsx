// src/app/(main)/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import EventCalendar from '@/components/EventCalendar';
import EventDetailsModal from '@/components/EventDetailsModal';

import { format, parseISO, isAfter, isBefore, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

interface EventItem {
  id: string;
  title: string;
  league: string;
  matchup: string; // ¡NUEVO! Añadido para resolver el error de tipo del modal
  dateTime: string;
  link: string;
  description: string;
  posterUrl: string;
  isLive?: boolean;
}

const allEventsForHero: EventItem[] = [
  {
    id: 'wwe-raw',
    title: 'WWE Raw',
    league: 'WWE',
    matchup: 'Superestrellas de Raw', // Valor por defecto
    dateTime: '2025-07-07T20:00:00',
    link: '/wwe-raw-live',
    description: 'El show semanal insignia de WWE. ¡En vivo!',
    posterUrl: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/12/Ge77Z8_bMAAQofn.jpeg',
    isLive: true,
  },
  {
    id: 'wwe-nxt',
    title: 'WWE NXT',
    league: 'WWE',
    matchup: 'Superestrellas de Raw', // Valor por defecto
    dateTime: '2025-07-08T20:00:00',
    link: '/wwe-nxt-live',
    description: 'El show semanal insignia de WWE. ¡En vivo!',
    posterUrl: 'https://images.cwtv.com/images/masters/cw/universal/shows/wwe-nxt/show-promo.jpg',
  },
  {
    id: 'aew',
    title: 'AEW Dynamite',
    league: 'AEW',
    matchup: 'Superestrellas de AEW', // Valor por defecto
    dateTime: '2025-07-9T20:00:00',
    link: '/evento-1',
    description: 'El show semanal insignia de AEW. ¡En vivo!',
    posterUrl: 'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/07/AEW-Dynamite-Logo.jpg',
  },
  {
    id: 'aew',
    title: 'AEW Collision',
    league: 'AEW',
    matchup: 'Superestrellas de AEW', // Valor por defecto
    dateTime: '2025-07-10T20:00:00',
    link: '/evento-2',
    description: 'El show semanal insignia de AEW. ¡En vivo!',
    posterUrl: 'https://i.ytimg.com/vi/akpYCw9cF_E/maxresdefault.jpg',
  },
  {
    id: 'tna',
    title: 'TNA Impact ',
    league: 'TNA',
    matchup: 'El show semanal insignia de TNA. ¡En vivo!', // Valor por defecto
    dateTime: '2025-07-10T20:00:00',
    link: '/evento-3',
    description: 'El show semanal insignia de TNA. ¡En vivo!',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/TNA-logo-June-2024-v2.png',
  },
  {
    id: 'wwe',
    title: 'WWE SmackDown',
    league: 'WWE',
    matchup: 'El show semanal insignia de WWE. ¡En vivo!', // Valor por defecto
    dateTime: '2025-07-11T20:00:00',
    link: '/wwe-smackdown-live',
    description: 'El show semanal insignia de WWE. ¡En vivo!',
    posterUrl: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg',
  },
  {
    id: 'AEW',
    title: 'AEW All In',
    league: 'PPV',
    matchup: 'PPV', // Valor por defecto
    dateTime: '2025-07-12T15:00:00',
    link: '/evento-1',
    description: 'Watch AEW All In on Saturday, July 12 at 2 PM',
    posterUrl: 'https://static.wixstatic.com/media/815952_d2985c855b364b5780ecbc21837bf442~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90/AEW-All-In-r3-X.jpg',
  },
  {
    id: 'wwe',
    title: 'NXT The Great American Bash',
    league: 'WWE',
    matchup: 'Estrellas de NXT', // Valor por defecto
    dateTime: '2025-07-12T15:00:00',
    link: '/evento-2',
    description: 'Watch NXT The Great American Bash on Saturday, July 12 at 3 PM',
    posterUrl: 'https://en.wikipedia.org/wiki/NXT_The_Great_American_Bash_%282025%29',
  },
  {
    id: 'wwe',
    title: 'WWE Saturday Night Main Event',
    league: 'WWE',
    matchup: 'WWE', // Valor por defecto
    dateTime: '2025-07-12T20:00:00',
    link: '/evento-3',
    description: 'Watch WWE Saturday Night Main Event on Saturday, July 12 at 8 PM',
    posterUrl: 'https://s.yimg.com/ny/api/res/1.2/Iky2rp2RF758ZENCPJ_NWw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MDtjZj13ZWJw/https://media.zenfs.com/en/wrestle_zone_910/190452fddfe03c41ac8e5ee26438cb06',
  },
  {
    id: 'wwe',
    title: 'WWE Evolution',
    league: 'WWE',
    matchup: 'WWE', // Valor por defecto
    dateTime: '2025-07-12T20:00:00',
    link: '/evento 3',
    description: 'Partido de baloncesto entre Mets de Guaynabo y Cangrejeros de Santurce.',
    posterUrl: 'https://i.ytimg.com/vi/edz5ORsTsM8/maxresdefault.jpg',
  },
  {
    id: 'jake-paul-chavez',
    title: 'Jake Paul vs Julio Cesar Chavez - DAZN PPV',
    league: 'DAZNPPV',
    matchup: 'Jake Paul vs Julio Cesar Chavez', // Valor por defecto
    dateTime: '2025-06-28T15:00:00',
    link: '/evento-1',
    description: 'Evento de pago por evento de DAZN',
    posterUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/TMNDWSE35NFG3DNMNGGDFS5J5M.jpg',
  },
  {
    id: 'bsn-santeros-capitanes',
    title: 'BSN: Santeros de Aguada vs Capitanes de Arecibo',
    league: 'BSN',
    matchup: 'Santeros vs Capitanes', // Valor por defecto
    dateTime: '2025-06-28T20:00:00',
    link: '/bsn-1',
    description: 'Partido de baloncesto entre Santeros y Capitanes.',
    posterUrl: 'https://i.ytimg.com/vi/akpYCw9cF_E/maxresdefault.jpg',
  },
  {
    id: 'mlb-yankees',
    title: 'MLB: Yankees vs Athletics',
    league: 'MLB',
    matchup: 'Yankees vs Athletics', // Valor por defecto
    dateTime: '2025-06-07T18:50:00',
    link: '/mlb',
    description: 'Los Yankees en acción contra los Athletics.',
    posterUrl: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401356109/16x9/1280x720_20220726221639.jpg&showBadge=true&package=ESPN_PLUS_MLB',
  }
];

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
    bgImage: event.posterUrl,
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
