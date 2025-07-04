// src/app/(main)/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import EventCalendar from '@/components/EventCalendar'; // <-- ¡Importada esta importación!
import EventDetailsModal from '@/components/EventDetailsModal'; // Si aún usas el modal

// NOTA: La función getDailyEvents de aquí ya no es estrictamente necesaria
// si EventCalendar maneja sus propios eventos diarios y no hay un modal
// que la use directamente. La he dejado como un placeholder si la necesitas
// para otra lógica del modal, pero EventCalendar es independiente ahora.
async function getDailyEvents(date: Date) {
  // Esta función podría ser eliminada si no la usas para el modal
  // o si el modal obtiene sus datos de otra forma.
  return []; // Devuelve vacío por ahora, EventCalendar tiene su propia lógica
}


export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyEventsForModal, setDailyEventsForModal] = useState([]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null); 

  // Este useEffect para dailyEventsForModal podría ser eliminado si no se usa el modal
  useEffect(() => {
    const fetchEventsForModal = async () => {
      const events = await getDailyEvents(currentDate);
      setDailyEventsForModal(events);
    };
    fetchEventsForModal();
  }, [currentDate]);

  // Este useEffect para actualizar la fecha a medianoche también podría ser eliminado
  // si solo EventCalendar necesita esta lógica y la maneja internamente.
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const timeToMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, timeToMidnight);

    return () => clearTimeout(timer);
  }, [dailyEventsForModal]); // Dependencia: re-ejecutar cuando dailyEventsForModal cambie

  const handleEventClick = (event: any) => {
    setSelectedEventForModal(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventForModal(null);
  };

  const heroEvents = [
  {
    id: 'wwe',
    title: 'WWE SmackDown',
    date: 'Viernes, 4 de Julio del 2025 - 8:00pm',
    description: 'El show semanal insignia de WWE.',
    bgImage: 'https://streamverse-neon.vercel.app/_next/image?url=https%3A%2F%2Fimages2.minutemediacdn.com%2Fimage%2Fupload%2Fc_crop%2Cw_1080%2Ch_607%2Cx_0%2Cy_211%2Fc_fill%2Cw_720%2Car_16%3A9%2Cf_auto%2Cq_auto%2Cg_auto%2Fimages%2FvoltaxMediaLibrary%2Fmmsport%2Fwrestling_on_fannation%2F01j7q1skk768tjf6w260.jpg&w=1200&q=75',
    link: '/wwe-smackdown-live', // ✅ COMA AÑADIDA AQUÍ
  },
  {
    id: 'bsn',
    title: 'Macys 4th of July Fireworks Show',
    date: 'Viernes, 4 de Julio del 2025 - 8:00pm',
    description: 'Otro emocionante partido del BSN.',
    bgImage: 'The most iconic summer celebration of the year will light up the NYC skyline on Friday, July 4, 2025.',
    link: '/evento-2',
  },
];

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


  return (
    <div className="space-y-12 pb-16">
      <HeroSection events={heroEvents} />
      
      {/* ¡Aquí es donde se inserta el calendario con los eventos! */}
      <EventCalendar /> 

      <ContentCarousel title="Tendencias Ahora" events={trendingEvents} />
      <ContentCarousel title="Novedades" events={newEvents} />

      {/* Renderizar el modal si está abierto */}
      {/* Si EventCalendar ya enlaza directamente, esta sección del modal podría ser eliminada */}
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEventForModal}
      />
    </div>
  );
}
