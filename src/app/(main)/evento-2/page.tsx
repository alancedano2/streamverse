import React, { useRef, useEffect } from 'react';

// video.js imports
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Clappr imports
import { Player as ClapprPlayer } from '@clappr/player';
import HlsjsPlayback from '@clappr/hlsjs-playback';

// Updated VideoPlayerProps interface
interface VideoPlayerProps {
    src: string;
    poster: string;
    isLive: boolean;
    // Keep options for video.js if needed, but the main props are now src, poster, and isLive
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
            { src: src, type: 'application/x-mpegURL' } // Assuming HLS stream based on previous analysis
        ],
        poster: poster,
        autoplay: isLive,
        controls: true,
        // Merge with any optional options passed
        ...options
    };

    // useEffect for Video.js initialization
    useEffect(() => {
        const videoElement = videoJsRef.current;

        if (videoElement) {
            // Video.js initialization logic using the combined options
            const player = videojs(videoElement, playerOptions);
            
            // Clean up Video.js instance
            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [src, options]); // Dependencies updated to include src and options

    // useEffect for Clappr initialization
    useEffect(() => {
        const clapprContainer = clapprRef.current;

        if (clapprContainer && playerOptions.sources.length > 0) {
            // Clappr initialization logic
            const clapprOptions = {
                source: playerOptions.sources[0].src,
                parentId: clapprContainer,
                width: '100%',
                height: '100%',
                plugins: [
                    HlsjsPlayback,
                ],
                // Add any other Clappr options here
            };

            const clapprInstance = new ClapprPlayer(clapprOptions);

            // Clean up Clappr instance
            return () => {
                if (clapprInstance) {
                    clapprInstance.destroy();
                }
            };
        }
    }, [src, options]); // Dependencies updated to include src and options

    return (
        <div>
            {/* You can render both player containers here. 
            You might want to implement logic to conditionally render or hide 
            one based on your application's requirements.
            */}
            
            {/* Video.js container */}
            <div data-vjs-player>
                <video ref={videoJsRef} className="video-js vjs-default-skin" />
            </div>

            {/* Clappr container (hidden by default in this example) */}
            <div ref={clapprRef} style={{ display: 'none' }} /> 
        </div>
    );
};

export default VideoPlayer;
