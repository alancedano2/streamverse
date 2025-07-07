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
  { id: 'assetto-corsa', name: 'Assetto Corsa Competizione', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Assetto_Corsa_Competizione_logo.png/640px-Assetto_Corsa_Competizione_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'beamng', name: 'BeamNG.drive', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/BeamNG.drive_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'call-of-duty-warzone', name: 'Call of Duty: Warzone', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Call_of_Duty_Warzone_logo.png', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Cyberpunk_2077_logo.png', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'drive-beyond-horizons', name: 'Drive Beyond Horizons', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2763260/header.jpg', status: 'No disponible', platform: 'PC' }, // Still using Steam header as no distinct logo found
  { id: 'ea-fc25', name: 'EA SPORTS FC™ 25', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/FC_24_Logo.svg', status: 'No disponible', platform: 'PC' },
  { id: 'f1-23', name: 'F1 23', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/F1_23_logo.png/640px-F1_23_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'f1-24', name: 'F1 24', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/F1_24_logo.png/640px-F1_24_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'f1-25', name: 'F1 25', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/F1_25_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'fall-guys', name: 'Fall Guys', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Fall_Guys_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'forza-horizon-5', name: 'Forza Horizon 5', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Forza_Horizon_5_logo.png/640px-Forza_Horizon_5_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'fortnite', name: 'Fortnite', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/FortniteLogo.svg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'gta5', name: 'GTA 5', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Grand_Theft_Auto_V_logo.svg/640px-Grand_Theft_Auto_V_logo.svg.png', status: 'No disponible', platform: 'Rockstar', note: '+18' },
  { id: 'hotwheels-2', name: 'HOT WHEELS UNLEASHED™ 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1947220/logo.png', status: 'No disponible', platform: 'PC' }, // This Steam logo.png is good for a card
  { id: 'jurassic-evolution', name: 'Jurassic World Evolution', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Jurassic_World_Evolution_logo.png/640px-Jurassic_World_Evolution_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'lego-star-wars', name: 'LEGO® Star Wars™: La Saga Skywalker', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Lego_Star_Wars_The_Skywalker_Saga_logo.png/640px-Lego_Star_Wars_The_Skywalker_Saga_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'marvel-rivals', name: 'Marvel Rivals', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Marvel_Rivals_Logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'miles-morales', name: 'Marvel\'s Spider-Man Miles Morales', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Spider-Man_Miles_Morales_logo.png/640px-Spider-Man_Miles_Morales_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'spiderman2', name: 'Marvel\'s Spider-Man 2', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Marvel%27s_Spider-Man_2_logo.png/640px-Marvel%27s_Spider-Man_2_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'minecraft', name: 'Minecraft', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_Logo-en.svg', status: 'No disponible', platform: 'PC', note: '(con servidor incluido)' },
  { id: 'monster-jam', name: 'Monster Jam™ Showdown', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2635990/header.jpg', status: 'No disponible', platform: 'PC' }, // Still using Steam header as no distinct logo found
  { id: 'motogp24', name: 'MotoGP™24', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/MotoGP_24_Logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k23', name: 'NBA 2K23', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/NBA_2K23_logo.png/640px-NBA_2K23_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k24', name: 'NBA 2K24', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e5/NBA_2K24_Logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k25', name: 'NBA 2K25', logoUrl: 'https://via.placeholder.com/128x128?text=NBA+2K25', status: 'No disponible', platform: 'PC' }, // Placeholder for unreleased game
  { id: 'pc-building-sim', name: 'PC Building Simulator 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2122600/header.jpg', status: 'No disponible', platform: 'PC' }, // Still using Steam header
  { id: 'rocket-league', name: 'Rocket League', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_-_Logo.png', status: 'No disponible', platform: 'Epic Games' },
  { id: 'the-last-of-us', name: 'The Last of Us Part I', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/The_Last_of_Us_Part_I_logo.png/640px-The_Last_of_Us_Part_I_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'trackmania', name: 'Trackmania', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Trackmania_%282020_video_game%29_logo.svg', status: 'No disponible', platform: 'Ubisoft Connect' },
  { id: 'uncharted', name: 'Uncharted: Legacy of Thieves Collection', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Uncharted_Legacy_of_Thieves_Collection_logo.png/640px-Uncharted_Legacy_of_Thieves_Collection_logo.png', status: 'No disponible', platform: 'PC' },
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
                // Use w-full h-full and object-contain to make the logo fill the div without cropping
                className="w-full h-full object-contain"
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
