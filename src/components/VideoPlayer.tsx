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
        if (!playerRef.current) {
            const videoElement = document.createElement('video');
            videoElement.className = 'video-js vjs-default-skin';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.aspectRatio = '16 / 9';
            videoElement.autoplay = true;
            videoElement.controls = true;
            videoElement.muted = false;
            videoElement.preload = 'auto';

            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            // Video.js options for HLS streams
            const options = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                liveui: isLive,
                sources: [{
                    src: src,
                    type: 'application/x-mpegURL', // M3U8 type for HLS
                }],
                poster: poster,
                html5: {
                    hls: {
                        // Configuration for HLS.js if needed (Video.js often uses it internally)
                        overrideNative: true
                    },
                    // Ensure CORS is handled
                    crossOrigin: 'anonymous'
                }
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
            {/* The ref where the video element will be appended by Video.js */}
            <div ref={videoRef} />
        </div>
    );
}
