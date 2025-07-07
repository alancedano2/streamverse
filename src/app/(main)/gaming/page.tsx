'use client';
import { useEffect } from 'react';

const parsecLinks: Record<string, string> = {
  'user1@tudominio.com': 'https://web.parsec.app/',
  'user2@tudominio.com': 'https://web.parsec.app/',
  'admin@tudominio.com': 'https://web.parsec.app/'
  // Aquí puedes personalizar si en un futuro Parsec permite URLs únicas por cuenta.
};

export default function GamingPage() {
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail'); // o desde session
    const link = parsecLinks[userEmail || ''];
    if (link) {
      window.open(link, '_blank');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-orange-500">🎮 Conectándote...</h1>
      <p>Estamos abriendo tu sesión de juego en <strong>Parsec Web</strong>. Asegúrate de tener tu cuenta iniciada.</p>
    </div>
  );
}
