// src/components/ClapprPlayer.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Clappr from '@clappr/player';
import HlsjsPlayback from '@clappr/hlsjs-playback';

interface ClapprPlayerProps {
    playbackUrl: string;
    posterUrl: string;
}

export default function ClapprPlayer({ playbackUrl, posterUrl }: ClapprPlayerProps) {
    const playerRef = useRef<HTMLDivElement>(null);
    const clapprInstance = useRef<any>(null);

    useEffect(() => {
        if (playerRef.current) {
            // Ensure any previous instance is destroyed
            if (clapprInstance.current) {
                clapprInstance.current.destroy();
                clapprInstance.current = null;
            }

            // Initialize Clappr player and include the HLS plugin
            clapprInstance.current = new Clappr.Player({
                source: playbackUrl,
                poster: posterUrl,
                parentId: `#clappr-player`,
                autoPlay: true,
                mute: false,
                height: '100%',
                width: '100%',
                // Important: Add the HLSjsPlayback plugin
                plugins: [HlsjsPlayback], 
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

    // We render the player container with a specific ID
    return <div id="clappr-player" ref={playerRef} className="w-full h-full"></div>;
}
