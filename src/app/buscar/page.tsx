// src/app/buscar/page.tsx
// ¡NO 'use client'; aquí! Es un Server Component por defecto.

import React from 'react';
import Link from 'next/link'; // <-- ¡Añadido 'Link' aquí!

// Para acceder a los parámetros de la URL (ej. ?q=query) en Server Components
interface SearchPageProps {
  searchParams: {
    q?: string; // El parámetro de búsqueda
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''; // Obtiene el valor de 'q'

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-8">
        Resultados de Búsqueda
      </h1>
      <p className="text-xl text-gray-300 text-center mb-12">
        Buscando: "<span className="font-bold">{query}</span>"
      </p>

      {/* Ejemplo de Grid de resultados (simulado) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {query && query.length > 0 ? (
          <>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-white font-semibold text-lg">{query} - Evento 1</h3>
              <p className="text-gray-400 text-sm">Descripción del evento relacionado con "{query}".</p>
              <Link href={`/eventos/busqueda-${query}-evento1`} className="text-orange-400 hover:underline text-sm mt-2 block">Ver detalles</Link>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-white font-semibold text-lg">{query} - Noticia 1</h3>
              <p className="text-gray-400 text-sm">Noticia sobre "{query}" en el deporte.</p>
              <Link href={`/noticias/busqueda-${query}-noticia1`} className="text-orange-400 hover:underline text-sm mt-2 block">Leer más</Link>
            </div>
             <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-white font-semibold text-lg">{query} - Repetición</h3>
              <p className="text-gray-400 text-sm">Repetición del evento de "{query}".</p>
              <Link href={`/eventos/busqueda-${query}-repeticion`} className="text-orange-400 hover:underline text-sm mt-2 block">Ver repetición</Link>
            </div>
            <div className="col-span-full text-center text-gray-400 py-4">
                <p>Mostrando resultados para "{query}".</p>
                <p>En un sitio real, aquí habría lógica de búsqueda de backend.</p>
            </div>
          </>
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">
            Por favor, introduce un término de búsqueda para ver los resultados.
          </div>
        )}
      </div>
    </div>
  );
}