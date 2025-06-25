// src/app/(main)/wwe/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ShowCard {
  id: string;
  name: string;
  logoUrl: string;
  link: string; // Enlace a la página de repeticiones del show específico
}

const wweShows: ShowCard[] = [
  {
    id: 'wwe-raw',
    name: 'WWE Raw',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/86/WWE_RAW_Logo_2025.svg', // Logo de Raw
    link: '/wwe-raw', // Enlace a la futura página de repeticiones de Raw
  },
  {
    id: 'wwe-nxt',
    name: 'WWE NXT',
    logoUrl: 'https://static.wikia.nocookie.net/logopedia/images/4/46/NXT2024.png/revision/latest?cb=20241002003326', // Logo de NXT
    link: '/wwe-nxt', // Enlace a la futura página de repeticiones de NXT
  },
  {
    id: 'wwe-smackdown',
    name: 'WWE SmackDown',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/WWE_SmackDown_%282024%29_Logo.svg', // Logo de SmackDown
    link: '/wwe-smackdown', // Enlace a la futura página de repeticiones de SmackDown
  },
  // Puedes añadir más shows de WWE aquí si es necesario
];

export default function WWEPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-10">
        Repeticiones de WWE
      </h1>

      {/* MODIFICADO: Contenedor para centrar la cuadrícula y los items */}
      <div className="flex justify-center"> {/* flex y justify-center para centrar el grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"> {/* md:grid-cols-3 directo, y justify-items-center */}
          {wweShows.map(show => (
            <div key={show.id} className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-6 text-center max-w-xs w-full"> {/* max-w-xs y w-full para tamaño consistente */}
              <div className="relative w-50 h-40 mb-6 flex items-center justify-center">
                <Image
                  src={show.logoUrl}
                  alt={`${show.name} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{show.name}</h2>
              <Link href={show.link} className="mt-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-300">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}