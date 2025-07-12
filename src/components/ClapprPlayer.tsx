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
            // Ensure Clappr instance is ready and destroyed on unmount
            if (clapprInstance.current) {
                clapprInstance.current.destroy();
                clapprInstance.current = null;
            }

            // Initialize Clappr player with HLS playback plugin and cross-origin settings
            clapprInstance.current = new Clappr.Player({
                source: playbackUrl,
                poster: posterUrl,
                parentId: `#clappr-player`,
                autoPlay: true,
                mute: false,
                height: '100%',
                width: '100%',
                
                // Set crossOrigin to anonymous for CORS handling with the proxy
                crossOrigin: "anonymous", 
                
                // Include the HLS playback plugin
                plugins: [HlsjsPlayback],

                // Optimized HLS.js configuration (if HlsjsPlayback is sensitive to stream data)
                hlsjsConfig: {
                    // Disable credentials for XHR requests if the proxy doesn't require them
                    xhrSetup: function (xhr, url) {
                        xhr.withCredentials = false;
                    },
                    // Helps with performance and compatibility
                    enableWorker: true,
                    // If the stream is low latency or has synchronization issues
                    lowLatencyMode: false,
                    // Adjust buffer sizes for potentially problematic streams
                    maxBufferLength: 30,
                    maxMaxBufferLength: 60,
                },
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

    return <div id="clappr-player" ref={playerRef} className="w-full h-full"></div>;
}
