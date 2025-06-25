// src/app/(main)/MainLayoutClient.tsx
'use client'; // ¡IMPORTANTE! Este DEBE ser un Client Component.

import React, { useState } from 'react'; // Necesita useState
import Header from '@/components/Header'; // Tu componente Header
import Sidebar from '@/components/Sidebar'; // Tu componente Sidebar

interface MainLayoutClientProps {
  children: React.ReactNode; // Las páginas de tu aplicación (Home, /en-vivo, etc.)
}

const MainLayoutClient: React.FC<MainLayoutClientProps> = ({ children }) => {
  // Estado para controlar si la sidebar está abierta o cerrada
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Función para alternar el estado de la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <> {/* Usamos un fragmento (<>) porque este componente no debe renderizar <html> o <body>.
          Es un hijo directo del <body> que está en src/app/(main)/layout.tsx */}
      {/* Tu Header, le pasamos la función para alternar la sidebar */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Contenedor principal que flexiona la Sidebar y el Contenido de la Página */}
      <div className="flex flex-grow pt-20"> {/* pt-20 para dar espacio al Header fijo */}
        {/* Tu Sidebar, le pasamos el estado y la función para que se controle */}
        <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

        {/* El área principal donde se renderiza el contenido de cada página */}
        <main
          className={`flex-1 p-4 lg:p-8 transition-all duration-300 ease-in-out
                     ${isSidebarOpen ? 'ml-[250px]' : 'ml-[70px] lg:ml-[250px]'}`}
        >
          {children} {/* Aquí se inserta el contenido de la página actual */}
        </main>
      </div>
    </>
  );
};

export default MainLayoutClient;