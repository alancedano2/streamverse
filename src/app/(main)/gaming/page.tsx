'use client';
import { useState } from 'react';

const GAMES = [
  { id: 'steam', name: 'Steam' },
  { id: 'fortnite', name: 'Fortnite' },
  { id: 'valorant', name: 'Valorant' }
];

export default function GamingPage() {
  const [launching, setLaunching] = useState<string | null>(null);

  const handleLaunch = async (gameId: string) => {
    setLaunching(gameId);

    // OPCIONAL: Enviar señal a tu backend para lanzar el juego en tu PC
    try {
      await fetch(`http://204.2.89.234:5000/api/launch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: gameId })
      });
    } catch (err) {
      console.warn("No se pudo lanzar el juego desde backend.");
    }

    // Abre Moonlight Web en nueva pestaña
    window.open('https://moonlight-stream.org/web/', '_blank');

    setLaunching(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-8">🎮 Juegos Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {GAMES.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-semibold mb-4">{game.name}</h2>
            <button
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded transition"
              onClick={() => handleLaunch(game.id)}
              disabled={launching === game.id}
            >
              {launching === game.id ? 'Lanzando...' : 'Lanzar y Conectarse'}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-10 max-w-xl mx-auto">
        Después de lanzar, te abriremos automáticamente <strong>Moonlight Web</strong>. Allí verás tu PC <strong>(204.2.89.234)</strong>.
        Asegúrate de haber emparejado previamente con el cliente una vez. Sunshine debe estar ejecutándose.
      </p>
    </div>
  );
}
