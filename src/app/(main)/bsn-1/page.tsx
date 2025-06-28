// src/app/(main)/bsn-1/page.tsx
'use client'; // Sigue siendo Client Component por useState y useEffect

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Por si acaso
import { isAfter, isBefore, addMinutes, parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BSNEventDetails {
  title: string;
  description: string;
  league: string;
  youtubeEmbedUrl: string; // URL del embed de YouTube (¡SOLO ESTA!)
  posterUrl: string; // Imagen de póster/fondo
  dateTime: string; // ISO string de la fecha y hora de inicio del partido
}

// Función para obtener los detalles de BSN-1
function getBsn1Details(): BSNEventDetails {
  return {
    title: 'Capitanes de Arecibo vs. Santeros de Aguada',
    description: 'Clásico del Baloncesto Superior Nacional de Puerto Rico. ¡Un duelo de altura en la cancha!',
    league: 'BSN',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/zCxkxCREs7Y?si=3AW9bodOgIN7aINq', // URL de embed de YouTube de prueba REAL
    posterUrl: 'https://i.ytimg.com/vi/CJCvXb5dmIo/maxresdefault.jpg',
    dateTime: '2025-06-28T20:00:00', // Sabado 28 de Junio, 8:00 PM AST
  };
}

// Función auxiliar para determinar si el evento está "cerca" de iniciar o ya inició
const isEventReadyToStream = (eventDateTime: string): boolean => {
  const now = new Date();
  const eventTime = parseISO(eventDateTime);
  const streamStartWindow = addMinutes(eventTime, -15); // 15 minutos antes (ajustado de 30 a 15)
  const streamEndWindow = addMinutes(eventTime, 180); // 3 horas después (duración del partido)

  return isAfter(now, streamStartWindow) && isBefore(now, streamEndWindow);
};

export default function Bsn1Page() {
  const [eventDetails, setEventDetails] = useState<BSNEventDetails | null>(null);

  useEffect(() => {
    const details = getBsn1Details();
    setEventDetails(details);

    // No necesitamos setInterval para isReadyForStream si se actualiza al cargar.
    // La condición se reevalúa en cada render, lo cual es suficiente para esta lógica.
    // Si necesitas que la página se "refresque" cuando el reloj llega a la hora,
    // puedes usar un setInterval que simplemente actualice un estado dummy para forzar un re-render.
    const intervalId = setInterval(() => {
      // Forzamos una re-renderización para que isEventReadyToStream se reevalúe
      // No necesitamos un estado específico, solo un trigger
      setEventDetails(prev => prev ? { ...prev } : null); // Simple truco para forzar re-render sin cambiar datos
    }, 60 * 1000); // Chequea cada minuto

    return () => clearInterval(intervalId);
  }, []);

  if (!eventDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando detalles del evento BSN...</p>
      </div>
    );
  }

  const isReadyToDisplayStream = isEventReadyToStream(eventDetails.dateTime);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
          {eventDetails.title}
        </h1>

        {/* Sección del Reproductor o Mensaje de Espera (con IFRAME de YouTube) */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-gray-800 flex items-center justify-center">
          {isReadyToDisplayStream ? (
            <iframe
              src={eventDetails.youtubeEmbedUrl}
              title={eventDetails.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
          ) : (
            <div className="text-center p-8">
              <Image
                src={eventDetails.posterUrl}
                alt={eventDetails.title}
                width={600}
                height={337}
                className="w-full h-auto object-cover rounded-lg mb-4 opacity-50"
              />
              <p className="text-xl text-gray-300 font-semibold mb-2">
                Evento no disponible aún o finalizado.
              </p>
              <p className="text-lg text-gray-400">
                Podrá verse a partir de: {format(parseISO(eventDetails.dateTime), 'EEEE d \'de\' MMMM, h:mm a', { locale: es })}
              </p>
            </div>
          )}
        </div>

        {/* Información del Evento */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Detalles del Evento</h2>
          <p className="text-gray-300 text-lg mb-4">{eventDetails.description}</p>
          <p className="text-gray-400 text-sm">
            Liga: <span className="font-semibold text-white">{eventDetails.league}</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Hora Programada: <span className="font-semibold text-white">{format(parseISO(eventDetails.dateTime), 'EEEE d \'de\' MMMM, h:mm a', { locale: es })}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
