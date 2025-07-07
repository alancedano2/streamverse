'use client';
import React from 'react';

interface Game {
  id: string;
  name: string;
  logoUrl: string;
  status: 'Disponible' | 'No disponible';
  note?: string;
}

const games: Game[] = [
  { id: 'assetto-corsa-competizione', name: 'Assetto Corsa Competizione', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e2/Assetto_Corsa_Competizione_cover_art.jpg' },
  { id: 'beamng', name: 'BeamNG.drive', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/284160/header.jpg' },
  { id: 'call-of-duty-warzone', name: 'Call of Duty: Warzone', status: 'No disponible', note: '+18', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Call_of_Duty_Warzone_cover_art.jpg' },
  { id: 'cyberpunk-2077', name: 'Cyberpunk 2077', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { id: 'drive-beyond-horizons', name: 'Drive Beyond Horizons', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1503190/header.jpg' },
  { id: 'ea-sports-fc-25', name: 'EA SPORTS FC™ 25', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/FIFA_24_logo.png' },
  { id: 'fall-guys', name: 'Fall Guys', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/74/Fall_Guys_Cover_Art.jpg' },
  { id: 'f1-23', name: 'F1 23', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e1/F1_23_cover_art.jpg' },
  { id: 'f1-24', name: 'F1 24', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/F1_Logo.svg/1200px-F1_Logo.svg.png' },
  { id: 'f1-25', name: 'F1 25', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/F1_Logo.svg/1200px-F1_Logo.svg.png' },
  { id: 'forza-horizon-5', name: 'Forza Horizon 5', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Forza_Horizon_4_cover_art.jpg' },
  { id: 'fortnite', name: 'Fortnite', status: 'No disponible', logoUrl: 'https://cdn2.unrealengine.com/Fortnite%2Fblog%2Ffn-celebration-graphic-1920x1080-03102021-1920x1080-611d24c1bffd6a8b20d3b4035d7b5de02f2a6c62.png' },
  { id: 'hot-wheels-unleashed-2', name: 'HOT WHEELS UNLEASHED™ 2 - Turbocharged', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1557280/header.jpg' },
  { id: 'jurassic-world-evolution', name: 'Jurassic World Evolution', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/648350/header.jpg' },
  { id: 'lego-star-wars-saga-skywalker', name: 'LEGO® Star Wars™: La Saga Skywalker', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1741230/header.jpg' },
  { id: 'minecraft', name: 'Minecraft (con servidor incluido)', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Minecraft_cover.png/220px-Minecraft_cover.png' },
  { id: 'monster-jam-showdown', name: 'Monster Jam™ Showdown', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1361520/header.jpg' },
  { id: 'moto-gp-24', name: 'MotoGP™24', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2164740/header.jpg' },
  { id: 'nba-2k23', name: 'NBA 2K23', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/header.jpg' },
  { id: 'nba-2k24', name: 'NBA 2K24', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2629700/header.jpg' },
  { id: 'nba-2k25', name: 'NBA 2K25', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2629700/header.jpg' },
  { id: 'pc-building-simulator-2', name: 'PC Building Simulator 2', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1910970/header.jpg' },
  { id: 'rocket-league', name: 'Rocket League', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg' },
  { id: 'spiderman-2', name: "Marvel's Spider-Man 2", status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Spider-Man_2_cover_art.jpg' },
  { id: 'spiderman-miles-morales', name: "Marvel's Spider-Man Miles Morales", status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Spider-Man_Miles_Morales_cover_art.jpg' },
  { id: 'trackmania', name: 'Trackmania', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/304930/header.jpg' },
  { id: 'the-last-of-us-part-i', name: 'The Last of Us Part I', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/The_Last_of_Us_Part_I_cover_art.jpg' },
  { id: 'uncharted-legacy-thieves-collection', name: 'Uncharted: Legacy of Thieves Collection', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Uncharted_Legacy_of_Thieves_Collection_cover_art.jpg' },
  { id: 'fifa-23', name: 'FIFA 23', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9e/FIFA_23_Logo.svg' },
  { id: 'fifa-24', name: 'FIFA 24', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/FIFA_24_logo.png' },
  { id: 'fifa-25', name: 'FIFA 25', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/FIFA_24_logo.png' },
  { id: 'marvel-rivals', name: 'Marvel Rivals', status: 'No disponible', logoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1363940/header.jpg' },
  { id: 'gta-5', name: 'GTA 5 (con restricción +18)', status: 'No disponible', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V_cover.png' },
];

export default function ListaDeJuegosPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-orange-500">Lista de Juegos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {games.map(({ id, name, logoUrl, status, note }) => (
          <div
            key={id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:scale-105 transform transition-transform duration-300"
          >
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-full h-40 object-contain bg-gray-900 p-4"
              loading="lazy"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2 text-center">
                {name}{' '}
                {note && (
                  <span className="text-red-500 font-bold ml-1" title="Restricción de edad">
                    ({note})
                  </span>
                )}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  status === 'Disponible' ? 'bg-green-600 text-green-100' : 'bg-red-700 text-red-200'
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
