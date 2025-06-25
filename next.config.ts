// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.wwe.com',
      },
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
      {
        protocol: 'https',
        hostname: 's.secure.espncdn.com', // Subdominio de ESPN
      },
      {
        protocol: 'https',
        hostname: 'cdn.vox-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'www.wwe.com',
      },
      {
        protocol: 'https',
        hostname: 'phantom-marca.unidadeditorial.es',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // Miniaturas de YouTube
      },
      {
        protocol: 'https',
        hostname: 'www.formula1.com',
      },
      {
        protocol: 'https',
        hostname: 'formula1.ferrari.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mlb.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gannett-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static-assets.larazon.es',
      },
      {
        protocol: 'https',
        hostname: '411mania.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gainbridgefieldhouse.com',
      },
      {
        protocol: 'https',
        hostname: 'www.wrestlinginc.com',
      },
      {
        protocol: 'https',
        hostname: 'images2.minutemediacdn.com',
      },
      {
        protocol: 'https',
        hostname: 'mlpnk72yciwc.i.optimole.com', // Para WWE Raw (bleedingcool.com)
      },
      {
        protocol: 'https',
        hostname: 'images.cwtv.com', // Para WWE NXT
      },
      {
        protocol: 'https',
        hostname: 'www.myfmbankarena.com', // Para AEW Dynamite
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net', // Para AEW Double or Nothing
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // Para el placeholder de Google Images (si aún lo tienes)
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Para logos de BSN, WWE, AEW, F1
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Para el placeholder genérico
      },
      {
        protocol: 'https',
        hostname: 'geo.dailymotion.com', // Para el reproductor de DailyMotion
      },
      {
        protocol: 'https',
        hostname: 'www.pwmania.com', // Para el logo de Raw (el de la captura)
      },
      {
        protocol: 'https',
        hostname: 'live20.bozztv.com', // Para tus streams M3U8 de BSN y otros
      },
      {
        protocol: 'https',
        hostname: 'mediaiptvproxy.fraelvillegasplay8.workers.dev', // Para tu proxy de stream M3U8
      },
      // Dominios para YouTube que son comunes en embeds (añadidos o revisados)
      {
        protocol: 'https',
        hostname: 'www.youtube.com', // <-- Este era el que faltaba para los embeds de YouTube
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // Ya estaba
      },
      {
        protocol: 'https',
        hostname: 'ytimg.com', // Ya estaba
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com', // Para embeds de YouTube que usan este
      },
      {
        protocol: 'https',
        hostname: 'ok.ru', // <-- ¡NUEVO! Para el embed de Ok.ru que acabamos de agregar
      },
    ],
  },
};

module.exports = nextConfig;