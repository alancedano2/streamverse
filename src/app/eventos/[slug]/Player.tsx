// src/app/eventos/[slug]/Player.tsx
'use client'; // ¡IMPORTANTE! Debe ser la primera línea.

import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  options: {
    autoplay?: boolean;
    controls?: boolean;
    responsive?: boolean;
    fluid?: boolean;
    sources: {
      src: string;
      type: string;
    }[];
    poster?: string;
  };
  onReady?: (player: Player) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);

        const player = (playerRef.current = videojs(videoElement, options, () => {
          videojs.log('Player is ready!');
          if (onReady) {
            onReady(player);
          }
        }));
      }
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay || false);
      if (options.sources && options.sources.length > 0 && player.src() !== options.sources[0]?.src) {
        player.src(options.sources);
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} className="w-full h-auto aspect-video"></div>
    </div>
  );
};

export default VideoPlayer;