'use client';

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    src: string;
    poster: string;
    isLive: boolean;
}

const PROXY_WORKER = 'https://mediaiptvproxy.fraelvillegasplay8.workers.dev/?url=';

export default function VideoPlayer({ src, poster, isLive }: VideoPlayerProps) {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        // Solo inicializa si no hay player ya
        if (!playerRef.current) {
            // Crea el elemento video y lo añade al contenedor
            const videoElement = document.createElement('video');
            videoElement.className = 'video-js vjs-default-skin';
            videoElement.autoplay = true;
            videoElement.controls = true;
            videoElement.muted = false;
            videoElement.preload = 'auto';

            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            // Construye la URL con proxy
            const proxiedSrc = PROXY_WORKER + encodeURIComponent(src);

            // Opciones Video.js con configuración para HLS
            const options = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                liveui: isLive,
                sources: [{
                    src: proxiedSrc,
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
            // Si ya existe player, solo actualiza la fuente
            const proxiedSrc = PROXY_WORKER + encodeURIComponent(src);
            playerRef.current.src({
                src: proxiedSrc,
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
