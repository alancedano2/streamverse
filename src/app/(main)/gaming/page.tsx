'use client';

import { useState } from 'react';

const GAMES = [
  { id: 'steam', name: 'Steam' },
  { id: 'fortnite', name: 'Fortnite' },
  { id: 'valorant', name: 'Valorant' }
];

export default function GamingPage() {
  const [loading, setLoading] = useState(false);

  const launchGame = async (gameId: string) => {
    setLoading(true);
    try {
      const res = await fetch('http://204.2.89.234:5000/api/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: gameId })
      });
      const result = await res.json();
      alert(result.message || result.error);
    } catch (err) {
      alert('Error al conectar con tu PC host.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        🎮 Juegos Disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => launchGame(game.id)}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg shadow hover:opacity-90"
          >
            {loading ? 'Lanzando...' : `🎮 ${game.name}`}
          </button>
        ))}
      </div>
      <p className="text-center text-gray-400 mt-10">
        Luego de lanzar, abre <a href="https://moonlight-stream.org/web" target="_blank" className="underline text-blue-400">Moonlight Web</a> o usa la app para conectarte a <strong>204.2.89.234</strong>
      </p>
    </div>
  );
}
