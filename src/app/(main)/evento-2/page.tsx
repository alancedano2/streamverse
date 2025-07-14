'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Interface and getF1RaceDetails function remain the same
interface StreamDetails {
    title: string;
    description: string;
    league: string;
    playbackUrl: string;
    posterUrl: string;
    isLive: boolean;
    nextEpisodeDate?: string;
}

function getF1RaceDetails(): StreamDetails {
    const today = new Date();
    const isLiveNow = true;

    return {
        title: 'WWE Evolution',
        description: 'Prepárate para la historia. WWE Evolution está de vuelta, el evento que celebra exclusivamente a las superestrellas femeninas. Después de siete años, este evento icónico regresa para redefinir la lucha libre.',
        league: 'WWE PLE',
        // Using the HTTPS proxy URL
        playbackUrl: 'https://bacterial-drug-personals-soon.trycloudflare.com/proxy?url=http://tvlatino.club:2082/live/991943952/e2zQtWgRZ5D4/559675.m3u8',
        posterUrl: 'https://tvazteca.brightspotcdn.com/75/ce/b41197bd46a3867b09f504e0ddf7/wwe-evolution-2025.jpg',
        isLive: isLiveNow,
        nextEpisodeDate: `Hoy, ${today.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}`,
    };
}

// Dynamically import the VideoPlayer component, disabling SSR
// Update the import path if your VideoPlayer.tsx is in a different location
const DynamicVideoPlayer = dynamic(() => import('../../../components/VideoPlayer'), {
    ssr: false,
});


export default function Evento2Page() {
    const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);

    useEffect(() => {
        setStreamDetails(getF1RaceDetails());
    }, []);

    if (!streamDetails) {
        return (
            <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex justify-center items-center">
                <p className="text-xl text-gray-400">Cargando detalles del evento...</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-950 text-white">
            <div className="relative z-10 container mx-auto px-4 py-8 pt-12 md:pt-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 text-center mb-8">
                    {streamDetails.title}
                </h1>

                <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border border-gray-700 relative aspect-video bg-black">
                    {streamDetails.isLive && (
                        <div className="absolute top-4 left-4 bg-orange-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                            EN VIVO
                        </div>
                    )}
                    {/* Use the dynamically imported VideoPlayer */}
                    {streamDetails.playbackUrl && streamDetails.posterUrl && (
                        <DynamicVideoPlayer
                            src={streamDetails.playbackUrl}
                            poster={streamDetails.posterUrl}
                            isLive={streamDetails.isLive}
                        />
                    )}
                </div>

                <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-3">Detalles del Evento</h2>
                    <p className="text-gray-300 text-lg mb-4">{streamDetails.description}</p>
                    <p className="text-gray-400 text-sm">
                        Liga: <span className="font-semibold text-white">{streamDetails.league}</span>
                    </p>
                    {streamDetails.nextEpisodeDate && (
                        <p className="text-gray-400 text-sm mt-1">
                            Fecha del evento: <span className="font-semibold text-white">{streamDetails.nextEpisodeDate}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
