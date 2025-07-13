import React, { useRef, useEffect } from 'react';

// video.js imports
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Clappr imports
import { Player as ClapprPlayer } from '@clappr/player';
import HlsjsPlayback from '@clappr/hlsjs-playback';

const CLAPPR_CONTAINER_ID = 'clappr-player-container';

interface VideoPlayerProps {
    src: string;
    poster: string;
    isLive: boolean;
    options?: any;
    playerType: 'videojs' | 'clappr'; 
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    const videoJsRef = useRef<HTMLVideoElement>(null);
    const clapprRef = useRef<HTMLDivElement>(null);
    const { src, poster, isLive, options, playerType } = props;

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

        if (playerType === 'videojs' && videoElement) {
            const player = videojs(videoElement, playerOptions);
            
            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [playerType, src, options]);

    // useEffect for Clappr initialization
    useEffect(() => {
        const clapprContainer = clapprRef.current;

        if (playerType === 'clappr' && clapprContainer && playerOptions.sources.length > 0) {
            // Note: We initialize Clappr using the container ID
            const clapprOptions = {
                source: playerOptions.sources[0].src,
                parentId: `#${CLAPPR_CONTAINER_ID}`, 
                width: '100%',
                height: '100%',
                plugins: [
                    HlsjsPlayback,
                ],
            };

            const clapprInstance = new ClapprPlayer(clapprOptions);

            return () => {
                if (clapprInstance) {
                    clapprInstance.destroy();
                }
            };
        }
    }, [playerType, src, options]); 

    return (
        <div>
            {/* Conditionally render the Video.js player container */}
            {playerType === 'videojs' && (
                <div data-vjs-player>
                    <video 
                        ref={videoJsRef} 
                        className="video-js vjs-default-skin" 
                    />
                </div>
            )}

            {/* Conditionally render the Clappr player container */}
            {playerType === 'clappr' && (
                <div 
                    id={CLAPPR_CONTAINER_ID} 
                    ref={clapprRef} 
                /> 
            )}
        </div>
    );
};

export default VideoPlayer;
