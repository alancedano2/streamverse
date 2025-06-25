// src/app/(main)/wwe-raw-live/page.tsx
'use client'; // ¡IMPORTANTE! Esta página ahora DEBE ser un Client Component.

import React, { useRef, useEffect } from 'react'; // Necesitamos useRef y useEffect aquí
import videojs from 'video.js'; // Importamos video.js directamente
import Player from 'video.js/dist/types/player'; // Importamos los tipos
import 'video.js/dist/video-js.css'; // Importamos los estilos CSS de video.js
import Link from 'next/link'; // Si usas Link en el contenido
import Image from 'next/image'; // Si usas Image en el contenido

export default function WweRawLivePage() { // Ya no es 'async'
  // Datos del stream (ahora dentro del Client Component)
  const streamDetails = {
    title: 'WWE Raw - Transmisión EN VIVO',
    description:
      'Sigue la acción de WWE Raw en directo o mira la repetición completa del último episodio. Con tus superestrellas favoritas, rivalidades intensas y combates espectaculares cada semana.',
    league: 'WWE',
    playbackUrl:
      'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=https://3148-209-91-239-6.ngrok-free.app/LiveApp/streams/nK9aEMwbwwn30ulX47990285351358.m3u8', // URL de prueba M3U8
    posterUrl:
      'https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/12/Ge77Z8_bMAAQofn.jpeg', // Logo o imagen del show
    isLive: true,
    nextEpisodeDate: 'Lunes, 30 de Junio del 2025 - 8:00 PM EST',
  };

  const videoPlayerOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: streamDetails.playbackUrl,
        type: 'application/x-mpegURL',
      },
    ],
    poster: streamDetails.posterUrl,
  };

  // Lógica de Video.js (copiada de Player.tsx)
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);

        const player = (playerRef.current = videojs(videoElement, videoPlayerOptions, () => {
          videojs.log('Player is ready!');
          // No hay onReady prop aquí, el callback es directo
        }));
      }
    } else {
      const player = playerRef.current;
      player.autoplay(videoPlayerOptions.autoplay || false);
      if (
        videoPlayerOptions.sources &&
        videoPlayerOptions.sources.length > 0 &&
        player.currentSrc() !== videoPlayerOptions.sources[0]?.src
      ) {
        player.src(videoPlayerOptions.sources);
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoPlayerOptions]); // Dependencia: videoPlayerOptions

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-8">{streamDetails.title}</h1>

        {/* Reproductor de Video - Ahora directamente aquí */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative">
          {streamDetails.isLive && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
              EN VIVO
            </div>
          )}
          {/* Aquí se monta el reproductor de Video.js */}
          <div data-vjs-player>
            <div ref={videoRef} className="w-full h-auto aspect-video"></div>
          </div>
        </div>

        {/* Información del Stream */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Detalles de la Transmisión</h2>
          <p className="text-gray-300 text-lg mb-4">{streamDetails.description}</p>
          <p className="text-gray-400 text-sm">
            Liga: <span className="font-semibold text-white">{streamDetails.league}</span>
          </p>
          {streamDetails.nextEpisodeDate && (
            <p className="text-gray-400 text-sm mt-1">
              Próximo Episodio:{' '}
              <span className="font-semibold text-white">{streamDetails.nextEpisodeDate}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
