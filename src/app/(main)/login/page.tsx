'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const allowedUsers = ['user1@tuweb.com', 'user2@tuweb.com', 'admin@tuweb.com'];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (allowedUsers.includes(email.trim().toLowerCase())) {
      localStorage.setItem('userEmail', email.trim().toLowerCase());
      router.push('/gaming');
    } else {
      setError('Correo no autorizado');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🎮 Login a tu Sesión Parsec</h1>
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="w-full bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
