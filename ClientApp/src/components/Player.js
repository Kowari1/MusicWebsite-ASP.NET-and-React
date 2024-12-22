import React, { useRef, useEffect, useState } from "react";

const Player = ({ currentTrack, onNextTrack, onPrevTrack, isPlaying, handleIsPlaying }) => {
    const audioRef = useRef(null);
    const [trackDuration, setTrackDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    const togglePlayPause = () => {
        handleIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value;
    };

    const handleTimeChange = (e) => {
        audioRef.current.currentTime = e.target.value;
    };

    const updateCurrentTime = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setTrackDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="player">
            <div className="player-info">
                <div className="player-title">{currentTrack?.title || 'Не выбрано'}</div>
                <div className="player-artist">{currentTrack?.artist || 'Не выбрано'}</div>
            </div>
            <audio
                ref={audioRef}
                src={`https://localhost:7130${currentTrack?.audioFileUrl}`}
                onTimeUpdate={updateCurrentTime}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="player-controls">
                <button onClick={onPrevTrack}>⏮️</button>
                <button onClick={togglePlayPause}>{isPlaying ? '⏸' : '▶'}</button>
                <button onClick={onNextTrack}>⏭️</button>
            </div>
            <div className="player-volume">
                <label>Volum:</label>
                <input type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} />
            </div>
            <div className="player-seek">
                <label>Rewind:</label>
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