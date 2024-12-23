import React, { createContext, useState, useContext, useCallback } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tracks, setTracks] = useState([]);

    const handleTrackSelect = useCallback((track) => { 
        if (track === currentTrack && isPlaying === true) {
            handlePlayPause();
        }
        else {          
            setCurrentTrack(track);  
            setIsPlaying(true);
        }     
    }, [currentTrack, tracks, isPlaying]);

    const handlePlayPause = useCallback(() => {
        setIsPlaying(!isPlaying);
    }, [currentTrack, isPlaying]);

    const handleNextTrack = useCallback(() => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
        if (currentIndex < tracks.length - 1) {
            handleTrackSelect(tracks[currentIndex + 1]);
        }
    }, [currentTrack, tracks]);

    const handlePrevTrack = useCallback(() => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
        if (currentIndex > 0) {
            handleTrackSelect(tracks[currentIndex - 1]);
        }
    }, [currentTrack, tracks]);

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                tracks,
                setTracks,
                handleTrackSelect,
                handlePlayPause,
                handleNextTrack,
                handlePrevTrack,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);