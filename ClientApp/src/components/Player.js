import React, { useRef, useEffect, useState } from "react";
import { usePlayer } from "./PlayerContext";

const Player = () => {
    const audioRef = useRef(null);
    const { currentTrack, isPlaying, handlePlayPause, handleNextTrack, handlePrevTrack, tracks, handleTrackSelect } = usePlayer();
    const [currentTime, setCurrentTime] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0);
    const [isLoop, setIsLoop] = useState(false);
    const [isRandom, setIsRandom] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            audioRef.current.loop = isLoop;
            audioRef.current.random = isRandom;
        }
    }, [isPlaying, currentTrack, isLoop, isRandom]);

    useEffect(() => {
        const handleSpacebar = (e) => {
            const isInputFocused =
                e.target.tagName === "INPUT" ||
                e.target.tagName === "TEXTAREA" ||
                e.target.isContentEditable;

            if (!isInputFocused && e.code === "Space" && currentTrack !== null) {
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

    const handleTrackEnd = () => {
        if (isRandom) {
            let nextTrack;
            do {
                nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
            } while (nextTrack === currentTrack);
            handleTrackSelect(nextTrack);
        } else if (isLoop) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            handleNextTrack();
        }
    };

    const handleToggleMode = (mode) => {
        if (mode === "random") {
            setIsRandom((prev) => !prev);
            if (isLoop) setIsLoop(false);
        } else if (mode === "loop") {
            setIsLoop((prev) => !prev);
            if (isRandom) setIsRandom(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="player">
    <div className="player-seek">
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
    <audio
                ref={audioRef}
                src={`https://localhost:7130${currentTrack?.audioFileUrl}`}
                onTimeUpdate={updateCurrentTime}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleTrackEnd}
            />
    <div className="player-content">
        <div className="player-info">
            <img src={currentTrack?.coverFileUrl} alt="Обложка трека" />
            <div>
                <div className="player-title">{currentTrack?.title || "Не выбрано"}</div>
                <div className="player-artist">{currentTrack?.artist || "Не выбрано"}</div>
            </div>
        </div>
         <div className="player-controls">
             <button
                    onClick={() => handleToggleMode("random")}
                    style={{ color: isRandom ? "green" : "black" }}
             >
                 🎲
            </button>
            <button onClick={handlePrevTrack}>⏮️</button>
            <button className="play-btn" onClick={handlePlayPause}>{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={handleNextTrack}>⏭️</button>
            <button
                        onClick={() => handleToggleMode("loop")}
                style={{ color: isLoop ? "green" : "black" }}
            >
                🔁
            </button>
        </div>
        <div className="player-volume">
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={handleVolumeChange}
            />
        </div>
    </div>
</div>

        
    );
};

export default Player;