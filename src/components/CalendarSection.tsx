// src/components/CalendarSection.tsx
'use client';

import React from 'react';
import Link from 'next/link'; // Aunque Link se usará para el modal, mantenemos la importación
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  dateTime: string;
  league: string;
  matchup: string;
  link: string; // El enlace a la página de detalles del evento
}

interface CalendarSectionProps {
  title: string;
  events: CalendarEvent[];
  displayDate: Date;
  onEventClick: (event: CalendarEvent) => void; // <-- Nueva prop para manejar el clic
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ title, events, displayDate, onEventClick }) => {
  if (!events || events.length === 0) {
    return (
      <section className="px-4 md:px-8 py-6">
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
        <div className="bg-gray-700 text-white text-center py-3 mb-4 rounded-lg">
          <h3 className="text-lg font-semibold">
            {isToday(displayDate) ? 'Hoy' : isTomorrow(displayDate) ? 'Mañana' : format(displayDate, 'EEEE d \'de\' MMMM \'de\' BBBB', { locale: es })} - Horario Agenda Local
          </h3>
        </div>
        <p className="text-gray-400 text-center py-8">No hay eventos programados para este día.</p>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>

      <div className="bg-gray-700 text-white text-center py-3 mb-4 rounded-lg">
        <h3 className="text-lg font-semibold">
          {isToday(displayDate) ? 'Hoy' : isTomorrow(displayDate) ? 'Mañana' : format(displayDate, 'EEEE d \'de\' MMMM \'de\' BBBB', { locale: es })} - Horario Agenda Local
        </h3>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
        {events.map((event, index) => {
          const eventTime = parseISO(event.dateTime);

          return (
            <div // Cambiamos Link por div para controlar el clic directamente
              key={event.id}
              onClick={() => onEventClick(event)} // Llama a la función al hacer clic
              className={`flex items-center py-3 px-4 md:px-6 cursor-pointer
                ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'}
                hover:bg-gray-700 transition-colors duration-200
                border-b border-gray-700 last:border-b-0`}
            >
              {/* Hora */}
              <div className="flex-none text-orange-400 font-bold text-lg w-24 md:w-28 text-center">
                {format(eventTime, 'h:mm a', { locale: es }).toUpperCase()}
              </div>

              {/* Detalles del Partido */}
              <div className="flex-1 ml-4">
                <p className="text-gray-300 text-sm md:text-base">{event.league}</p>
                <p className="text-white font-semibold text-base md:text-lg">
                  {event.matchup}
                </p>
              </div>

              {/* Flecha de más información */}
              <div className="flex-none text-gray-500 transition-colors ml-auto">
                {/* Puedes añadir un icono de flecha derecha aquí si lo deseas, como HiChevronRight */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarSection;