'use client';

import React, { useEffect, useRef, useState } from 'react';
import Clappr from '@clappr/player';
// If you are only using Clappr, you might not need this import anymore:
// import 'video.js/dist/video-js.css';
import Image from 'next/image';

// Ensure you have the necessary Clappr plugins for HLS playback (like HLS.js)
// If you are playing an HLS stream (m3u8), Clappr needs a playback plugin.
// You might need to install @clappr/hlsjs-playback and import it.
// import HlsjsPlayback from '@clappr/hlsjs-playback';

interface StreamDetails {
  title: string;
  description: string;
  league: string;
  playbackUrl: string;
  posterUrl: string;
  isLive: boolean;
  nextEpisodeDate?: string;
}

function getF1RaceDetails(): StreamDetails {
  const today = new Date();
  const isLiveNow = true;

  return {
    title: 'AEW All In 2025',
    description: 'La All Elite Wrestling se apodera de Dallas-Fort Worth esta semana previo al máximo evento AEW All In: Texas que se realizará en el Globe Life Field el sábado 12 de julio.',
    league: 'TV',
    playbackUrl: 'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=http://netlevel.online:8080/live/AURELIO933/AQBWS/588157.m3u8',
    posterUrl: 'https://imageio.forbes.com/specials-images/imageserve/68701f93b203da8077fed41c/AEW-All-in-Texas-at-Globe-Life-Field-in-Arlington-/960x0.jpg?format=jpg&width=960',
    isLive: isLiveNow,
    nextEpisodeDate: `Hoy, ${today.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`,
  };
}

export default function Evento2Page() {
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const clapprInstance = useRef<any>(null);

  // Load stream details only once when the component mounts
  useEffect(() => {
    setStreamDetails(getF1RaceDetails());
  }, []);

  // Initialize Clappr player when streamDetails are available and the playerRef is attached to the DOM
  useEffect(() => {
    if (streamDetails && playerRef.current) {
      // Ensure any previous instance is destroyed before initializing a new one
      if (clapprInstance.current) {
        clapprInstance.current.destroy();
        clapprInstance.current = null;
      }

      // Initialize Clappr
      clapprInstance.current = new Clappr.Player({
        source: streamDetails.playbackUrl,
        poster: streamDetails.posterUrl,
        parentId: `#clappr-player`, // Use the ID of the container element
        autoPlay: true,
        mute: false,
        height: '100%',
        width: '100%',
        // If you are playing HLS, you might need to specify the HlsjsPlayback plugin
        // plugins: [HlsjsPlayback], 
      });
    }

    // Cleanup function: Destroy the player when the component unmounts
    return () => {
      if (clapprInstance.current) {
        clapprInstance.current.destroy();
        clapprInstance.current = null;
      }
    };
  }, [streamDetails]);

  if (!streamDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando detalles del evento...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      <div className="relative z-10 container mx-auto px-4 py-8 pt-12 md:pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 text-center mb-8">
          {streamDetails.title}
        </h1>

        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-black">
          {streamDetails.isLive && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
              EN VIVO
            </div>
          )}
          {/* Ensure the player container has the ID 'clappr-player' and the ref */}
          <div id="clappr-player" ref={playerRef} className="w-full h-full"></div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-3">Detalles del Evento</h2>
          <p className="text-gray-300 text-lg mb-4">{streamDetails.description}</p>
          <p className="text-gray-400 text-sm">
            Liga: <span className="font-semibold text-white">{streamDetails.league}</span>
          </p>
          {streamDetails.nextEpisodeDate && (
            <p className="text-gray-400 text-sm mt-1">
              Fecha del evento: <span className="font-semibold text-white">{streamDetails.nextEpisodeDate}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
