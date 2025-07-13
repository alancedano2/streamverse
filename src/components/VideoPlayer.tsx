import React, { useRef, useEffect } from 'react';

// video.js imports
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Clappr imports
import { Player as ClapprPlayer } from '@clappr/player';
import HlsjsPlayback from '@clappr/hlsjs-playback';

// Define a unique ID for the Clappr container
const CLAPPR_CONTAINER_ID = 'clappr-player-container';

// Updated VideoPlayerProps interface
interface VideoPlayerProps {
    src: string;
    poster: string;
    isLive: boolean;
    options?: any; 
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    // Refs for video.js container and Clappr container
    const videoJsRef = useRef<HTMLVideoElement>(null);
    const clapprRef = useRef<HTMLDivElement>(null);
    const { src, poster, isLive, options } = props;

    // Configuration for both players based on input props
    const playerOptions = {
        sources: [
            { src: src, type: 'application/x-mpegURL' } 
        ],
        poster: poster,
        autoplay: isLive,
        controls: true,
        ...options
    };

    // useEffect for Video.js initialization
    useEffect(() => {
        const videoElement = videoJsRef.current;

        if (videoElement) {
            // Video.js initialization logic
            const player = videojs(videoElement, playerOptions);
            
            // Clean up Video.js instance
            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [src, options]); 

    // useEffect for Clappr initialization
    useEffect(() => {
        const clapprContainer = clapprRef.current;

        // Note: We are checking for clapprContainer, but initializing Clappr using the ID string below.
        if (clapprContainer && playerOptions.sources.length > 0) {
            // Clappr initialization logic using the container ID
            const clapprOptions = {
                source: playerOptions.sources[0].src,
                // Pass the ID string instead of the DOM element object to avoid the querySelector error
                parentId: `#${CLAPPR_CONTAINER_ID}`, 
                width: '100%',
                height: '100%',
                plugins: [
                    HlsjsPlayback,
                ],
            };

            const clapprInstance = new ClapprPlayer(clapprOptions);

            // Clean up Clappr instance
            return () => {
                if (clapprInstance) {
                    clapprInstance.destroy();
                }
            };
        }
    }, [src, options]); 

    return (
        <div>
            {/* Video.js container */}
            <div data-vjs-player>
                <video ref={videoJsRef} className="video-js vjs-default-skin" />
            </div>

            {/* Clappr container. We assign the unique ID here. */}
            <div id={CLAPPR_CONTAINER_ID} ref={clapprRef} style={{ display: 'none' }} /> 
        </div>
    );
};

export default VideoPlayer;
