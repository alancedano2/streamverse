// src/components/Header.tsx
'use client';

import React, { useState } from 'react'; // useState ya no es necesario si quitas el buscador
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi'; // HiOutlineSearch ya no es necesario
// useRouter ya no es necesario
// import { useRouter } from 'next/navigation';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  // Estados y funciones del buscador eliminados
  // const [searchTerm, setSearchTerm] = useState('');
  // const [isSearchFocused, setIsSearchFocused] = useState(false);
  // const router = useRouter();

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchTerm.trim()) {
  //     router.push(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
  //     setSearchTerm('');
  //     setIsSearchFocused(false);
  //   }
  // };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-sm z-50 p-4 flex items-center justify-between shadow-lg">
      {/* Botón de Hamburguesa para Sidebar (visible solo en móviles/pequeñas) */}
      <button
        onClick={onToggleSidebar}
        className="text-white text-2xl lg:hidden mr-4"
        aria-label="Toggle navigation"
      >
        <HiMenu />
      </button>

      {/* Logo de Streamverse (IMAGEN) */}
      <Link href="/" className="flex-shrink-0 mr-auto"> {/* Añadido mr-auto para empujar el logo a la izquierda */}
        <Image
          src="/images/logo.png" // <--- ¡AQUÍ VA LA RUTA A TU LOGO!
          alt="Streamverse Logo"
          width={200}
          height={50}
          priority
          className="h-auto"
        />
      </Link>

      {/* ¡Buscador y sus iconos ELIMINADOS! */}
      {/*
      <form onSubmit={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => !searchTerm && setIsSearchFocused(false)}
            className={`relative flex-grow hidden md:flex items-center mx-4 transition-all duration-300
              ${isSearchFocused ? 'max-w-xl' : 'max-w-md'}`}
      >
        <input
          type="text"
          placeholder="Buscar eventos, ligas, atletas..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <HiOutlineSearch className="absolute left-3 text-gray-400 text-xl" />
      </form>
      <button className="text-white text-2xl md:hidden ml-auto" aria-label="Search" onClick={() => console.log('Activar búsqueda móvil')}>
          <HiOutlineSearch />
      </button>
      */}
    </header>
  );
};

export default Header;