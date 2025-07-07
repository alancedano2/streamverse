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
  { id: 'assetto-corsa', name: 'Assetto Corsa Competizione', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/805550/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'beamng', name: 'BeamNG.drive', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/284160/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'call-of-duty-warzone', name: 'Call of Duty: Warzone', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1961620/capsule_616x353.jpg', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg', status: 'No disponible', platform: 'PC', note: '+18' },
  { id: 'drive-beyond-horizons', name: 'Drive Beyond Horizons', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2763260/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'ea-fc25', name: 'EA SPORTS FC™ 25', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'f1-23', name: 'F1 23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'f1-24', name: 'F1 24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2488210/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'f1-25', name: 'F1 25', logoUrl: 'https://via.placeholder.com/128x128?text=F1+25', status: 'No disponible', platform: 'PC' },
  { id: 'fall-guys', name: 'Fall Guys', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'forza-horizon-5', name: 'Forza Horizon 5', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'fortnite', name: 'Fortnite', logoUrl: 'https://cdn2.unrealengine.com/Fortnite%2Ffn-ch5s3-comp-keyart-social-512x512.png', status: 'No disponible', platform: 'Epic Games' },
  { id: 'gta5', name: 'GTA 5', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg', status: 'No disponible', platform: 'Rockstar', note: '+18' },
  { id: 'hotwheels-2', name: 'HOT WHEELS UNLEASHED™ 2', logoUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/2009/bd4ce1dfd6ce2705e0ae713437fcb299c80521b4a3a699c8.png', status: 'No disponible', platform: 'PC' },
  { id: 'jurassic-evolution', name: 'Jurassic World Evolution', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/339450/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'lego-star-wars', name: 'LEGO® Star Wars™: La Saga Skywalker', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1906550/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'marvel-rivals', name: 'Marvel Rivals', logoUrl: 'https://cdn2.unrealengine.com/egs-marvelrivals-thumbnail-1200x1600-b631ae7573a0.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'miles-morales', name: 'Marvel\'s Spider-Man Miles Morales', logoUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202010/2202/y16zKz2x73M515t812bY0bL7.png', status: 'No disponible', platform: 'PC' },
  { id: 'spiderman2', name: 'Marvel\'s Spider-Man 2', logoUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202305/0411/72aa24f707f1f41ed93bf976fc805179.png', status: 'No disponible', platform: 'PC' },
  { id: 'minecraft', name: 'Minecraft', logoUrl: 'https://www.minecraft.net/content/dam/minecraft/pdp/games/minecraft-java-bedrock-pdp-masthead.jpg', status: 'No disponible', platform: 'PC', note: '(con servidor incluido)' },
  { id: 'monster-jam', name: 'Monster Jam™ Showdown', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2635990/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'motogp24', name: 'MotoGP™24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2894180/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k23', name: 'NBA 2K23', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k24', name: 'NBA 2K24', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2265400/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'nba2k25', name: 'NBA 2K25', logoUrl: 'https://via.placeholder.com/128x128?text=NBA+2K25', status: 'No disponible', platform: 'PC' },
  { id: 'pc-building-sim', name: 'PC Building Simulator 2', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2122600/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'rocket-league', name: 'Rocket League', logoUrl: 'https://cdn2.unrealengine.com/egs-rocketleague-s3-1200x1600-1200x1600-f975d496a77d.jpg', status: 'No disponible', platform: 'Epic Games' },
  { id: 'the-last-of-us', name: 'The Last of Us Part I', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
  { id: 'trackmania', name: 'Trackmania', logoUrl: 'https://ubistatic-a.akamaihd.net/0064/prod/trackmania_logo.png', status: 'No disponible', platform: 'Ubisoft Connect' },
  { id: 'uncharted', name: 'Uncharted: Legacy of Thieves Collection', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1741790/capsule_616x353.jpg', status: 'No disponible', platform: 'PC' },
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
