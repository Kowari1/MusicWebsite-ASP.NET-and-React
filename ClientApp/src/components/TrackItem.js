import React, { useState } from 'react';
import './TrackItem.css';

const TrackItem = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="track-item">
            <div className="track-cover">
                <img src={track.coverUrl} alt="Обложка" />
                <button
                    className={`play-button ${isPlaying ? 'playing' : ''}`}
                    onClick={handlePlayPause}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
            </div>

            <div className="track-info">
                <h3>{track.title}</h3>
                <p>{track.artist}</p>
                <span>{track.duration}</span>
            </div>

            <div className="track-actions">
                <button>Добавить в плейлист</button>
                <button>Добавить в очередь</button>
            </div>
        </div>
    );
};

export default TrackItem;