// src/app/eventos/evento-1/page.tsx
'use client'; // ¡IMPORTANTE! Esta página DEBE ser un Client Component.

import React, { useRef, useEffect, useState } from 'react'; // Necesitamos estos Hooks
import videojs from 'video.js'; // Importamos video.js directamente
import Player from 'video.js/dist/types/player'; // Importamos los tipos
import 'video.js/dist/video-js.css'; // Importamos los estilos CSS de video.js
import Link from 'next/link'; // Por si necesitas Links en la página
import Image from 'next/image'; // Por si necesitas Images en la página

// Interfaz para los detalles del stream
interface StreamDetails {
  title: string;
  description: string;
  league: string;
  playbackUrl: string;
  posterUrl: string;
  isLive: boolean;
  nextEpisodeDate?: string;
}

// Función para obtener los detalles de ESTE evento específico (Evento 1)
function getEvento2Details(): StreamDetails {
  return {
    title: 'Evento Especial: Gran Final de Baloncesto',
    description: '¡Revive la emocionante final de baloncesto con este partido lleno de adrenalina y jugadas espectaculares! Un clásico imperdible.',
    league: 'Baloncesto Profesional',
    playbackUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // URL de prueba M3U8
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Basketball_game.jpg/1280px-Basketball_game.jpg', // Imagen de baloncesto
    isLive: false, // Asumimos que es una repetición
    nextEpisodeDate: 'Próximo Evento: 15 de Julio de 2025',
  };
}

export default function Evento2Page() {
  // Estado para los detalles del stream
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);

  // Referencias para el elemento de video y la instancia del reproductor Video.js
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // useEffect para cargar los detalles del stream una vez al montar el componente
  useEffect(() => {
    setStreamDetails(getEvento2Details()); // Carga los detalles al montar
  }, []); // El array vacío asegura que se ejecute solo una vez

  // useEffect para inicializar y limpiar el reproductor de Video.js
  useEffect(() => {
    // Solo inicializa si streamDetails ya tiene datos y el reproductor no ha sido inicializado aún
    if (!streamDetails || playerRef.current) return;

    // Crea el elemento <video-js>
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered'); // Para centrar el botón de play grande

    // Monta el elemento de video en el div de referencia
    if (videoRef.current) {
      videoRef.current.appendChild(videoElement);

      // Opciones para Video.js (usando los streamDetails cargados)
      const videoPlayerOptions = {
        autoplay: true, // Auto-reproducir
        controls: true, // Mostrar controles
        responsive: true,
        fluid: true, // Se adapta al tamaño del contenedor manteniendo el aspecto
        sources: [
          {
            src: streamDetails.playbackUrl,
            type: 'application/x-mpegURL', // Tipo para M3U8 (HLS)
          },
        ],
        poster: streamDetails.posterUrl, // Imagen de póster
      };

      // Inicializa Video.js
      const player = (playerRef.current = videojs(videoElement, videoPlayerOptions, () => {
        videojs.log('Player is ready for Evento 1!');
      }));
    }

    // Función de limpieza al desmontar el componente
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Destruye la instancia del reproductor
        playerRef.current = null;
      }
    };
  }, [streamDetails]); // Depende de streamDetails para re-ejecutar cuando los datos cargan

  // Muestra un mensaje de carga si los detalles del stream aún no están disponibles
  if (!streamDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando Evento 1...</p>
      </div>
    );
  }

  // Renderiza el contenido de la página una vez que los datos están cargados
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto"> {/* Contenedor centrado */}
        <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
          {streamDetails.title}
        </h1>

        {/* Reproductor de Video */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative">
          {streamDetails.isLive && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
              EN VIVO
            </div>
          )}
          {/* Aquí es donde Video.js montará el reproductor */}
          <div data-vjs-player>
            <div ref={videoRef} className="w-full h-auto aspect-video"></div>
          </div>
        </div>

        {/* Información del Evento */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Detalles del Evento</h2>
          <p className="text-gray-300 text-lg mb-4">{streamDetails.description}</p>
          <p className="text-gray-400 text-sm">
            Liga: <span className="font-semibold text-white">{streamDetails.league}</span>
          </p>
          {streamDetails.nextEpisodeDate && (
            <p className="text-gray-400 text-sm mt-1">
              Próximo Evento: <span className="font-semibold text-white">{streamDetails.nextEpisodeDate}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}