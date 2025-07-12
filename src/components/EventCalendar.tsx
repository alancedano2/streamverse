// src/components/EventCalendar.tsx
'use client';

import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";

interface Event {
  id: string;
  title: string;
  league: string;
  dateTime: string;
  link: string;
  description: string;
}

// Ejemplo de datos de eventos (se podrían cargar desde una API real)
const eventsData: Event[] = [
  {
    id: 'PPV',
    title: 'NXT The American Great Bash',
    league: 'WWE PLE',
    dateTime: '2025-07-12T15:00:00', // Miércoles 25 de Junio, 7:15 PM AST
    link: '/evento-1',
    description: 'WWE will kick off their Atlanta takeover with "WWE NXT" Great American Bash, set from Center Stage on Saturday afternoon.', // Corrected: Added missing closing quote
  },
  {
    id: 'AEW',
    title: 'AEW All In 2025',
    league: 'AEW',
    dateTime: '2025-07-12T19:00:00',
    link: '/evento-2',
    description: 'La All Elite Wrestling se apodera de Dallas-Fort Worth esta semana previo al máximo evento AEW All In: Texas que se realizará en el Globe Life Field el sábado 12 de julio.',
  },
  {
    id: 'MLB',
    title: 'Yankees vs Red Sox',
    league: 'MLB',
    dateTime: '2025-07-13T18:00:00',
    link: '/mlb',
    description: 'A classic baseball rivalry continues.',
  },
  {
    id: 'NBA',
    title: 'NBA Finals Game 7',
    league: 'NBA',
    dateTime: '2025-07-14T21:00:00',
    link: '/bsn-1',
    description: 'The final game of the NBA championship.',
  },
];

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Función para filtrar eventos por fecha seleccionada
  const eventsForSelectedDate = selectedDate
    ? eventsData.filter(event => {
        const eventDate = new Date(event.dateTime);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  // Función para manejar clics en eventos (opcional)
  const handleEventClick = (event: Event) => {
    // Aquí puedes redirigir al usuario o abrir un modal con los detalles del evento
    window.location.href = event.link;
  };

  return (
    <div className="p-6 bg-background rounded-lg shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Columna del Calendario */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-primary">Calendario de Eventos</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border p-4 bg-card shadow-lg w-full"
        />
      </div>

      {/* Columna de la Lista de Eventos */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-4 text-secondary-foreground">
          Eventos para {selectedDate?.toDateString() || "Selecciona una fecha"}
        </h3>
        <div className="space-y-4">
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event) => (
              <div
                key={event.id}
                className="p-4 border border-gray-700 rounded-lg bg-card-foreground hover:bg-gray-800 transition cursor-pointer shadow-md"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-primary">{event.title}</span>
                  <span className="text-sm text-gray-400">{event.league}</span>
                </div>
                <p className="text-sm text-gray-300">{new Date(event.dateTime).toLocaleTimeString()}</p>
                <p className="mt-2 text-sm text-gray-400">{event.description}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No hay eventos programados para esta fecha.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
