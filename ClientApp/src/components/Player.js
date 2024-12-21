import React, { useRef, useEffect } from "react";

const Player = ({ currentTrack, onNextTrack, onPrevTrack, isPlaying, handleIsPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            console.log(currentTrack?.audioFileUrl);
            console.log(audioRef.current);
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    const togglePlayPause = () => {
        handleIsPlaying(!isPlaying);
    };

    return (
        <div className="player">
            <div className="player-info">
                <div className="player-title">{currentTrack?.title || 'Не выбрано'}</div>
                <div className="player-artist">{currentTrack?.artist || 'Не выбрано'}</div>
            </div>
            <audio ref={audioRef} src={`https://localhost:7130${currentTrack?.audioFileUrl}`} />
            <div className="player-controls">
                <button onClick={onPrevTrack}>⏮️</button>
                <button onClick={togglePlayPause}>{isPlaying ? '⏸' : '▶'}</button>
                <button onClick={onNextTrack}>⏭️</button>
            </div>
        </div>
    );
};

export default Player;