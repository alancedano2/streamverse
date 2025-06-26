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
      id: 'mlb-reds-vs-yankees',
      title: 'BSN: Leones de Ponce vs Santeros de Aguada',
      date: 'Jueve, 26 de Junio del 2025 - 8:00pm',
      description: 'Los Leones de Ponce se enfrentan a los Santeros de Aguada',
      bgImage: 'https://i.ytimg.com/vi/XxpAZTDpI4c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBUW10y4bZs4Uwq1opEIqPI1-KlCA',
      link: '/bsn-1',
    },
  ];


  const trendingEvents = [
    { id: 'wwe-smackdown-trending', title: 'WWE Night Of Champions', thumbnail: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg', link: '/evento-1' },
    { id: 'mlb-power-rankings', title: 'BSN: Leones de Ponce vs Santeros de Aguada', thumbnail: 'https://i.ytimg.com/vi/XxpAZTDpI4c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBUW10y4bZs4Uwq1opEIqPI1-KlCA', link: '/bsn' },
  ];

  const newEvents = [
    { id: 'nba-finals-takeaways', title: 'Resumen de noticias de la WWE: Excampeón mundial de peso pesado planea no volver a luchar; ¿Jey Uso fue degradado? Actualización desafortunada sobre Drew McIntyre', thumbnail: 'https://i0.wp.com/www.prwrestling.com/nw/wp-content/uploads/2025/06/drew-uso.jpg?w=1280&quality=89&ssl=1', link: 'https://www.prwrestling.com/nw/resumen-de-noticias-de-la-wwe-excampeon-mundial-de-peso-pesado-planea-no-volver-a-luchar-jey-uso-fue-degradado-actualizacion-desafortunada-sobre-drew-mcintyre/' },
    { id: 'yankees-prospects', title: 'WWE NXT Results 6/24', thumbnail: 'https://img.solowrestling.com/images/141/tablet141921-nxt.jpg', link: 'https://solowrestling.com/new/141921-wwe-nxt-24-de-junio-de-2025-cobertura-y-resultados' },
    { id: 'f1-austrian-gp-analysis', title: 'Austrian GP: Verstappen busca evitar sanción y Norris–Piastri reviven tensión: Abordan posibles sanciones en Spielberg y las relaciones internas de McLaren', thumbnail: 'https://cdn-3.motorsport.com/images/amp/68eyZ1B0/s6/f1-f1-logo-2017-f1-logo-6693340.jpg', link: 'https://www.skysports.com/f1/news/12433/13387398/austrian-gp-max-verstappen-race-ban-threat-and-oscar-piastri-lando-norris-relations-set-to-intensify-f1-race-at-red-bull-ring' },
    { id: 'telemundo-pr', title: 'Exbaloncelista alega defensa propia tras ser captado en video en ataque a tubazos', thumbnail: 'https://media.telemundopr.com/2025/06/Foto-portada-31.png?resize=850%2C478&quality=85&strip=all', link: 'https://www.telemundopr.com/noticias/puerto-rico/captan-en-video-otro-brutal-ataque-a-tubazos-esta-vez-en-levittown/2727566/' },
    { id: 'noticia-1', title: 'Chad Gable pasará por quirófano para tratar su última lesión', thumbnail: 'https://img.solowrestling.com/images/141/tablet141950-chad-gable-raw.jpg', link: 'https://solowrestling.com/new/141950-chad-gable-pasara-por-quirofano-para-tratar-su-ultima-lesion' },
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
