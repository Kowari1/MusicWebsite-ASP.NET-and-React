import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [queue, setQueue] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const savedPlayerState = localStorage.getItem("playerState");
        if (savedPlayerState) {
            const { track, isPlaying, currentTime } = JSON.parse(savedPlayerState);
            setCurrentTrack(track);
            setIsPlaying(isPlaying);
            audioRef.current.currentTime = currentTime;
        }
    }, []);

    useEffect(() => {
        const playerState = {
            track: currentTrack,
            isPlaying,
            currentTime: audioRef.current?.currentTime || 0,
        };
        localStorage.setItem("playerState", JSON.stringify(playerState));
    }, [currentTrack, isPlaying]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    const playTrack = (track) => {
        if (currentTrack !== track) {
            setCurrentTrack(track);
            audioRef.current.src = track.url;
            audioRef.current.play();
        }
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        const currentIndex = queue.findIndex((track) => track === currentTrack);
        const nextTrack = queue[(currentIndex + 1) % queue.length];
        playTrack(nextTrack);
    };

    const playPrev = () => {
        const currentIndex = queue.findIndex((track) => track === currentTrack);
        const prevTrack = queue[(currentIndex - 1 + queue.length) % queue.length];
        playTrack(prevTrack);
    };

    const updateQueue = (tracks) => {
        setQueue(tracks);
    };

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                queue,
                isPlaying,
                playTrack,
                togglePlay,
                updateQueue,
                currentTime,
                playNext,
                playPrev,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);