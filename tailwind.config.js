// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ¡CRÍTICO! Esto permite alternar temas con la clase 'dark'
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // <--- ¡Asegúrate de que esta línea esté aquí!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};