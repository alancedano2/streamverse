// src/app/(main)/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import EventCalendar from '@/components/EventCalendar';
import EventDetailsModal from '@/components/EventDetailsModal';

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
    id: 'MLB',
    title: 'MLB: Toronto Blue Jays vs New York Yankees',
    date: 'Martes, 22 de Julio del 2025 - 7:07pm',
    description: '¡Un emocionante enfrentamiento de la División Este! Los Blue Jays reciben a los Yankees en un partido clave de la MLB. Prepárate para la acción del béisbol con cada lanzamiento y cada bateo.', // Corrected missing quote
    bgImage: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=612&width=1088&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https%3A//artwork.espncdn.com/events/401422027/16x9/1280x720_20220328205353.jpg&showBadge=true&package=ESPN_PLUS_MLB',
    link: 'https://streamverse-eventos.vercel.app/eventos/mlb-bluejays-yankees', // ✅ COMA AÑADIDA AQUÍ
  },
  {
    id: 'WWE',
    title: 'WWE NXT',
    date: 'Lunes, 22 de Julio del 2025 - 8:00pm',
    description: '¡La noche de los martes se enciende con WWE NXT! Prepárate para combates impresionantes, rivalidades intensas y sorpresas inesperadas con tus superestrellas favoritas.', // Corrected missing quote
    bgImage: 'https://images.cwtv.com/images/masters/cw/universal/shows/wwe-nxt/show-promo.jpg',
    link: 'https://streamverse-eventos.vercel.app/eventos/wwe-nxt', // ✅ COMA AÑADIDA AQUÍ
  },
  {
    id: 'MLS',
    title: 'MLS All-Star Skills Challenge',
    date: 'Martes, 22 de Julio del 2025 - 9:00pm',
    description: '¡Prepárate para la acción y la habilidad! Las estrellas de la MLS compiten en un emocionante desafío de habilidades previo al partido de estrellas. Duelos de precisión, control de balón y más.', // Corrected missing quote
    bgImage: 'https://is1-ssl.mzstatic.com/image/thumb/BgtyY1s-04azDkgn3QooMQ/580x326Sports.TVAMCR01.webp',
    link: 'https://streamverse-eventos.vercel.app/eventos/mls-all-star-skills-challenge', // ✅ COMA AÑADIDA AQUÍ
  },// <--- COMA CORREGIDA AÑADIDA AQUÍ 
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
