import React from 'react';
import { usePlayer } from "./PlayerContext";

const TrackItem = ({ track }) => {
    const { handleTrackSelect, currentTrack, isPlaying } = usePlayer();


    return (
        <div className="track-item">
            <div className="track-cover">
                <img src={track?.coverFileUrl} alt="Cover" />
                <button
                    className={`play-button ${isPlaying && track === currentTrack ? 'playing' : ''}`}
                    onClick={() => handleTrackSelect(track) }
                >
                    {isPlaying && track === currentTrack ? '⏸' : '▶'}
                </button>
            </div>
            <div className="track-info">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
            </div>
        </div>
    );
};

export default TrackItem;