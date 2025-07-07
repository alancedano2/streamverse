'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GamingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      router.push('/login'); // Si no está logueado, lo manda al login
      return;
    }

    // Abrir Parsec Web
    window.open('https://web.parsec.app/', '_blank');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-orange-500">Conectándote a Parsec...</h1>
      <p className="text-center mt-4 text-gray-400">Estamos abriendo tu sesión. Si no pasa nada, <a href="https://web.parsec.app/" target="_blank" className="underline text-blue-400">haz clic aquí</a>.</p>
    </div>
  );
};

export default GamingPage;
