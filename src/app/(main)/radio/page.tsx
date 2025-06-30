// src/app/(main)/radio/page.tsx
'use client'; // ¡IMPORTANTE! Esta página DEBE ser un Client Component.

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Asegúrate de importar Image

export default function RadioPage() {
  return (
    <div className="relative min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      {/* Puedes añadir una imagen de fondo global aquí si lo deseas */}
      {/*
      <div className="absolute inset-0 z-0">
        <Image
          src="/your-radio-background.jpg" // Cambia esto a la URL de tu imagen de fondo para la radio
          alt="Radio Background"
          fill
          className="object-cover blur-lg opacity-50"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-transparent bg-opacity-0 z-0"></div>
      */}

      {/* Contenido principal de la página (z-index mayor) */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-12 md:pt-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-2">
          StreamVerse Radio
        </h1>
        {/* Sección de "powered by" con la imagen */}
        <p className="text-xs text-gray-400 mb-8 flex items-center justify-center space-x-1">
          <span>powered by</span>
          <Image
            src="https://bloximages.chicago2.vip.townnews.com/kq105.com/content/tncms/custom/image/f8b14b8c-a5ba-11ee-b21a-4b46656e8613.png"
            alt="KQ105 Logo"
            width={70} // Ajusta el ancho según necesites
            height={20} // Ajusta la altura para mantener la proporción o tu preferencia
            // style={{ display: 'inline-block', verticalAlign: 'middle' }} // Opcional para mejor alineación
          />
        </p>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Disfruta de la mejor selección musical y nuestra programación en vivo, 24/7.
        </p>

        {/* Contenedor del Reproductor de Radio (iframe) */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-gray-800 flex items-center justify-center p-4">
          <iframe
            src="https://e40b-38-27-97-53.ngrok-free.app/public/streamverse_radio/embed?theme=dark"
            frameBorder="0"
            allowTransparency={true}
            style={{ width: '100%', minHeight: '150px', border: '0' }}
            title="StreamVerse Radio Player"
          ></iframe>
        </div>

        {/* Información adicional o enlaces */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Conéctate con Nosotros</h2>
          <p className="text-gray-300 text-lg mb-4">
            ¡Síguenos en redes sociales para no perderte ninguna actualización!
          </p>
          {/* Ejemplo de un enlace, si lo necesitas */}
          <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
