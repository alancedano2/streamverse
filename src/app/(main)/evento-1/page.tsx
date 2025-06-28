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
function getEvento1Details(): StreamDetails {
  return {
    title: 'WWE Night of Champions 2025',
    description: 'Evento anual de pago por evento de WWE. No te pierdas las luchas por los títulos.',
    league: 'WWE PPV',
    playbackUrl: 'https://9862-38-27-97-53.ngrok-free.app/LiveApp/streams/P3fRPAmOVbZLVtCu47502729983636.m3u8', // URL de prueba M3U8
    posterUrl: 'https://411mania.com/wp-content/uploads/2025/05/wwenightofchampions2025.jpg', // Imagen de póster
    isLive: true, // Asumimos que es una repetición para los detalles base
    nextEpisodeDate: '',
  };
}

// Definimos los tipos de contenido que podemos mostrar
type ContentType = 'videojs' | 'iframe1' | 'iframe2' | 'iframe3' | 'loading' | 'noContent';

export default function Evento1Page() {
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // Inicializamos currentContent con 'videojs' para que el reproductor salga de inmediato
  const [currentContent, setCurrentContent] = useState<ContentType>('videojs');
  const [iframeSrc, setIframeSrc] = useState<string>('');

  // Nuevo estado para la fuente seleccionada del video.js
  const [selectedVideoSource, setSelectedVideoSource] = useState<string>(
    'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=https://2241-209-91-239-6.ngrok-free.app/LiveApp/streams/P3fRPAmOVbZLVtCu47502729983636.m3u8' // Opción 1 por defecto
  );

  // URL para la opción 2 del video.js
  const option2VideoUrl = 'https://live20.bozztv.com/akamaissh101/ssh101/cr7star001/playlist.m3u8';

  // useEffect para cargar los detalles del stream una vez al montar el componente
  useEffect(() => {
    setStreamDetails(getEvento1Details());
    // Llama inmediatamente a determineContent para establecer el contenido correcto según la hora actual
    determineContent(getEvento1Details());
  }, []);

  // Función para determinar qué contenido mostrar
  const determineContent = (details: StreamDetails | null) => {
    if (!details) {
      setCurrentContent('loading');
      return;
    }

    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Sumar 1 para el día de mañana
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowDayOfWeek = tomorrow.getDay();

    // --- Lógica para el SÁBADO (día 6) ---
    if (dayOfWeek === 6) { // Es Sábado
      // Sábado 9:40 AM a 12:55 PM: iframe1
      if ((hours === 9 && minutes >= 40) || (hours > 9 && hours < 12) || (hours === 12 && minutes <= 55)) {
        setCurrentContent('iframe1');
        setIframeSrc('https://www.youtube.com/embed/saFXLfwyt9U?si=CDYgodUInCV_SrnT');
        // Asegúrate de destruir el reproductor si estaba activo
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
        return;
      }

      // Sábado 12:55 PM a 4:00 PM: video.js (Ajustado para que iframe2 comience a las 4 PM)
      if ((hours === 12 && minutes >= 55) || (hours > 12 && hours < 16)) { // Cambiado de 18 a 16
        setCurrentContent('videojs');
        // El reproductor de Video.js se inicializará en su propio useEffect
        return;
      }

      // Sábado 4:00 PM en adelante: iframe2 (Cambiado de 6:00 PM a 4:00 PM)
      if (hours >= 16) { // CAMBIO AQUÍ: de 18 a 16
        setCurrentContent('iframe2');
        setIframeSrc('https://www.youtube.com/embed/O111A-p7oNA?si=hhYBS2oxXiOE1L-e');
        // Asegúrate de destruir el reproductor si estaba activo
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
        return;
      }
    }

    // --- Lógica para MAÑANA (jueves, día 4) ---
    // Esta lógica solo se activará si el día actual es Jueves
    if (dayOfWeek === 4) { // Si el día ACTUAL es Jueves
      if ((hours === 16 && minutes >= 0) || (hours > 16 && hours < 17) || (hours === 17 && minutes <= 10)) {
        setCurrentContent('iframe3');
        setIframeSrc('https://www.youtube.com/embed/O111A-p7oNA?si=yg8IFTpHO66KlCNg');
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
        return;
      }
    }

    // Si ninguna condición de tiempo se cumple y no es Sábado ni Jueves,
    // o si es Sábado/Jueves pero no hay un contenido específico para la hora actual,
    // entonces mostramos 'noContent' o volvemos a 'videojs' si es el día del evento.
    if (dayOfWeek !== 6 && dayOfWeek !== 4) { // Si NO es Sábado ni Jueves
        setCurrentContent('noContent'); // No hay contenido programado para otros días
        if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
        }
    } else if (currentContent !== 'videojs') { // Si es Sábado o Jueves, pero no estamos en videojs
        // Y ninguna de las condiciones de iframes se cumplió, volvemos a videojs
        setCurrentContent('videojs');
    }
  };

  // useEffect para cargar los detalles del stream y configurar el intervalo de actualización
  useEffect(() => {
    setStreamDetails(getEvento1Details());
    determineContent(getEvento1Details()); // Llama inmediatamente para establecer el contenido correcto al cargar

    const intervalId = setInterval(() => {
      determineContent(getEvento1Details());
    }, 60 * 1000); // Cada minuto

    // Limpieza: Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // useEffect para inicializar y limpiar el reproductor de Video.js
  useEffect(() => {
    // Solo inicializa si currentContent es 'videojs', streamDetails tiene datos y el reproductor no ha sido inicializado aún
    if (currentContent !== 'videojs' || !streamDetails || playerRef.current) {
      // Si no estamos en el modo videojs, asegúrate de que el reproductor no exista
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      return;
    }

    // Crea el elemento <video-js>
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered'); // Para centrar el botón de play grande

    // Monta el elemento de video en el div de referencia
    if (videoRef.current) {
      // Limpia cualquier contenido previo para evitar múltiples players si se re-renderiza
      while (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild);
      }
      videoRef.current.appendChild(videoElement);

      // Opciones para Video.js
      const videoPlayerOptions = {
        autoplay: true, // Auto-reproducir
        controls: true, // Mostrar controles
        responsive: true,
        fluid: true, // Se adapta al tamaño del contenedor manteniendo el aspecto
        sources: [
          {
            src: selectedVideoSource, // Usa la fuente seleccionada
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

    // Función de limpieza al desmontar el componente o cuando currentContent/selectedVideoSource cambian
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Destruye la instancia del reproductor
        playerRef.current = null;
      }
    };
  }, [currentContent, streamDetails, selectedVideoSource]); // Depende de currentContent, streamDetails y selectedVideoSource

  // Muestra un mensaje de carga si los detalles del stream aún no están disponibles
  if (!streamDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando Evento 1 y programando contenido...</p>
      </div>
    );
  }

  // Renderiza el contenido de la página una vez que los datos y el contenido están determinados
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto"> {/* Contenedor centrado */}
        <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
          {streamDetails.title}
        </h1>

        {/* Contenedor del Reproductor/Iframe */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-gray-800 flex items-center justify-center">
          {/* Selector de fuente para Video.js */}
          {currentContent === 'videojs' && (
            <div className="absolute top-4 right-4 z-20">
              <select
                className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedVideoSource}
                onChange={(e) => setSelectedVideoSource(e.target.value)}
              >
                <option value={streamDetails.playbackUrl}>Opción 1</option>
                <option value={option2VideoUrl}>Opción 2 (externo)</option>
              </select>
            </div>
          )}

          {/* Condicional para mostrar el reproductor de Video.js */}
          {currentContent === 'videojs' && (
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
          )}

          {/* Condicional para mostrar los iframes */}
          {(currentContent === 'iframe1' || currentContent === 'iframe2' || currentContent === 'iframe3') && iframeSrc && (
            <iframe
              src={iframeSrc}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Contenido programado"
            ></iframe>
          )}

          {/* Mensaje cuando no hay contenido programado */}
          {currentContent === 'noContent' && (
            <div className="text-gray-400 text-xl p-4 text-center">
              No hay contenido programado en este momento. Por favor, revisa la programación.
            </div>
          )}
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
