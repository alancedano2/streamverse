// src/app/(main)/evento-1/page.tsx
'use client'; // ¡IMPORTANTE! Esta página DEBE ser un Client Component.

import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js'; // Importamos video.js directamente
import Player from 'video.js/dist/types/player'; // Importamos los tipos
import 'video.js/dist/video-js.css'; // Importamos los estilos CSS de video.js
import Link from 'next/link'; // Por si necesitas Links en la página
import Image from 'next/image'; // Por si necesitas Images en la página

// Interfaz para los detalles del stream (se mantiene igual)
interface StreamDetails {
  title: string;
  description: string;
  league: string;
  playbackUrl: string; // La URL M3U8 del stream
  posterUrl: string; // URL de la imagen del póster
  isLive: boolean; // ¿Está el evento en vivo ahora?
  nextEpisodeDate?: string; // Fecha del próximo evento (opcional)
}

// Función para obtener los detalles de ESTE evento F1 específico (Evento 1)
function getF1RaceDetails(): StreamDetails {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Calcula la fecha de mañana

  // Esta variable 'isLive' puedes ajustarla a 'true' si el stream está realmente en vivo.
  // Por ahora, la dejamos en 'false' ya que el 'playbackUrl' estará en blanco.
  const isLiveNow = false;

  return {
    title: 'MLB: Yankees vs. Cubs', // Título genérico de F1, ej: "Gran Premio de España"
    description: 'Experimenta uno de los enfrentamientos más emocionantes de la MLB. Los icónicos New York Yankees se enfrentan a los queridos Chicago Cubs en un choque que promete drama, poder y pasión.',
    league: 'MLB',
    playbackUrl: 'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=http://netlevel.online:8080/live/AURELIO933/AQBWS/610260.m3u8', // <<-- DEJA ESTA URL EN BLANCO. ¡Aquí pegarás tu stream M3U8 cuando lo tengas!
    posterUrl: 'https://s.secure.espncdn.com/stitcher/artwork/16x9.jpg?height=720&width=1280&cb=12&templateId=espn.core.dtc.large.16x9.1&source=https://artwork.espncdn.com/events/401472338/16x9/1280x720_20230623151708.jpg&showBadge=true&package=ESPN_PLUS_MLB', // Póster genérico de F1 (dominio permitido en next.config.ts)
    isLive: isLiveNow, // Indica si está en vivo
    nextEpisodeDate: `Hoy, ${today.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, // Muestra la fecha de mañana
  };
}

// Definimos los tipos de contenido que podemos mostrar (simplificado para F1)
type ContentType = 'videojs' | 'noContent' | 'loading';

export default function Evento2Page() {
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // currentContent se inicializa a 'loading' mientras se cargan los detalles
  const [currentContent, setCurrentContent] = useState<ContentType>('loading');

  // useEffect para cargar los detalles del stream y determinar el contenido a mostrar
  useEffect(() => {
    const details = getF1RaceDetails();
    setStreamDetails(details);

    // Si hay una URL de reproducción, preparamos el reproductor; de lo contrario, mostramos "noContent".
    if (details.playbackUrl) {
      setCurrentContent('videojs');
    } else {
      setCurrentContent('noContent');
    }

  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // useEffect para inicializar y limpiar el reproductor de Video.js
  useEffect(() => {
    // Si no es el momento de mostrar videojs, o no tenemos detalles del stream, o no hay URL de reproducción,
    // o el reproductor ya está inicializado, salimos de este useEffect.
    if (currentContent !== 'videojs' || !streamDetails || !streamDetails.playbackUrl || playerRef.current) {
      // Si el reproductor existe y no debería estar activo (ej. cambiamos a 'noContent'), lo destruimos.
      if (playerRef.current) {
        playerRef.current.dispose(); // Destruye la instancia del reproductor
        playerRef.current = null;
      }
      return;
    }

    // Crea el elemento <video-js> dinámicamente
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered'); // Para centrar el botón de play grande

    // Monta el elemento de video en el div de referencia (videoRef)
    if (videoRef.current) {
      // Limpia cualquier contenido previo para evitar múltiples players si el componente se re-renderiza
      while (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild);
      }
      videoRef.current.appendChild(videoElement);

      // Opciones para Video.js
      const videoPlayerOptions = {
        autoplay: true, // Auto-reproducir
        controls: true, // Mostrar controles
        responsive: true,
        fluid: true, // El reproductor se adapta al tamaño de su contenedor manteniendo el aspecto
        sources: [
          {
            src: streamDetails.playbackUrl, // Usamos la URL del stream de F1 del estado
            type: 'application/x-mpegURL', // Tipo para HLS (streams .m3u8)
          },
        ],
        poster: streamDetails.posterUrl, // Imagen de póster del evento
      };

      // Inicializa Video.js
      // Guardamos la instancia del reproductor en playerRef para poder limpiarla después
      const player = (playerRef.current = videojs(videoElement, videoPlayerOptions, () => {
        videojs.log('¡Reproductor de F1 listo para Evento 2!');
      }));
    }

    // Función de limpieza: Se ejecuta al desmontar el componente o si las dependencias cambian
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Es crucial destruir la instancia del reproductor de Video.js
        playerRef.current = null;
      }
    };
  }, [currentContent, streamDetails]); // Las dependencias aseguran que el efecto se re-ejecute cuando cambian

  // Muestra un mensaje de carga mientras los detalles del stream aún no están disponibles
  if (!streamDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando detalles de la carrera de Fórmula 1...</p>
      </div>
    );
  }

  // Renderiza el contenido de la página
  return (
    <div className="relative min-h-screen bg-gray-950 text-white"> {/* El mismo fondo global de las páginas WWE */}
      {/* Puedes añadir una imagen de fondo global para F1 aquí si lo deseas, similar a WWE Raw */}
      {/* Ejemplo de imagen de fondo global, si la activas, ajusta su opacidad y blur
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.formula1.com/etc/designs/fom-website/images/f1_wallpaper_desktop.jpg" // URL de una imagen de F1
          alt="F1 Background Global"
          fill
          className="object-cover blur-lg opacity-50" // Ajusta opacidad a tu gusto
          priority
        />
      </div>
      <div className="absolute inset-0 bg-transparent bg-opacity-0 z-0"></div>
      */}

      {/* Contenido principal de la página (z-index mayor) */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-12 md:pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 text-center mb-8">
          {streamDetails.title}
        </h1>

        {/* Contenedor del Reproductor de Video */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-gray-800 flex items-center justify-center">
          {/* Condicional para mostrar el reproductor de Video.js */}
          {currentContent === 'videojs' && streamDetails.playbackUrl ? (
            <>
              {streamDetails.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                  EN VIVO
                </div>
              )}
              <div data-vjs-player className="w-full h-full">
                <div ref={videoRef} className="w-full h-full"></div>
              </div>
            </>
          ) : (
            // Mensaje cuando no hay contenido disponible (porque playbackUrl está vacío)
            <div className="text-gray-400 text-xl p-4 text-center">
              No hay stream de Eventos disponible en este momento.
              {streamDetails.nextEpisodeDate && (
                  <p className="mt-2 text-lg">Próxima Fecha: {streamDetails.nextEpisodeDate}</p>
              )}
            </div>
          )}
        </div>

        {/* Nuevo Banner o Cuadro de Anuncio Clicable */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          <Link href="/" passHref> 
            <div className="relative w-full h-48 bg-gray-700 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="/images/placeholder.jpg" // Ruta de la imagen actualizada
                alt="Banner Publicitario"
                fill={true} 
                className="object-contain opacity-100" // Opacidad 100% y object-contain para mejor visualización
              />
              {/* Se eliminó el texto de superposición "¡Anuncio Aquí!" */}
            </div>
          </Link>
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
              Fecha del evento: <span className="font-semibold text-white">{streamDetails.nextEpisodeDate}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
