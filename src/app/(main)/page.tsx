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
    title: 'WWE Night Of Champions CountDown',
    date: 'Sabado, 28 de Junio del 2025 - 11:00am',
    description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
    bgImage: 'https://i.ytimg.com/vi/saFXLfwyt9U/maxresdefault.jpg',
    link: '/evento-1', // ✅ COMA AÑADIDA AQUÍ
  },
  {
    id: 'wwe',
    title: 'WWE Night Of Champions PPV',
    date: 'Sabado, 28 de Junio del 2025 - 1:00pm',
    description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
    bgImage: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg',
    link: '/evento-1',
  },
  {
    id: 'wwe',
    title: 'WWE Night Of Champions 2025 Post-Show',
    date: 'Sabado, 28 de Junio del 2025 - 4:00pm',
    description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
    bgImage: 'https://i.ytimg.com/vi/O111A-p7oNA/maxresdefault.jpg',
    link: '/evento-1',
  },
  {
    id: 'bsn',
    title: 'Santeros de Aguada vs Capitanes de Arecibo',
    date: 'Sabado, 27 de Junio del 2025 - 8:00pm',
    description: 'Partido de baloncesto entre Santeros y Capitanes.',
    bgImage: 'https://i.ytimg.com/vi/svr_ggFCHMs/maxresdefault.jpg',
    link: '/bsn-1',
  },
];

  const trendingEvents = [
    { id: 'wwe-smackdown-trending', title: 'WWE Night Of Champions', thumbnail: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg', link: '/evento-1' },
    { id: 'mlb-power-rankings', title: 'WWE SmackDown Feed Crashes on Netflix During Saudi Arabia Show', thumbnail: 'https://b1671682.smushcdn.com/1671682/wp-content/uploads/2025/06/wwe-smackdown-feed-crashes-on-netflix-during-saudi-arabia-show-27.jpg?lossy=2&strip=1&webp=1', link: 'https://www.ringsidenews.com/wwe-smackdown-feed-crashes-netflix-during-saudi-arabia-show/' },
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
