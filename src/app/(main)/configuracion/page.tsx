// src/app/(main)/configuracion/page.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Necesitamos useEffect para el tema si se aplica globalmente
import Link from 'next/link';

export default function ConfiguracionPage() {
  // Estado para el tema (true = oscuro, false = claro)
  const [darkMode, setDarkMode] = useState(true); // Asumimos modo oscuro por defecto
  // Estado para el idioma de la página
  const [pageLanguage, setPageLanguage] = useState('es'); // Asumimos español por defecto

  // Efecto para aplicar el tema al <body> global
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark');
      body.classList.remove('light'); // Asume que tu CSS de Tailwind tiene clases 'dark'/'light' o similar
      body.classList.add('bg-gray-950', 'text-white'); // Asegura el fondo oscuro y texto claro
      body.classList.remove('bg-white', 'text-gray-900'); // Elimina clases de modo claro
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
      body.classList.add('bg-white', 'text-gray-900'); // Asegura el fondo claro y texto oscuro
      body.classList.remove('bg-gray-950', 'text-white');
    }
  }, [darkMode]); // Se ejecuta cada vez que darkMode cambia

  const handleSaveChanges = () => {
    alert('Configuración de tema e idioma guardada (simulado)!');
    // En un entorno real, aquí guardarías estas preferencias del usuario (ej. en localStorage o backend)
    console.log({ darkMode, pageLanguage });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-10">
        Configuración
      </h1>

      <div className="max-w-xl mx-auto space-y-8"> {/* Contenedor más pequeño y centrado */}
        {/* Sección: Tema de la Aplicación */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Tema de la Aplicación</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 font-semibold">Modo Oscuro (No Funcionando)</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>

        {/* Sección: Idioma de la Página */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Idioma de la Página</h2>
          <div>
            <label htmlFor="pageLanguage" className="block text-gray-300 text-sm font-semibold mb-2 sr-only">Seleccionar Idioma</label> {/* sr-only para esconder visualmente */}
            <select
              id="pageLanguage"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={pageLanguage}
              onChange={(e) => setPageLanguage(e.target.value)}
            >
              <option value="es">Español</option>
              <option value="en">English (Not Working)</option>
              {/* Añade más idiomas si es necesario */}
            </select>
          </div>
        </div>

        {/* Sección: Contacto */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Contacto</h2>
          <p className="text-gray-300 mb-4">Únete a nuestra comunidad de Discord para soporte y novedades:</p>
          <div className="text-center">
            <Link
              href="https://discord.com/invite/p4k2EpQ8BZ"
              target="_blank" // Abrir en nueva pestaña
              rel="noopener noreferrer" // Seguridad para target="_blank"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Unirse al Discord
            </Link>
          </div>
        </div>

        {/* Botón Guardar Cambios */}
        <div className="text-center mt-10">
          <button
            onClick={handleSaveChanges}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}