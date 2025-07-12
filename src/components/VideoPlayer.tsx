'use client';

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    src: string;
    poster: string;
    isLive: boolean;
}

export default function VideoPlayer({ src, poster, isLive }: VideoPlayerProps) {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        // Only initialize the player if it hasn't been initialized yet
        if (!playerRef.current) {
            
            // Create the video element and append it to the ref container
            const videoElement = document.createElement('video');
            videoElement.className = 'video-js vjs-default-skin';
            videoElement.autoplay = true;
            videoElement.controls = true;
            videoElement.muted = false;
            videoElement.preload = 'auto';

            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            // Video.js options with basic HLS source configuration
            const options = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                liveui: isLive,
                sources: [{
                    src: src,
                    // Use 'application/x-mpegURL' for HLS streams
                    type: 'application/x-mpegURL', 
                }],
                poster: poster,
                // Removed specific HLS configuration (hlsConfig, crossOrigin, etc.)
            };

            // Initialize the Video.js player
            playerRef.current = videojs(videoElement, options, () => {
                console.log('Video.js player is ready');
            });
        }
        
        // Cleanup function: destroy the player when the component unmounts
        return () => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [src, poster, isLive]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}
