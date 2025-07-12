// src/app/(main)/evento-2/page.tsx
'use client'; // IMPORTANT: This MUST be a Client Component.

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// We will use standard <script> tags for Clappr and its HLS plugin.
// Since we are running in 'use client' mode, we will rely on the Clappr global object
// after the scripts have loaded. We also import 'Clappr' types if available (optional).
declare global {
  interface Window {
    Clappr: any;
  }
}

// Interface for stream details
interface StreamDetails {
  title: string;
  description: string;
  league: string;
  playbackUrl: string; // The M3U8 URL
  posterUrl: string; // Poster image URL
  isLive: boolean; // Is the event live now?
  nextEpisodeDate?: string; // Date of the next event (optional)
}

// Function to get the event details (using the provided M3U8 link)
function getAewEventDetails(): StreamDetails {
  const today = new Date();
  
  // Set isLiveNow to true, assuming the stream is active based on your previous input.
  const isLiveNow = true;

  return {
    title: 'AEW All In 2025',
    description: 'La All Elite Wrestling se apodera de Dallas-Fort Worth esta semana previo al máximo evento AEW All In: Texas que se realizará en el Globe Life Field el sábado 12 de julio.',
    league: 'TV',
    // The M3U8 URL you provided
    playbackUrl: 'http://netlevel.online:8080/live/AURELIO933/AQBWS/588157.m3u8',
    posterUrl: 'https://imageio.forbes.com/specials-images/imageserve/68701f93b203da8077fed41c/AEW-All-in-Texas-at-Globe-Life-Field-in-Arlington-/960x0.jpg?format=jpg&width=960',
    isLive: isLiveNow,
    nextEpisodeDate: `Hoy, ${today.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
  };
}

// Define possible content types (video with Clappr, no content, loading)
type ContentType = 'clappr' | 'noContent' | 'loading';

export default function Evento2Page() {
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  // We'll store the Clappr instance here if needed
  const clapprPlayerRef = useRef<any>(null); 
  
  const [currentContent, setCurrentContent] = useState<ContentType>('loading');
  const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);

  // --- 1. Load Clappr and HLS plugin scripts dynamically ---
  useEffect(() => {
    // We only want to load the scripts once.
    if (isScriptsLoaded || typeof window === 'undefined') {
      return;
    }

    const loadScripts = () => {
      // Clappr Player
      const clapprScript = document.createElement('script');
      clapprScript.src = 'https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.min.js';
      clapprScript.async = true;
      document.body.appendChild(clapprScript);

      // Clappr HLS Playback Plugin (Required for M3U8)
      const hlsScript = document.createElement('script');
      hlsScript.src = 'https://cdn.jsdelivr.net/npm/@clappr/hlsjs-playback@latest/dist/hlsjs-playback.min.js';
      hlsScript.async = true;
      
      // We set the state only when the main Clappr script loads
      clapprScript.onload = () => {
        document.body.appendChild(hlsScript);
        hlsScript.onload = () => {
          setIsScriptsLoaded(true);
        };
      };
    };

    loadScripts();

    // Cleanup scripts if the component is unmounted prematurely (less common, but good practice)
    // return () => { ... }; 
  }, [isScriptsLoaded]);

  // --- 2. Load stream details ---
  useEffect(() => {
    const details = getAewEventDetails();
    setStreamDetails(details);

    if (details.playbackUrl) {
      setCurrentContent('clappr');
    } else {
      setCurrentContent('noContent');
    }
  }, []);

  // --- 3. Initialize Clappr Player ---
  useEffect(() => {
    // We only initialize if the content type is 'clappr', we have details, the scripts are loaded, and the player isn't already running.
    // NOTE: We check for streamDetails.playbackUrl and isScriptsLoaded, which ensures the player only attempts to load the stream when both are ready.
    if (currentContent !== 'clappr' || !streamDetails || !isScriptsLoaded || clapprPlayerRef.current || !window.Clappr) {
      // If the player exists but shouldn't be active, we destroy it.
      if (clapprPlayerRef.current) {
        clapprPlayerRef.current.destroy();
        clapprPlayerRef.current = null;
      }
      return;
    }

    // Initialize Clappr
    if (playerContainerRef.current && window.Clappr && window.Clappr.HlsjsPlayback) {
      // Ensure the container is empty before initializing
      while (playerContainerRef.current.firstChild) {
        playerContainerRef.current.removeChild(playerContainerRef.current.firstChild);
      }

      // Initialize the Clappr player instance
      const player = new window.Clappr.Player({
        source: streamDetails.playbackUrl,
        parentId: playerContainerRef.current, // Use the reference instead of a string ID
        autoPlay: true,
        height: '100%',
        width: '100%',
        poster: streamDetails.posterUrl,
        // Include the HLS playback plugin for M3U8 streams
        plugins: [window.Clappr.HlsjsPlayback] 
      });

      // Save the Clappr instance reference
      clapprPlayerRef.current = player;
    }

    // Cleanup function: Destroy the Clappr player when the component unmounts
    return () => {
      if (clapprPlayerRef.current) {
        clapprPlayerRef.current.destroy();
        clapprPlayerRef.current = null;
      }
    };
  }, [currentContent, streamDetails, isScriptsLoaded]);

  // --- Rendering logic ---

  // Show loading screen until stream details are available
  if (!streamDetails) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-400">Cargando detalles del evento...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-12 md:pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 text-center mb-8">
          {streamDetails.title}
        </h1>

        {/* Video Player Container */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-gray-800 flex items-center justify-center">
          
          {/* We display the player container if:
            1. We are in 'clappr' mode (meaning streamDetails.playbackUrl exists) 
            2. The Clappr scripts have loaded 
          */}
          {currentContent === 'clappr' && isScriptsLoaded ? (
            <>
              {/* "EN VIVO" indicator */}
              {streamDetails.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                  EN VIVO
                </div>
              )}
              
              {/* Clappr Player container. This is where Clappr will initialize. */}
              <div ref={playerContainerRef} className="w-full h-full"></div>
            </>
          ) : (
            // This fallback is displayed if scripts are still loading OR if playbackUrl is empty.
            <div className="text-gray-400 text-xl p-4 text-center">
              {/* Display a "loading" message if scripts aren't ready, otherwise, show the "No stream" message */}
              {!isScriptsLoaded ? 'Cargando reproductor...' : 'No hay stream disponible en este momento.'}
              
              {streamDetails.nextEpisodeDate && currentContent !== 'loading' && (
                <p className="mt-2 text-lg">Próxima Fecha: {streamDetails.nextEpisodeDate}</p>
              )}
            </div>
          )}
        </div>

        {/* Event Information */}
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
