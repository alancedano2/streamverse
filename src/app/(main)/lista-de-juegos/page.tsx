'use client';
import React from 'react';

interface Game {
  id: string;
  name: string;
  logoUrl: string;
  status: 'Disponible' | 'No disponible';
  platform?: string;
  note?: string;
}

const games: Game[] = [
  { id: 'assetto-corsa', name: 'Assetto Corsa Competizione', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/805550/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'beamng', name: 'BeamNG.drive', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/284160/capsule_616x353.jpg', status: 'Disponible', platform: 'Steam' },
  { id: 'call-of-duty-warzone', name: 'Call of Duty: Warzone', logoUrl: 'https://cdn.steamstatic.com/steam/apps/1962663/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam', note: '+18' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam', note: '+18' },
  { id: 'drive-beyond-horizons', name: 'Drive Beyond Horizons', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2625420/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'ea-fc25', name: 'EA SPORTS FC™ 25', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' }, // FC 24 capsule as placeholder for 25
  { id: 'f1-23', name: 'F1 23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'f1-24', name: 'F1 24', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2488620/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'f1-25', name: 'F1 25', logoUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3059520/37f833ca5bd3d5c3eec2b411131f3e00f580bbe7/header.jpg', status: 'No disponible', platform: 'Steam' }, // Unreleased, placeholder
  { id: 'fall-guys', name: 'Fall Guys', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'forza-horizon-5', name: 'Forza Horizon 5', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'fortnite', name: 'Fortnite', logoUrl: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/fortnite-2024-promo-art.jpg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'gta5', name: 'GTA 5', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam', note: '+18' },
  { id: 'hotwheels-2', name: 'HOT WHEELS UNLEASHED™ 2', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2051120/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'jurassic-evolution', name: 'Jurassic World Evolution', logoUrl: 'https://cdn.steamstatic.com/steam/apps/648350/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'lego-star-wars', name: 'LEGO® Star Wars™: La Saga Skywalker', logoUrl: 'https://cdn.steamstatic.com/steam/apps/920210/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'marvel-rivals', name: 'Marvel Rivals', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2767030/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'miles-morales', name: 'Marvel\'s Spider-Man Miles Morales', logoUrl: 'https://cdn.steamstatic.com/steam/apps/1817190/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'spiderman2', name: 'Marvel\'s Spider-Man 2', logoUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3172660/0c0f71d9656b96f53095a9757bbba6ea1c074acc/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'minecraft', name: 'Minecraft', logoUrl: 'https://xboxwire.thesourcemediaassets.com/sites/4/15YR_Free_Cape-1-7cbcb0739e3df57534ec-9063efed017354d1b1c3.jpg', status: 'No disponible', platform: 'PC', note: '(con servidor incluido)' },
  { id: 'monster-jam', name: 'Monster Jam™ Showdown', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2350280/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'motogp24', name: 'MotoGP™24', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2581700/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'nba2k23', name: 'NBA 2K23', logoUrl: 'https://cdn.steamstatic.com/steam/apps/1919590/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'nba2k24', name: 'NBA 2K24', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2338770/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'nba2k25', name: 'NBA 2K25', logoUrl: 'https://images.ctfassets.net/wn7ipiv9ue5v/2o2zzN8bdBFi6BwGFJR1lK/fab7d2a0fa20e7a8ec13c6400bd21422/N25-BASE-STANDARD_EDITION_ANNOUNCE-NA-STATIC-ESRB-AGN-1920x1080.jpg', status: 'No disponible', platform: 'Steam' }, // Unreleased, placeholder
  { id: 'pc-building-sim', name: 'PC Building Simulator 2', logoUrl: 'https://cdn.steamstatic.com/steam/apps/621060/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'rocket-league', name: 'Rocket League', logoUrl: 'https://cdn.steamstatic.com/steam/apps/252950/capsule_616x353.jpg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'the-last-of-us', name: 'The Last of Us Part I', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'trackmania', name: 'Trackmania', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2225070/capsule_616x353.jpg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'uncharted', name: 'Uncharted: Legacy of Thieves Collection', logoUrl: 'https://cdn.steamstatic.com/steam/apps/1659420/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'wwe-2k24', name: 'WWE 2K24', logoUrl: 'https://cdn.steamstatic.com/steam/apps/2315690/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
  { id: 'wwe-2k25', name: 'WWE 2K25', logoUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2878960/76d35961f8a4e857b88a6c50bef901a1f87c23dc/capsule_616x353.jpg', status: 'No disponible', platform: 'Steam' },
];

export default function ListaDeJuegosPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-orange-500">Lista de Juegos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {games.map(({ id, name, logoUrl, status, platform, note }) => (
          <div
            key={id}
            className="flex flex-col items-center bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="w-full flex justify-center items-center h-28 sm:h-32 mb-4 bg-gray-900 rounded-md overflow-hidden p-2">
              <img
                src={logoUrl}
                alt={`${name} logo`}
                className="w-full h-full object-contain" // Make the logo fill the div without cropping
                loading="lazy"
                onError={(e) => (e.currentTarget.src = '/placeholder.png')} // Fallback if image fails to load
              />
            </div>
            <div className="text-center flex-grow w-full">
              <h2 className="text-base font-semibold text-white mb-1 truncate">{name}</h2>
              {note && <p className="text-red-400 text-xs mb-1">({note})</p>}
              <p className="text-xs text-gray-400">{platform || 'PC'}</p>
            </div>
            <span
              className={`mt-4 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap
                ${status === 'Disponible' ? 'bg-green-600 text-green-100' : 'bg-red-700 text-red-200'}`
              }
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
