// src/app/(main)/gaming/page.tsx
'use client'; 
import React, { useState, useEffect } from 'react';
import { IoGameController } from 'react-icons/io5'; 

// ** NUEVO: Interfaz para el tipo de datos de cada juego **
interface Game {
  id: string; // app_id de Moonlight
  name: string;
  host_id: string;
  // Puedes añadir otras propiedades si tu API las devuelve y las vas a usar (ej. 'status', 'ip')
}

// ¡IMPORTANTE! Reemplaza '204.2.89.234' con tu IP pública real y '5000' con el puerto de tu servidor Python API.
// Si tu IP pública cambia (muchos proveedores dan IPs dinámicas), tendrás que actualizar esto.
// ADVERTENCIA DE SEGURIDAD: Exponer tu IP pública en el código fuente del cliente es un riesgo.
const API_BASE_URL = 'https://175f-2607-f00-9-4263-310e-7441-fcf7-c36c.ngrok-free.app/api/moonlight'; 

const GamingPage = () => {
  // ** CAMBIO AQUÍ: Tipado del estado 'games' **
  const [games, setGames] = useState<Game[]>([]); 
  const [loading, setLoading] = useState(true);
  // ** CAMBIO AQUÍ: Tipado explícito para 'error' **
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/games`);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data: Game[] = await response.json(); // Casteamos la data a Game[]
        setGames(data);
      } catch (e: unknown) { 
        let errorMessage = 'Error desconocido al cargar los juegos.';
        if (e instanceof Error) {
          errorMessage = e.message;
        } else {
          errorMessage = String(e);
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const launchGame = async (gameId: string, hostId: string) => {
    // Paso 1: Llamar a tu API para iniciar el juego en tu PC
    try {
      const response = await fetch(`${API_BASE_URL}/launch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: gameId, host_id: hostId }),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP al lanzar juego: ${response.status}`);
      }
      alert('Juego enviado a tu PC. Ahora, conéctate al stream en la nueva ventana.');

      // Paso 2: Abrir el cliente web de Moonlight/Parsec en una nueva pestaña
      window.open('https://web.moonlight-stream.org/', '_blank'); 
      // O si prefieres Parsec: window.open('https://web.parsec.app/', '_blank');
      
    } catch (e: unknown) { 
      let errorMessage = 'Error desconocido al iniciar el juego.';
      if (e instanceof Error) {
        errorMessage = e.message;
      } else {
        errorMessage = String(e);
      }
      alert(`Error al iniciar el juego: ${errorMessage}. Asegúrate de que tu servidor API esté funcionando y sea accesible.`);
    }
  };

  if (loading) return <p className="text-white">Cargando juegos de Moonlight desde tu PC...</p>;
  if (error) return <p className="text-red-500">Error: {error}. Asegúrate de que tu servidor API local esté funcionando y que el port forwarding esté configurado correctamente para la IP {API_BASE_URL.split('/api')[0]}.</p>;
  if (games.length === 0) return <p className="text-white">No se encontraron juegos en tu PC Moonlight. Asegúrate de que Moonlight está iniciado en tu PC y que tu servidor API lo está detectando.</p>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-10">
        Jugar en la PC de tu Amigo (Tú)
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
        Aquí verás la lista de juegos disponibles en mi PC. Haz clic en "Lanzar Juego" para iniciarlo,
        luego se abrirá una nueva ventana para que te conectes al stream.
        <br/>
        <strong className="text-red-500">
          ADVERTENCIA: Esta función requiere que mi PC y el servidor API estén encendidos y que mi router permita el acceso externo.
          Úsala solo con mi permiso.
        </strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
              <IoGameController size={60} /> 
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-2 truncate">{game.name}</h2>
              <button
                onClick={() => launchGame(game.id, game.host_id)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Lanzar Juego
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingPage;
