const TrackItem = ({ track, onTrackSelect, isPlaying, currentTrack, handleIsPlaying }) => {

    const handlePlayPause = () => {
        onTrackSelect(track);
        handleIsPlaying(!isPlaying);
    };

    return (
        <div className="track-item">
            <div className="track-cover">
                <img src={track.coverUrl} alt="Обложка" />
                <button
                    className={`play-button ${isPlaying & track === currentTrack ? 'playing' : ''}`}
                    onClick={handlePlayPause}
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