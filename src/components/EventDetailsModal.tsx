// src/components/EventDetailsModal.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { HiX } from 'react-icons/hi'; // Icono para cerrar el modal

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    league: string;
    matchup: string;
    dateTime: string;
    link: string; // El enlace original del evento (para la página de detalles o externa)
  } | null; // El evento que se va a mostrar, o null si no hay ninguno
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) {
    return null; // No renderizar si no está abierto o no hay evento
  }

  // Podemos asumir que si es un evento del calendario que abre este modal,
  // es un evento que "va a empezar pronto" o ya está "En Vivo Ahora".
  // Ajusta la lógica de redirección según tus necesidades reales.
  const redirectToLiveLink = '/en-vivo'; // La URL a tu sección "En Vivo Ahora"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]">
      <div className="bg-gray-800 rounded-lg p-6 md:p-8 w-11/12 max-w-md relative shadow-2xl border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <HiX size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">{event.title}</h2>
        <p className="text-gray-300 text-lg mb-2">{event.league}</p>
        <p className="text-white text-xl font-semibold mb-6">{event.matchup}</p>
        <p className="text-gray-400 text-md mb-8">
          Programado para: {new Date(event.dateTime).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
        </p>

        <p className="text-white text-lg mb-6">
          Este evento está disponible en la sección "En Vivo Ahora".
        </p>

        <div className="flex flex-col space-y-4">
          <Link href={redirectToLiveLink} onClick={onClose}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg text-center text-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ir a "En Vivo Ahora"
          </Link>
          {/* Opcional: Un botón para ver la página de detalles completa del evento si es necesario */}
          {event.link && (
            <Link href={event.link} onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-center text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Ver Detalles del Evento
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;