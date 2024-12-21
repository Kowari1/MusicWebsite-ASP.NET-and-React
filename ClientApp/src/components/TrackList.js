import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TrackItem from "./TrackItem";
import Pagination from "./Pagination";
import DropdownGenres from "./DropdownGenres";
import './TrackList.css';

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState(null);

    const calculatePageSize = useCallback(() => {
        const trackWidth = 250;
        const trackHeight = 320;
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight - 200;

        const cols = Math.floor(containerWidth / trackWidth) || 1;
        const rows = Math.floor(containerHeight / trackHeight) || 1;

        return cols * rows;
    }, []);

    const fetchTracks = useCallback(async () => {
        try {
            const pageSize = calculatePageSize();
            const response = await axios.get("https://localhost:7130/api/track", {
                params: { genre, page: currentPage, pageSize }
            });

            const { tracks: fetchedTracks, totalCount } = response.data;
            setTracks(fetchedTracks || []);
            setTotalPages(Math.ceil(totalCount / pageSize));
        } catch (error) {
            console.error("Ошибка загрузки треков:", error);
        }
    }, [genre, currentPage, calculatePageSize]);

    useEffect(() => {
        fetchTracks();
    }, [fetchTracks]);

    return (
        <div>
            <DropdownGenres onGenreSelect={setGenre} />
            <div className="track-list">
                {tracks.map((track) => (
                    <TrackItem key={track.id} track={track} />
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default TrackList;