import React, { useRef, useEffect } from 'react';

// video.js imports
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Clappr imports
import { Player as ClapprPlayer } from '@clappr/player';
import HlsjsPlayback from '@clappr/hlsjs-playback';

// Assuming VideoPlayerProps is defined elsewhere or included below
interface VideoPlayerProps {
    options: any; // Define your video options structure here
}

export const VideoPlayer = (props: VideoPlayerProps) => {
    // Refs for both players or the container elements
    const videoJsRef = useRef(null);
    const clapprRef = useRef(null);
    const { options } = props;

    // useEffect for Video.js initialization
    useEffect(() => {
        const videoElement = videoJsRef.current;

        if (videoElement) {
            // Video.js initialization logic
            const player = videojs(videoElement, options);
            
            // Clean up Video.js instance
            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [options]);

    // useEffect for Clappr initialization
    useEffect(() => {
        const clapprContainer = clapprRef.current;

        if (clapprContainer && options.sources && options.sources.length > 0) {
            // Clappr initialization logic
            const clapprOptions = {
                source: options.sources[0].src,
                parentId: clapprContainer,
                width: '100%',
                height: '100%',
                plugins: [
                    HlsjsPlayback,
                ],
                // Additional Clappr options here
            };

            const clapprInstance = new ClapprPlayer(clapprOptions);

            // Clean up Clappr instance
            return () => {
                if (clapprInstance) {
                    clapprInstance.destroy();
                }
            };
        }
    }, [options]);

    return (
        <div>
            {/* This container is for Video.js (or you can use it for Clappr if you modify the refs above)
            */}
            <div data-vjs-player>
                <video ref={videoJsRef} className="video-js vjs-default-skin" />
            </div>

            {/* This container is for Clappr. 
              You can control which player is visible in your application logic.
            */}
            <div ref={clapprRef} style={{ display: 'none' }} /> 
        </div>
    );
};

export default VideoPlayer;
