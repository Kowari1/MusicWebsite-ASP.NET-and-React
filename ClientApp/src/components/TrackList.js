import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackItem from "./TrackItem";
import Pagination from "./Pagination";
import DropdownGenres from "./DropdownGenres";
import { useCallback } from "react";

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState(null);

    const fetchTracks = useCallback(() => {
        axios
            .get("https://localhost:7130/api/track", {
                params: { genre, page: currentPage, pageSize: 10 },
            })
            .then((response) => {
                const tracksData = response.data?.tracks;
                    setTracks(tracksData);
                    setTotalPages(Math.ceil(response.data.TotalCount / 10));              
            })
            .catch((error) => console.error("Error fetching tracks:", error));
    }, [genre, currentPage]);
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