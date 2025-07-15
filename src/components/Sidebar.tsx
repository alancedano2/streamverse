// src/components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HiHome,
  HiPlay,
  HiRefresh,
  HiStar,
  HiClock,
  HiCog,
  HiQuestionMarkCircle,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi';
import { FaBaseballBall, FaFootballBall, FaFistRaised, FaFutbol } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5'; // <-- Importa el icono

interface SidebarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  const [isLeaguesExpanded, setIsLeaguesExpanded] = useState(true);

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 z-40
        ${isSidebarOpen ? 'w-[250px]' : 'w-[70px]'} lg:w-[250px]
        transition-all duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      <div className="pt-20 flex-grow overflow-y-auto">
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/" className="flex items-center text-lg py-2 px-3 rounded-md hover:bg-gray-700 transition-colors">
                <HiHome className="text-xl mr-3 flex-shrink-0" />
                <span className={`${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Inicio</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/en-vivo" className="flex items-center text-lg py-2 px-3 rounded-md hover:bg-gray-700 transition-colors">
                <HiPlay className="text-xl mr-3 flex-shrink-0" />
                <span className={`${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>En Vivo Ahora</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/repeticiones" className="flex items-center text-lg py-2 px-3 rounded-md hover:bg-gray-700 transition-colors">
                <HiRefresh className="text-xl mr-3 flex-shrink-0" />
                <span className={`${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Repeticiones</span>
              </Link>
            </li>

            {/* NUEVO ITEM GAMING */}
            <li className="mb-2">
              <Link href="https://play-streamverse.vercel.app/" className="flex items-center text-lg py-2 px-3 rounded-md hover:bg-gray-700 transition-colors">
                <IoGameController className="text-xl mr-3 flex-shrink-0" />
                <span className={`${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>Gaming</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${isSidebarOpen ? 'block' : 'hidden lg:block'} mt-auto border-t border-gray-700 pt-4`}>
        <ul>
          <li className="mb-2">
            <Link href="/configuracion" className="flex items-center text-lg py-2 px-3 rounded-md hover:bg-gray-700 transition-colors">
              <HiCog className="text-xl mr-3 flex-shrink-0" />
              <span>Configuración</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/ayuda" className="flex items-center text-lg py-2 px-3 rounded-md hover:bg-gray-700 transition-colors">
              <HiQuestionMarkCircle className="text-xl mr-3 flex-shrink-0" />
              <span>Ayuda</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
