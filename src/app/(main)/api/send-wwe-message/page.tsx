// src/app/(main)/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import EventCalendar from '@/components/EventCalendar';
import EventDetailsModal from '@/components/EventDetailsModal'; // Puede que ya no necesites el modal aquí
import { allEventsData, EventItem } from '@/data/events';
import { format, parseISO, isAfter, isBefore, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

// Helper function to determine if an event is currently "relevant" for the Hero.
// This is similar to isShowLive or isPPVLive, but can be tailored for the Hero section.
const isHeroEventRelevant = (event: EventItem): boolean => {
  if (!event.dateTime && !event.isLive) return false; // Must have a date/time or be explicitly live

  const now = new Date();

  if (event.isLive) {
    // If it's explicitly marked as live, always show it.
    // You might add a time window here too if 'isLive' is just a flag
    // and you want it to appear only during a certain window.
    return true;
  }

  if (event.dateTime) {
    const eventDateTime = parseISO(event.dateTime);
    const startWindow = addMinutes(eventDateTime, -60); // Show 60 mins before
    const endWindow = addMinutes(eventDateTime, 300); // Show 5 hours after (assuming it's a long event or recap period)

    return isAfter(now, startWindow) && isBefore(now, endWindow);
  }

  return false;
};


export default function HomePage() {
  // No necesitamos currentDate o dailyEventsForModal si EventCalendar maneja su estado internamente
  // y no usamos un modal de detalles desde aquí.
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [dailyEventsForModal, setDailyEventsForModal] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);

  // Filter and prepare events for the Hero Section
  const heroCandidates = allEventsData.filter(event => 
    isHeroEventRelevant(event) // Filter by relevance
  );

  // If no relevant events, you can choose some default ones or leave it empty.
  // Here, we ensure some key events are always available in the rotation if no relevant ones are found.
  const defaultHeroEvents = [
    allEventsData.find(e => e.id === 'wwe-raw-live'),
    allEventsData.find(e => e.id === 'evento-2'), // Macy's Fireworks
    allEventsData.find(e => e.id === 'evento-1'), // Jake Paul PPV
  ].filter(Boolean) as EventItem[]; // Filter out undefined and cast to EventItem[]

  const finalHeroEvents = heroCandidates.length > 0 ? heroCandidates : defaultHeroEvents;


  const formattedHeroEvents = finalHeroEvents.map(event => ({
    id: event.id,
    title: event.title,
    // Format the date/time for display in the Hero section
    date: event.dateTime ? format(parseISO(event.dateTime), 'EEEE d \'de\' MMMM, h:mm a', { locale: es }) : event.description,
    description: event.description,
    bgImage: event.posterUrl, // This is the 'logo' or background image
    link: event.link,
  }));


  // Trending and New Events can remain as they are or be dynamically filtered from allEventsData
  // if they represent actual events and not just news articles.
  const trendingEvents = [
    { id: 'wwe-raw-preview', title: 'Tonight WWE Raw Preview - Fallout from Night of Champions', thumbnail: 'https://www.pwmania.com/wp-content/uploads/2025/03/raw-logo.jpg', link: 'https://www.wrestlingnewssource.com/news/94204/Tonights-WWE-Raw-Preview-Fallout-from-Night-of/' },
    { id: 'wwe-noc-results', title: 'WWE Night Of Champion Results (June 28, 2025) – Riyadh, Saudi Arabia', thumbnail: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg', link: 'https://ewrestling.com/article/wwe-night-of-champion-results-june-28-2025-riyadh-saudi-arabia/' },
  ];

  const newEvents = [
    { id: 'wwe-news-summary', title: 'Resumen de noticias de la WWE: Excampeón mundial de peso pesado planea no volver a luchar; ¿Jey Uso fue degradado? Actualización desafortunada sobre Drew McIntyre', thumbnail: 'https://i0.wp.com/www.prwrestling.com/nw/wp-content/uploads/2025/06/drew-uso.jpg?w=1280&quality=89&ssl=1', link: 'https://www.prwrestling.com/nw/resumen-de-noticias-de-la-wwe-excampeon-mundial-de-peso-pesado-planea-no-volver-a-luchar-jey-uso-fue-degradado-actualizacion-desafortunada-sobre-drew-mcintyre/' },
    { id: 'yankees-prospects', title: 'WWE SmackDown Results 6/27', thumbnail: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg', link: 'https://www.wwe.com/shows/smackdown/2025-06-27' },
    { id: 'f1-austrian-gp-analysis', title: 'AEW All In: Texas Set To Break Non-WWE Event Records For Attendance And Gate', thumbnail: 'https://www.pwmania.com/wp-content/uploads/2025/06/all-in-texas.jpg', link: 'https://www.pwmania.com/aew-all-in-texas-set-to-break-non-wwe-event-records-for-attendance-and-gate' },
    { id: 'telemundo-pr', title: 'Hamilton explains ‘not spectacular’ start in Austria as Leclerc admits Ferrari have ‘a lot of work’ to do', thumbnail: 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Austria/Hamilton%20Leclerc%20header%20image%20Austria%20Friday.webp', link: 'https://www.formula1.com/en/latest/article/hamilton-explains-not-spectacular-start-in-austria-as-leclerc-admits-ferrari.6YpqT6Eraipy0eRWD6FcL9' },
  ];

  // The modal is still imported but not directly used in this code block.
  // If you decide to remove it entirely, you can delete the import and the component file.
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
      {/* Pass the formatted and filtered events to HeroSection */}
      <HeroSection events={formattedHeroEvents} />
      
      {/* EventCalendar now manages its own events internally */}
      <EventCalendar />

      <ContentCarousel title="Tendencias Ahora" events={trendingEvents} />
      <ContentCarousel title="Novedades" events={newEvents} />

      {/* Renderizar el modal si está abierto (mantengo la opción por si lo necesitas más tarde) */}
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEventForModal}
      />
    </div>
  );
}
