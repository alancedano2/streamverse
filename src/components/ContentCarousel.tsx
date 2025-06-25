// src/components/ContentCarousel.tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  progress?: number;
  link?: string;
}

interface ContentCarouselProps {
  title: string;
  events: ContentItem[];
  showProgress?: boolean;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, events, showProgress = false }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth * 0.75, // Desplaza 75% del ancho visible
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth * 0.75, // Desplaza 75% del ancho visible
        behavior: 'smooth',
      });
    }
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 relative"> {/* Añadimos relative para los botones */}
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
      >
        {events.map((event) => (
          <div key={event.id} className="flex-none w-48 sm:w-56 md:w-64 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-gray-800">
            <Link href={event.link || `#`}>
              {/* Usar next/image para optimización y validación de URL */}
              {/* Asegúrate de añadir el dominio de tus imágenes a next.config.js si no lo has hecho */}
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-32 sm:h-40 object-cover"
                // width={256} // Añade un ancho fijo si no estás usando object-fit
                // height={160} // Añade un alto fijo si no estás usando object-fit
              />
              {showProgress && event.progress !== undefined && (
                <div className="h-1 bg-gray-600">
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: `${event.progress}%` }}
                  ></div>
                </div>
              )}
              <div className="p-3">
                <h3 className="text-md font-semibold text-white truncate">{event.title}</h3>
                {/* Puedes añadir más detalles aquí si los tienes en ContentItem */}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Botones de Navegación del Carrusel */}
      {events.length > 3 && ( // Muestra botones solo si hay suficientes elementos para desplazarse
        <>
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 md:left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition duration-200"
            aria-label="Scroll left"
          >
            <HiChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 md:right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition duration-200"
            aria-label="Scroll right"
          >
            <HiChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  );
};

export default ContentCarousel;