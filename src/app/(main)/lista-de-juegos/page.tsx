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
  { id: 'assetto-corsa-competizione', name: 'Assetto Corsa Competizione', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/805550/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'beamng', name: 'BeamNG.drive', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/284160/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'call-of-duty-warzone', name: 'Call of Duty: Warzone', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Call_of_Duty_Warzone_cover_art.jpg', status: 'No disponible', platform: 'Battle.net', note: '+18' },
  { id: 'cyberpunk-2077', name: 'Cyberpunk 2077', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/logo.png', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'drive-beyond-horizons', name: 'Drive Beyond Horizons', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1503190/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'fc-25', name: 'EA SPORTS FC™ 25', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/FC_24_Logo.svg/512px-FC_24_Logo.svg.png', status: 'No disponible', platform: 'PC / Consola' },
  { id: 'fall-guys', name: 'Fall Guys', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/74/Fall_Guys_Cover_Art.jpg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'f1-23', name: 'F1 23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'f1-24', name: 'F1 24', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/F1_Logo.svg/1200px-F1_Logo.svg.png', status: 'No disponible', platform: 'PC' },
  { id: 'f1-25', name: 'F1 25', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/F1_Logo.svg/1200px-F1_Logo.svg.png', status: 'No disponible', platform: 'PC' },
  { id: 'forza', name: 'Forza Horizon 5', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/44/Forza_Horizon_5_cover_art.jpg', status: 'No disponible', platform: 'Xbox / PC' },
  { id: 'fortnite', name: 'Fortnite', logoUrl: 'https://cdn2.unrealengine.com/Fortnite%2Ffn-ch5s3-comp-keyart-social-1920x1080-448a0907477e.jpg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'hot-wheels-unleashed-2', name: 'HOT WHEELS UNLEASHED™ 2 - Turbocharged', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1557280/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'jurassic-world-evolution', name: 'Jurassic World Evolution', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648350/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'lego-star-wars', name: 'LEGO® Star Wars™: La Saga Skywalker', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/920210/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'minecraft', name: 'Minecraft (con servidor incluido)', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png', status: 'No disponible', platform: 'PC' },
  { id: 'monster-jam-showdown', name: 'Monster Jam™ Showdown', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2556550/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'motogp24', name: 'MotoGP™24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2730230/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'nba-2k23', name: 'NBA 2K23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'nba-2k24', name: 'NBA 2K24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2629700/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'nba-2k25', name: 'NBA 2K25', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2629700/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'pc-building-simulator-2', name: 'PC Building Simulator 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/621060/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'rocket-league', name: 'Rocket League', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/logo.png', status: 'No disponible', platform: 'Epic Games' },
  { id: 'spiderman-2', name: "Marvel's Spider-Man 2", logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Spider-Man_2_cover_art.jpg', status: 'No disponible', platform: 'PlayStation / PC' },
  { id: 'spiderman-miles', name: "Marvel's Spider-Man Miles Morales", logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Spider-Man_Miles_Morales_cover_art.jpg', status: 'No disponible', platform: 'PlayStation / PC' },
  { id: 'trackmania', name: 'Trackmania', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2225070/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'last-of-us', name: 'The Last of Us Part I', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/The_Last_of_Us_Part_I_cover_art.jpg', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'uncharted-collection', name: 'Uncharted: Legacy of Thieves Collection', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Uncharted_Legacy_of_Thieves_Collection_cover_art.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'marvel-rivals', name: 'Marvel Rivals', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2611770/logo.png', status: 'No disponible', platform: 'PC' },
  { id: 'gta5', name: 'GTA 5 (con restricción +18)', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V_cover.png', status: 'No disponible', platform: 'Rockstar Games', note: '+18' }
];

export default function ListaDeJuegosPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-orange-500">Lista de Juegos</h1>

      <div className="space-y-6 max-w-5xl mx-auto">
        {games.map(({ id, name, logoUrl, status, platform, note }) => (
          <div
            key={id}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 gap-4"
          >
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-20 h-20 object-contain bg-gray-900 rounded"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = '/placeholder.png')}
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">
                {name}{' '}
                {note && <span className="text-red-500 text-sm">({note})</span>}
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
