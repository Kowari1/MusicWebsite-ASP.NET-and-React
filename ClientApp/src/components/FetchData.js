import React, { useEffect, useState } from 'react';
import { usePlayer } from "./PlayerContext";
import axios from "./axiosSetup";
import DropdownGenres from "./DropdownGenres";
import TrackItem from "./TrackItem";
import Player from "./Player";
import './TrackList.css';
import './Player.css';


const FetchData = () => {
    const { setTracks, tracks, handleTrackSelect } = usePlayer();
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get('/api/track', {
                    params: { genre: selectedGenre, searchTerm },
                });
                setTracks(response.data.tracks || []);
            } catch (error) {
                console.error('Ошибка загрузки треков:', error);
            }
        };
        fetchTracks();
    }, [selectedGenre, searchTerm, setTracks]);

    return (
        <div className="app">
            <div className="filters">
                <DropdownGenres onGenreSelect={setSelectedGenre} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="track-list">
                {tracks.map((track) => (
                    <TrackItem key={track.id} track={track} onTrackSelect={handleTrackSelect} />
                ))}
            </div>
            <Player />
        </div>
    );
};

export default FetchData;