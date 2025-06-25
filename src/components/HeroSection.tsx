// src/components/HeroSection.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Ya no necesitamos HiChevronLeft y HiChevronRight si quitamos las flechas
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useTransition } from 'react';

interface HeroEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  bgImage: string;
  link: string;
}

interface HeroSectionProps {
  events: HeroEvent[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isImageReady, setIsImageReady] = useState(false);

  const goToNext = useCallback(() => {
    startTransition(() => {
      setCurrentIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
      setIsImageReady(false);
    });
  }, [events.length]);

  // Ya no necesitamos goToPrevious si quitamos las flechas
  // const goToPrevious = () => {
  //   startTransition(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1));
  //     setIsImageReady(false);
  //   });
  // };

  useEffect(() => {
    if (events.length === 0) return;

    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [goToNext, events.length]);

  useEffect(() => {
    if (!isPending) {
      setIsImageReady(true);
    }
  }, [isPending]);

  const currentEvent = events?.[currentIndex];

  if (!currentEvent || events.length === 0) {
    return (
      <div className="relative w-full h-[450px] flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden shadow-lg text-white">
        No hay eventos destacados disponibles.
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
      {/* Background Image con Blur y Fade */}
      <Image
        key={currentEvent.id}
        src={currentEvent.bgImage}
        alt={currentEvent.title}
        fill
        className={`object-cover transition-all duration-700 ease-in-out
          ${isImageReady ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-lg scale-105'}`}
        priority={true}
        onLoad={() => setIsImageReady(true)}
      />

      {/* Overlay Oscuro y Degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>


      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">{currentEvent.title}</h2>
        <p className="text-sm md:text-lg mb-4">{currentEvent.date}</p>
        <p className="hidden md:block text-gray-300 mb-6">{currentEvent.description}</p>
        <Link href={currentEvent.link} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          Ver Previa
        </Link>
      </div>

      {/* Eliminadas las Navigation Buttons (flechas) */}
      {/*
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-70 transition duration-200"
        aria-label="Previous slide"
      >
        <HiChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20 hover:bg-opacity-70 transition duration-200"
        aria-label="Next slide"
      >
        <HiChevronRight size={24} />
      </button>
      */}

      {/* Indicators (los circulitos) - se mantienen */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={_.id}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-500 hover:bg-gray-400'
            }`}
            onClick={() => startTransition(() => {
                setCurrentIndex(index);
                setIsImageReady(false);
            })}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;