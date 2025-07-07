/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.wwe.com' },
      { protocol: 'https', hostname: 'a.espncdn.com' },
      { protocol: 'https', hostname: 's.secure.espncdn.com' },
      { protocol: 'https', hostname: 'cdn.vox-cdn.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'www.wwe.com' },
      { protocol: 'https', hostname: 'phantom-marca.unidadeditorial.es' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'www.formula1.com' },
      { protocol: 'https', hostname: 'formula1.ferrari.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'www.mlb.com' },
      { protocol: 'https', hostname: 'www.gannett-cdn.com' },
      { protocol: 'https', hostname: 'static-assets.larazon.es' },
      { protocol: 'https', hostname: '411mania.com' },
      { protocol: 'https', hostname: 'www.gainbridgefieldhouse.com' },
      { protocol: 'https', hostname: 'www.wrestlinginc.com' },
      { protocol: 'https', hostname: 'images2.minutemediacdn.com' },
      { protocol: 'https', hostname: 'mlpnk72yciwc.i.optimole.com' },
      { protocol: 'https', hostname: 'images.cwtv.com' },
      { protocol: 'https', hostname: 'www.myfmbankarena.com' },
      { protocol: 'https', hostname: 'static.wikia.nocookie.net' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }, // <--- ADD THIS LINE
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'geo.dailymotion.com' },
      { protocol: 'https', hostname: 'www.pwmania.com' },
      { protocol: 'https', hostname: 'live20.bozztv.com' },
      { protocol: 'https', hostname: 'mediaiptvproxy.fraelvillegasplay8.workers.dev' },
      { protocol: 'https', hostname: 'www.youtube.com' },
      { protocol: 'https', hostname: 'ytimg.com' },
      { protocol: 'https', hostname: 'googleusercontent.com' },
      { protocol: 'https', hostname: 'ok.ru' },
      { protocol: 'https', hostname: 'bloximages.chicago2.vip.townnews.com' },
      // New for games
      { protocol: 'https', hostname: 'cdn.cloudflare.steamstatic.com' },
      { protocol: 'https', hostname: 'cdn2.unrealengine.com' },
      { protocol: 'https', hostname: 'steamgriddb.com' }, // <--- ADD THIS LINE if you're using SteamGridDB for Fall Guys logo
    ]
  }
};

module.exports = nextConfig;
