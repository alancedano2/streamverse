// src/app/(main)/mlb/page.tsx
'use client'; // Esta página es un Client Component

import React, { useRef, useEffect, useState } from 'react'; // Necesitamos estos Hooks
import videojs from 'video.js'; // Importamos video.js directamente
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css'; // Estilos de Video.js
import Image from 'next/image';
import Link from 'next/link'; // Por si necesitas links en el futuro
import { isAfter, isBefore, addMinutes, parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface MLBEventDetails {
  title: string;
  description: string;
  league: string;
  playbackUrl: string; // URL del stream M3U8 (Video.js)
  posterUrl: string; // Imagen de póster/fondo
  dateTime: string; // ISO string de la fecha y hora de inicio del partido
}

// Función para obtener los detalles de MLB
function getMlbDetails(): MLBEventDetails {
  return {
    title: 'MLB: Yankees vs Red Sox (Clásico)',
    description: 'Revive uno de los clásicos más grandes del béisbol de Grandes Ligas entre los New York Yankees y los Boston Red Sox.',
    league: 'MLB',
    playbackUrl: 'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=https://3148-209-91-239-6.ngrok-free.app/LiveApp/streams/nK9aEMwbwwn30ulX47990285351358.m3u8', // ¡Tu URL M3U8!
    posterUrl: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401356109/16x9/1280x720_20220726221639.jpg&showBadge=true&package=ESPN_PLUS_MLB', // Imagen de MLB
    dateTime: '2025-06-25T19:15:00', // Miércoles 25 de Junio, 7:15 PM AST (para probar hoy)
  };
}

// Función auxiliar para determinar si el evento está "cerca" de iniciar o ya inició
const isEventReadyToStream = (eventDateTime: string): boolean => {
  const now = new Date();
  const eventTime = parseISO(eventDateTime);
  const streamStartWindow = addMinutes(eventTime, -15);
  const streamEndWindow = addMinutes(eventTime, 240);

  return isAfter(now, streamStartWindow) && isBefore(now, streamEndWindow);
};

export default function MlbPage() {
  const [eventDetails, setEventDetails] = useState<MLBEventDetails | null>(null);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const details = getMlbDetails();
    setEventDetails(details);

    const intervalId = setInterval(() => {
      setEventDetails(prev => prev ? { ...prev } : null);
    }, 60 * 1000); // Chequea cada minuto

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!eventDetails || playerRef.current || !videoRef.current) return;

    const videoPlayerOptions = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: eventDetails.playbackUrl,
          type: 'application/x-mpegURL',
        },
      ],
      poster: eventDetails.posterUrl,
    };

    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered');

    videoRef.current.appendChild(videoElement);
    const player = (playerRef.current = videojs(videoElement, videoPlayerOptions, () => {
      videojs.log('Player is ready for MLB!');
    }));

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [eventDetails]);

  if (!eventDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando detalles del evento MLB...</p>
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

        {/* Sección del Reproductor o Mensaje de Espera */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-gray-800 flex items-center justify-center">
          {isReadyToDisplayStream ? (
            <div data-vjs-player className="absolute inset-0">
              <div ref={videoRef} className="w-full h-full"></div>
            </div>
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

        {/* ¡Sección de Información del Evento RESTAURADA! */}
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