'use client';

export default function GamingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6">
      <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">
        ⚠️ ADVERTENCIA
      </h1>
      <p className="text-center text-lg max-w-xl">
        Esta página no está disponible porque está en proceso de mantenimiento.
        <br />
        Próximamente la inauguraremos con nuevas funciones y mejoras.
        <br />
        Más actualizaciones en{' '}
        <a
          href="https://streamverse-neon.vercel.app/configuracion"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-orange-500 hover:text-orange-400"
        >
          StreamVerse Discord
        </a>
      </p>
    </div>
  );
}
