import React, { useState, useCallback, useEffect } from 'react';
import Player from "./Player";
import axios from "axios";
import DropdownGenres from "./DropdownGenres";
import TrackItem from "./TrackItem";
import './TrackList.css';
import './Player.css';

const FetchData = () => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const fetchTracks = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7130/api/track', {
                params: { genre: selectedGenre, searchTerm: searchTerm }
            });
            setTracks(response.data.tracks || []);
        } catch (error) {
            console.error('Ошибка загрузки треков:', error);
        }
    }, [selectedGenre, searchTerm]);

    useEffect(() => {
        fetchTracks();
    }, [fetchTracks]);

    const handleTrackSelect = (track) => {
        if (track !== currentTrack) {
            setCurrentTrack(track);
            setIsPlaying(true);
        }        
    };

    const handleIsPlaying = (bool) => {
        setIsPlaying(bool);
    }

    const handleNextTrack = () => {
        if (checkTracks()) { }
        else {
            const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
            if (currentIndex < tracks.length - 1) {
                setCurrentTrack(tracks[currentIndex + 1]);
            }
        }
    };

    const handlePrevTrack = () => {
        if (checkTracks()) { }
        else {
            const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
            if (currentIndex > 0) {
                setCurrentTrack(tracks[currentIndex - 1]);
            }
        }
    };

    function checkTracks() {
        if (currentTrack === null && tracks !== null) {
            handleTrackSelect(tracks[0]);
            return true;
        }
        else return false;
    }

    return (
        <div className="app">
            <div className="filters">
                <DropdownGenres onGenreSelect={setSelectedGenre} />
                <input
                    type="text"
                    placeholder="Поиск по трекам"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="track-list">
                {tracks.map((track) => (
                    <TrackItem key={track.id}
                        track={track}
                        onTrackSelect={handleTrackSelect}
                        isPlaying={isPlaying}
                        currentTrack={currentTrack}
                        handleIsPlaying={handleIsPlaying}
                    />
                ))}
            </div>
            <Player
                currentTrack={currentTrack}
                onNextTrack={handleNextTrack}
                onPrevTrack={handlePrevTrack}
                isPlaying={isPlaying}
                handleIsPlaying={handleIsPlaying}
            />
        </div>
    );
};

export default FetchData;
