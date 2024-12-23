import React, { useRef, useEffect, useState } from "react";
import { usePlayer } from "./PlayerContext";

const Player = () => {
    const audioRef = useRef(null);
    const { currentTrack, isPlaying, handlePlayPause, handleNextTrack, handlePrevTrack } = usePlayer();
    const [currentTime, setCurrentTime] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                handlePlayPause();
            }
        };
        window.addEventListener("keydown", handleSpacebar);
        return () => window.removeEventListener("keydown", handleSpacebar);
    }, [handlePlayPause]);

    const updateCurrentTime = () => {
            setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {        
            setTrackDuration(audioRef.current.duration);
    };

    const handleTimeChange = (e) => {
        audioRef.current.currentTime = e.target.value;
    };

    const handleVolumeChange = (e) => {
        if (audioRef.current) {
            audioRef.current.volume = e.target.value;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="player">
            <div className="player-info">
                <img src={`https://localhost:7130${currentTrack?.coverFileUrl}`} />
                <div className="player-title">{currentTrack?.title || "Не выбрано"}</div>
                <div className="player-artist">{currentTrack?.artist || "Не выбрано"}</div>
            </div>
            <audio
                ref={audioRef}
                src={`https://localhost:7130${currentTrack?.audioFileUrl}`}
                onTimeUpdate={updateCurrentTime}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="player-controls">
                <button onClick={handlePrevTrack}>⏮️</button>
                <button onClick={handlePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
                <button onClick={handleNextTrack}>⏭️</button>
            </div>
            <div className="player-volume">
                <label>Volume:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={handleVolumeChange}
                />
            </div>
            <div className="player-seek">
                <label>Seek:</label> 
                <input
                    type="range"
                    min="0"
                    max={trackDuration}
                    step="1"
                    value={currentTime}
                    onChange={handleTimeChange}
                />
                <span>{formatTime(currentTime)} / {formatTime(trackDuration)}</span>
            </div>
        </div>
    );
};

export default Player;