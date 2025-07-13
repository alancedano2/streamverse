import React, { useRef, useEffect, useState } from 'react';

// REMOVE THE video.js imports:
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// ADD CLAPPR imports:
import { Player } from '@clappr/player';
import HlsjsPlayback from '@clappr/hlsjs-playback';

export const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const { options } = props;

  useEffect(() => {
    // We check if the videoRef exists and if there are sources defined.
    if (videoRef.current && options.sources && options.sources.length > 0) {
      
      // Initialize Clappr Player
      const clapprOptions = {
        source: options.sources[0].src,
        parentId: videoRef.current, // Clappr attaches to the parentId element
        width: '100%',
        height: '100%',
        plugins: [
          HlsjsPlayback
        ],
        // You can add more Clappr options here (e.g., autoPlay, controls, etc.)
      };

      const player = new Player(clapprOptions);
      playerRef.current = player;
      
      // Clean up Clappr instance when the component unmounts
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      };
    }
  }, [options]);

  return (
    <div data-vjs-player>
      {/* The div below serves as the container for Clappr. 
        Clappr will insert its video elements and controls here. 
      */}
      <div ref={videoRef} />
    </div>
  );
};

// Define VideoPlayerProps interface (assuming it's defined elsewhere or needs to be added)
interface VideoPlayerProps {
  options: {
    sources: Array<{ src: string; type: string }>;
    // Add other relevant options if needed
  };
}

export default VideoPlayer;
