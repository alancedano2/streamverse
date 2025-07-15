// src/app/(main)/wwe-nxt-live/page.tsx
// O: src/app/(main)/wwe-smackdown-live/page.tsx

'use client';

import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import Link from 'next/link';
import Image from 'next/image';

interface StreamDetails {
  title: string;
  description: string;
  league: string;
  playbackUrl: string;
  posterUrl: string;
  isLive: boolean;
  nextEpisodeDate?: string;
}

function getStreamDetails(showName: 'NXT' | 'SmackDown'): StreamDetails {
  if (showName === 'NXT') {
    return {
      title: 'WWE NXT - Transmisión EN VIVO',
      description: 'Sigue a las futuras superestrellas de WWE en NXT cada martes. ¡Acción explosiva y nuevas rivalidades!',
      league: 'WWE NXT',
      playbackUrl: 'https://turn-dependence-animated-yellow.trycloudflare.com/live/610423.m3u8', // URL de prueba M3U8
      posterUrl: 'https://images.cwtv.com/images/masters/cw/universal/shows/wwe-nxt/show-promo.jpg',
      isLive: true,
      nextEpisodeDate: 'Martes, Julio 1  , 2025 - 8:00 PM EST',
    };
  } else { // SmackDown
    return {
      title: 'WWE SmackDown - Transmisión EN VIVO',
      description: 'El show azul de WWE con tus superestrellas favoritas. ¡Viernes por la noche es para SmackDown!',
      league: 'WWE SmackDown',
      playbackUrl: 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/chunks.m3u8', // URL de prueba M3U8
      posterUrl: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg',
      isLive: true,
      nextEpisodeDate: 'Viernes, Junio 27, 2025 - 8:00 PM EST',
    };
  }
}

export default function WweNxtLivePage() { // O WweSmackdownLivePage()
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);

  // Mueve los useRef al principio, siempre se llamarán.
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // Primer useEffect para cargar los datos del stream
  useEffect(() => {
    // Para NXT, pasa 'NXT'. Para SmackDown, pasa 'SmackDown'.
    const data = getStreamDetails('NXT'); // <-- ¡Cambia a 'SmackDown' para la página de SmackDown!
    setStreamDetails(data);
  }, []);

  // Segundo useEffect para inicializar y limpiar Video.js.
  // Solo se ejecuta si streamDetails YA tiene datos.
  useEffect(() => {
    // Si no hay streamDetails o el reproductor ya existe, no hagas nada.
    if (!streamDetails || playerRef.current) return;

    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered');

    if (videoRef.current) {
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, {
        autoplay: streamDetails.isLive, // Usa el isLive de los datos cargados
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{ src: streamDetails.playbackUrl, type: 'application/x-mpegURL' }],
        poster: streamDetails.posterUrl,
      }, () => {
        videojs.log('Player is ready!');
      }));
    }

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [streamDetails]); // Depende de streamDetails: se ejecuta cuando streamDetails cambia (de null a los datos)

  // Si los detalles del stream aún no se han cargado, muestra un mensaje de carga.
  // Este return condicional ocurre DESPUÉS de todas las llamadas a Hooks.
  if (!streamDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando detalles de la transmisión...</p>
      </div>
    );
  }

  // Resto del renderizado normal cuando streamDetails tiene datos
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
          {streamDetails.title}
        </h1>
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative">
          {streamDetails.isLive && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
              EN VIVO
            </div>
          )}
          <div data-vjs-player>
            <div ref={videoRef} className="w-full h-auto aspect-video"></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Detalles de la Transmisión</h2>
          <p className="text-gray-300 text-lg mb-4">{streamDetails.description}</p>
          <p className="text-gray-400 text-sm">
            Liga: <span className="font-semibold text-white">{streamDetails.league}</span>
          </p>
          {streamDetails.nextEpisodeDate && (
            <p className="text-gray-400 text-sm mt-1">
              Próximo Episodio: <span className="font-semibold text-white">{streamDetails.nextEpisodeDate}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
