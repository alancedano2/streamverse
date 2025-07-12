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
            videoElement.autoplay = true;
            videoElement.controls = true;
            videoElement.muted = false;
            videoElement.preload = 'auto';

            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            const options = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                liveui: isLive,
                sources: [{
                    src: src,
                    type: 'application/x-mpegURL',
                }],
                poster: poster,
                html5: {
                    hls: {
                        crossOrigin: 'anonymous',
                        overrideNative: true,
                        // === Added/Adjusted configuration for delayed streams ===
                        // A custom XHR setup to increase timeout tolerance if needed (optional)
                        xhr: {
                            timeout: 5000 // 5 seconds timeout for fetching (default is often 0 or low)
                        },
                        // Increase the retry attempts for segment loads
                        maxRetryAttempts: 10, 
                        // Set a low segment loader timeout to quickly detect issues, but rely on high retry attempts
                        loader: {
                            retryTimeout: 1000 // Retry segments faster
                        }
                    }
                }
            };

            playerRef.current = videojs(videoElement, options, () => {
                console.log('Video.js player is ready');
            });
        }
        
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
