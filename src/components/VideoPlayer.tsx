'use client';

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
// Import the Video.js CSS
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

            // Video.js options for robust HLS playback
            const options = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                // Add explicit sources for HLS playback
                sources: [{
                    src: src,
                    // Use 'application/x-mpegURL' or 'application/vnd.apple.mpegurl' for HLS
                    type: 'application/x-mpegURL', 
                }],
                poster: poster,
                liveui: isLive,
                // Configuration specific to Video.js's HTML5 HLS implementation (VHS)
                html5: {
                    hls: {
                        // Ensure CORS is handled when fetching the stream
                        crossOrigin: 'anonymous',
                        // Force Video.js to use its internal HLS engine
                        overrideNative: true,
                        // Set specific timeouts and retries for unreliable streams
                        bandwidth: 511023, // Example bandwidth setting for ABR
                        maxBufferLength: 60, // Maximum buffer length in seconds
                        maxRetryAttempts: 5 // Maximum retry attempts for failed segments (if supported by VHS)
                    }
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
        // The div where the player attaches itself
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}
