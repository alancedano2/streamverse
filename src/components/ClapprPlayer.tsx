// src/components/ClapprPlayer.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Clappr from '@clappr/player';

// You will need this if you are streaming HLS (m3u8)
// import HlsjsPlayback from '@clappr/hlsjs-playback'; 

interface ClapprPlayerProps {
    playbackUrl: string;
    posterUrl: string;
}

export default function ClapprPlayer({ playbackUrl, posterUrl }: ClapprPlayerProps) {
    const playerRef = useRef<HTMLDivElement>(null);
    const clapprInstance = useRef<any>(null);

    useEffect(() => {
        if (playerRef.current) {
            // Destroy existing instance if it exists
            if (clapprInstance.current) {
                clapprInstance.current.destroy();
                clapprInstance.current = null;
            }

            // Initialize Clappr player
            clapprInstance.current = new Clappr.Player({
                source: playbackUrl,
                poster: posterUrl,
                parentId: `#clappr-player`,
                autoPlay: true,
                mute: false,
                height: '100%',
                width: '100%',
                // plugins: [HlsjsPlayback], // Add HLS plugin if necessary
            });
        }

        // Cleanup on unmount
        return () => {
            if (clapprInstance.current) {
                clapprInstance.current.destroy();
                clapprInstance.current = null;
            }
        };
    }, [playbackUrl, posterUrl]);

    // We still render the player container even if we are dynamically importing it
    return <div id="clappr-player" ref={playerRef} className="w-full h-full"></div>;
}
