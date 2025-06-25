// src/app/(main)/layout.tsx
// ¡IMPORTANTE! NO DEBE TENER 'use client'; aquí. Este es un Server Component por defecto.

import type { Metadata } from 'next'; // Importa los tipos para Metadata
import { Inter } from 'next/font/google'; // O la fuente que elijas para tu proyecto
import '../globals.css'; // Asegúrate de que esta ruta a tus estilos globales sea correcta

// Importamos el componente MainLayoutClient. Este SÍ es un 'use client' component.
// Este componente contendrá tu Header y Sidebar, que necesitan interactividad del cliente.
import MainLayoutClient from './MainLayoutClient';

const inter = Inter({ subsets: ['latin'] }); // Configura tu fuente principal (ej. Inter)

// Metadata para tu aplicación (importante para SEO). Solo se define en Server Components.
export const metadata: Metadata = {
  title: 'Streamverse v2 - Deportes en Vivo y Repeticiones',
  description: 'Tu destino para los mejores eventos deportivos, en vivo y bajo demanda.',
  // Puedes añadir más meta etiquetas aquí si lo deseas
  // keywords: ['deportes', 'streaming', 'WWE', 'MLB', 'F1', 'repeticiones', 'en vivo'],
  // openGraph: { /* ... */ },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // `children` es el contenido de las páginas anidadas (home, /en-vivo, /wwe-raw, etc.)
}>) {
  return (
    // La etiqueta <html> es crucial para el layout raíz
    <html lang="es">
      {/* La etiqueta <body> es crucial para el layout raíz */}
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        {/*
          Aquí es donde el MainLayoutClient (que contiene Header y Sidebar)
          envuelve todo el contenido de la aplicación.
          Es Client Component, por lo que React lo hidrata en el navegador.
        */}
        <MainLayoutClient>
          {children} {/* Este `children` representa la página actual que se está visitando */}
        </MainLayoutClient>
      </body>
    </html>
  );
}