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
    playbackUrl: 'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=https://2241-209-91-239-6.ngrok-free.app/LiveApp/streams/P3fRPAmOVbZLVtCu47502729983636.m3u8', // URL de prueba M3U8
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

  // Nuevo estado para controlar qué contenido se muestra
  const [currentContent, setCurrentContent] = useState<ContentType>('loading');
  // Estado para el iframe que se debe mostrar
  const [iframeSrc, setIframeSrc] = useState<string>('');

  // useEffect para cargar los detalles del stream una vez al montar el componente
  useEffect(() => {
    setStreamDetails(getEvento1Details());
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

      // Sábado 12:55 PM a 6:00 PM: video.js
      if ((hours === 12 && minutes >= 55) || (hours > 12 && hours < 18) || (hours === 18 && minutes === 0)) {
        setCurrentContent('videojs');
        // El reproductor de Video.js se inicializará en su propio useEffect
        return;
      }

      // Sábado 6:00 PM en adelante: iframe2
      if (hours >= 18) {
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

    // --- Lógica para HOY (miércoles, 3 en dayOfWeek) - Si no es sábado ---
    // Según tu prompt, hoy es miércoles 26 de junio de 2025.
    // Asumiendo que el "mañana" del prompt se refiere al jueves 27.
    if (dayOfWeek === 3) { // Si hoy es miércoles
      // No hay contenido específico para hoy en tu solicitud hasta ahora.
      // Puedes añadir aquí si necesitas algo para el miércoles.
    }

    // --- Lógica para MAÑANA (jueves, día 4) ---
    if (tomorrowDayOfWeek === 4) { // Si "mañana" es jueves
        // Mañana (Jueves) 4:00 PM a 5:10 PM: iframe3
        // IMPORTANTE: Esta lógica se ejecutará si la página se carga *hoy* y la condición de *mañana* se cumple.
        // Si el usuario carga la página el jueves, esta lógica no se activará a menos que uses el `now` directamente.
        // Para simplificar, la pondremos aquí asumiendo que "mañana" es una condición futura.
        // Una forma más robusta sería pasar la fecha objetivo como argumento o usar una librería de fechas.
        // Para el propósito actual, revisamos si la hora actual cae dentro del rango de mañana si fuera jueves.
        // Para una implementación de producción, considerar almacenar fechas completas (año, mes, día, hora) para la comparación.

        // Dado que la ejecución es en el cliente, `now` siempre será el día actual del cliente.
        // Para "mañana", la lógica debe estar atenta a si el día *es* mañana (jueves)
        if (dayOfWeek === 4) { // Si el día ACTUAL es Jueves (Mañana)
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
    }

    // Si ninguna condición se cumple
    setCurrentContent('noContent');
    // Asegúrate de destruir el reproductor si estaba activo
    if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
    }
  };

  // useEffect para cargar los detalles del stream y determinar el contenido inicial
  useEffect(() => {
    setStreamDetails(getEvento1Details());
    // Determina el contenido inicial justo después de cargar los detalles
    determineContent(getEvento1Details());

    // Configura un intervalo para re-evaluar el contenido cada minuto (o el tiempo que consideres adecuado)
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

    // Función de limpieza al desmontar el componente o cuando currentContent cambia
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Destruye la instancia del reproductor
        playerRef.current = null;
      }
    };
  }, [currentContent, streamDetails]); // Depende de currentContent y streamDetails para re-ejecutar

  // Muestra un mensaje de carga si los detalles del stream aún no están disponibles o el contenido está 'loading'
  if (currentContent === 'loading' || !streamDetails) {
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
