// src/app/(main)/bsn-2/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isAfter, isBefore, addMinutes, parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BSNEventDetails {
  title: string;
  description: string;
  league: string;
  youtubeEmbedUrl: string;
  posterUrl: string;
  dateTime: string;
}

// Función para obtener los detalles de BSN-2
function getBsn2Details(): BSNEventDetails {
  return {
    title: 'BSN: Osos de Manatí vs Criollos de Caguas',
    description: 'Otro emocionante partido del Baloncesto Superior Nacional de Puerto Rico. ¡Duelo de la zona metropolitana!',
    league: 'BSN',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/UXzAkkVmXyU?si=KNNm50vzji45julv', // URL de embed de YouTube de prueba REAL
    posterUrl: 'https://i.ytimg.com/vi/852XZ9HjuFg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBh2WcIWHlGqmg5bRm0bk2JLWnQGA',
    dateTime: '2025-06-25T20:00:00', // Miércoles 25 de Junio, 8:00 PM AST
  };
}

const isEventReadyToStream = (eventDateTime: string): boolean => {
  const now = new Date();
  const eventTime = parseISO(eventDateTime);
  const streamStartWindow = addMinutes(eventTime, -15);
  const streamEndWindow = addMinutes(eventTime, 180);
  return isAfter(now, streamStartWindow) && isBefore(now, streamEndWindow);
};

export default function Bsn2Page() {
  const [eventDetails, setEventDetails] = useState<BSNEventDetails | null>(null);

  useEffect(() => {
    const details = getBsn2Details();
    setEventDetails(details);
    const intervalId = setInterval(() => {
      setEventDetails(prev => prev ? { ...prev } : null);
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!eventDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando Evento BSN 2...</p>
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
}