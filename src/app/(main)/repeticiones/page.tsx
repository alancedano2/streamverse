// src/app/(main)/repeticiones/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LeagueCard {
  id: string;
  name: string;
  logoUrl: string;
  link: string; // Enlace a la página de repeticiones del show específico
}

const leagueData: LeagueCard[] = [
  {
    id: 'wwe',
    name: 'WWE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/WWE_Logo.svg/1200px-WWE_Logo.svg.png',
    link: '/wwe', // Enlace a la futura página de repeticiones de WWE
  },
  {
    id: 'aew',
    name: 'AEW',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/AEW_Logo_%28simplified%29.svg/2560px-AEW_Logo_%28simplified%29.svg.png',
    link: '/aew', // Enlace a la futura página de repeticiones de AEW (aún no creada)
  },
  {
    id: 'f1',
    name: 'F1',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/New_era_F1_logo.png',
    link: '/f1', // Enlace a la futura página de repeticiones de F1 (aún no creada)
  },
];

export default function RepeticionesPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-10">
        Repeticiones por Liga
      </h1>

      {/* MODIFICADO: Contenedor para centrar la cuadrícula */}
      <div className="flex justify-center"> {/* flex y justify-center para centrar el grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {leagueData.map(league => (
            <div key={league.id} className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-6 text-center max-w-xs w-full">
              <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                <Image
                  src={league.logoUrl}
                  alt={`${league.name} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{league.name}</h2>
              <Link href={league.link} className="mt-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-300">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}