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
  { id: 'assetto-corsa', name: 'Assetto Corsa Competizione', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/805550/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'beamng', name: 'BeamNG.drive', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/BeamNG.drive_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'call-of-duty-warzone', name: 'Call of Duty: Warzone', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/14826/header.jpg', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'drive-beyond-horizons', name: 'Drive Beyond Horizons', logoUrl: 'https://via.placeholder.com/64x64?text=DBH', status: 'No disponible', platform: 'PC' },
  { id: 'ea-fc25', name: 'EA SPORTS FC™ 25', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/FC_24_Logo.svg', status: 'No disponible', platform: 'PC' },
  { id: 'f1-23', name: 'F1 23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'f1-24', name: 'F1 24', logoUrl: 'https://via.placeholder.com/64x64?text=F1+24', status: 'No disponible', platform: 'PC' },
  { id: 'f1-25', name: 'F1 25', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/F1_25_logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'fall-guys', name: 'Fall Guys', logoUrl: 'https://steamgriddb.com/thumb/logo/82817/362x333.png', status: 'No disponible', platform: 'PC' },
  { id: 'forza-horizon-5', name: 'Forza Horizon 5', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'fortnite', name: 'Fortnite', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/FortniteLogo.svg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'gta5', name: 'GTA 5', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg', status: 'No disponible', platform: 'Rockstar', note: '+18' },
  { id: 'hotwheels-2', name: 'HOT WHEELS UNLEASHED™ 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1947220/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'jurassic-evolution', name: 'Jurassic World Evolution', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/339450/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'lego-star-wars', name: 'LEGO® Star Wars™: La Saga Skywalker', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1906550/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'marvel-rivals', name: 'Marvel Rivals', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/365590/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'miles-morales', name: 'Marvel\'s Spider-Man Miles Morales', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1498410/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'spiderman2', name: 'Marvel\'s Spider-Man 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2255120/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'minecraft', name: 'Minecraft', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_Logo-en.svg', status: 'No disponible', platform: 'PC', note: '(con servidor incluido)' },
  { id: 'monster-jam', name: 'Monster Jam™ Showdown', logoUrl: 'https://via.placeholder.com/64x64?text=MJ', status: 'No disponible', platform: 'PC' },
  { id: 'motogp24', name: 'MotoGP™24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2894180/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k23', name: 'NBA 2K23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k24', name: 'NBA 2K24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2265400/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k25', name: 'NBA 2K25', logoUrl: 'https://via.placeholder.com/64x64?text=2K25', status: 'No disponible', platform: 'PC' },
  { id: 'pc-building-sim', name: 'PC Building Simulator 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/621060/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'rocket-league', name: 'Rocket League', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_-_Logo.png', status: 'No disponible', platform: 'Epic Games' },
  { id: 'the-last-of-us', name: 'The Last of Us Part I', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'trackmania', name: 'Trackmania', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Trackmania_%282020_video_game%29_logo.svg', status: 'No disponible', platform: 'Ubisoft Connect' },
  { id: 'uncharted', name: 'Uncharted: Legacy of Thieves Collection', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1741790/header.jpg', status: 'No disponible', platform: 'PC' },
];

export default function ListaDeJuegosPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-orange-500">Lista de Juegos</h1>
      <div className="space-y-4 max-w-5xl mx-auto">
        {games.map(({ id, name, logoUrl, status, platform, note }) => (
          <div key={id} className="flex items-center bg-gray-800 rounded-lg shadow border border-gray-700 p-4 gap-4">
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-16 h-16 object-contain bg-gray-900 rounded"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = '/placeholder.png')}
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">
                {name} {note && <span className="text-red-500 text-sm ml-2">({note})</span>}
              </h2>
              <p className="text-sm text-gray-400">{platform || 'PC'}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                status === 'Disponible' ? 'bg-green-600 text-green-100' : 'bg-red-700 text-red-200'
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
