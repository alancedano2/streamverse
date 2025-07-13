'use client';

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    src: string;
    poster: string;
    isLive: boolean;
}

// Remove the PROXY_WORKER constant

export default function VideoPlayer({ src, poster, isLive }: VideoPlayerProps) {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        // Only initialize if there is no player yet
        if (!playerRef.current) {
            // Create the video element and add it to the container
            const videoElement = document.createElement('video');
            videoElement.className = 'video-js vjs-default-skin';
            videoElement.autoplay = true;
            videoElement.controls = true;
            videoElement.muted = false;
            videoElement.preload = 'auto';

            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            // --- CORRECTION: Use the src directly, as it will now be the full URL ---
            const videoSrc = src;

            // Video.js options with HLS configuration
            const options = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                liveui: isLive,
                sources: [{
                    src: videoSrc,
                    type: 'application/x-mpegURL',
                }],
                poster: poster,
                techOrder: ['html5'],
                html5: {
                    hls: {
                        overrideNative: true,
                        debug: false,
                    },
                    nativeAudioTracks: false,
                    nativeVideoTracks: false,
                },
            };

            playerRef.current = videojs(videoElement, options, () => {
                console.log('Video.js player is ready');
            });
        } else {
            // If the player already exists, just update the source
            // --- CORRECTION: Use the src directly ---
            const videoSrc = src;
            playerRef.current.src({
                src: videoSrc,
                type: 'application/x-mpegURL',
            });
            playerRef.current.poster(poster);
            playerRef.current.liveui(isLive);
            playerRef.current.load();
        }

        // Cleanup
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
