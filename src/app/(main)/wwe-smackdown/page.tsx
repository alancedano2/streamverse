// src/app/(main)/wwe-raw/page.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Mantener useState y useEffect
import Image from 'next/image';
import Link from 'next/link';
// Ya no se necesitan las importaciones de date-fns si no hay lógica de tiempo o partes.
// import { format, parseISO, addMinutes, isAfter, isBefore } from 'date-fns';

// Definir el tipo para un episodio de Raw (¡AHORA SIN PARTES!)
interface RawEpisode {
  id: string;
  title: string;
  date: string;
  thumbnail: string; // URL de la miniatura del episodio (placeholder)
  embedUrl: string; // ¡Ahora es una sola URL de embed para el episodio completo!
}

// Datos del ÚNICO episodio de WWE Raw
const wweRawEpisodes: RawEpisode[] = [
  {
    id: 'smackdown-2025-06-27',
    title: 'WWE SmackDown - Junio 7, 2025',
    date: '27 de Junio de 2025',
    thumbnail: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', // Placeholder transparente 1x1 GIF
    embedUrl: 'https://ok.ru/videoembed/9153998883455', // ¡TU NUEVA URL DE OK.RU!
  },
];

const WweRawPage: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<RawEpisode | null>(wweRawEpisodes[0] || null);
  // currentPartIndex y su lógica ya no son necesarios

  useEffect(() => {
    // Si no hay lógica de partes o de tiempo, este useEffect puede ser vacío
    // o eliminado si no se usa para nada más.
    // Lo dejo vacío por si en el futuro se añade alguna lógica de inicialización.
  }, []);

  // URL de la imagen de fondo GRANDE y borrosa para TODA la página
  const globalBackgroundImageUrl = 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_211/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/wrestling_on_fannation/01j7q1skk768tjf6w260.jpg';

  // currentIframeSrc ahora apunta directamente a la embedUrl del episodio seleccionado
  const currentIframeSrc = selectedEpisode?.embedUrl;

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      {/* Fondo de la PÁGINA COMPLETA con imagen de Raw y blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src={globalBackgroundImageUrl}
          alt="WWE Raw Background Global"
          fill
          className="object-cover blur-lg opacity-100" // Aplicar blur y opacidad al fondo
          priority
        />
      </div>

      {/* Overlay oscuro para mejorar la legibilidad del contenido sobre el fondo global */}
      <div className="absolute inset-0 bg-transparent bg-opacity-0 z-0"></div>

      {/* Contenido principal de la página (z-index mayor) */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-12 md:pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500 text-center mb-8">
          WWE Raw Repeticiones
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna de la Lista de Episodios */}
          <div className="lg:w-1/3 rounded-lg shadow-xl border border-gray-700 overflow-hidden relative">
            {/* Imagen de fondo específica para la columna, con blur y opacidad */}
            <Image
              src={globalBackgroundImageUrl}
              alt="WWE Raw Episodes Background"
              fill
              className="object-cover blur-md opacity-0"
              aria-hidden="true"
              priority
            />
            {/* Overlay semitransparente sobre la imagen de fondo de la columna */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-0 z-0"></div>

            {/* Contenido de la columna - debe tener un z-index mayor */}
            <div className="relative z-10 p-4 md:p-6 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-white">Episodios Recientes</h2>
              <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                {wweRawEpisodes.map((episode) => (
                  <div
                    key={episode.id}
                    onClick={() => {
                      setSelectedEpisode(episode);
                      // No hay currentPartIndex que resetear
                    }}
                    className={`flex items-center p-3 mb-3 rounded-lg cursor-pointer transition-colors duration-200
                      ${selectedEpisode?.id === episode.id ? 'bg-orange-600 border border-orange-500' : 'bg-gray-700 hover:bg-gray-600'}
                    `}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">{episode.title}</h3>
                      <p className="text-gray-300 text-sm">{episode.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna del Reproductor de Video (iframe) */}
          <div className="lg:w-2/3 bg-gray-800 rounded-lg shadow-xl p-4 md:p-6 border border-gray-700 flex flex-col justify-between">
            {selectedEpisode ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Reproduciendo: {selectedEpisode.title} {/* ¡Título sin "Parte X"! */}
                </h2>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                  {currentIframeSrc ? (
                    <iframe
                      key={currentIframeSrc} // Key para forzar re-render del iframe si la URL cambia
                      src={currentIframeSrc}
                      title={selectedEpisode.title} // Título sin "Parte X"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                      frameBorder="0"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
                      Cargando video...
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Fecha de emisión: {selectedEpisode.date}
                </p>

                {/* ¡Controles de Parte del Video ELIMINADOS! */}
                {/* <div className="flex justify-center space-x-4 mb-4">
                  {selectedEpisode.parts.map((part, index) => (
                    <button
                      key={part.part}
                      onClick={() => setCurrentPartIndex(index)}
                      className={`py-2 px-4 rounded-md font-semibold transition-colors duration-200
                        ${index === currentPartIndex ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                      `}
                    >
                      Parte {part.part}
                    </button>
                  ))}
                </div> */}
              </>
            ) : (
              <div className="text-center text-gray-400 py-12">
                Selecciona un episodio de la lista para reproducir.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* gray-700 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316; /* orange-500 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c; /* orange-600 */
        }
      `}</style>
    </div>
  );
};

export default WweRawPage;
