import React, { useState, useEffect } from "react";
import axios from "axios";

const DropdownGenres = ({ onGenreSelect }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        axios
            .get("https://localhost:7130/api/track/genres")
            .then((response) => setGenres(response.data))
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    const handleGenreChange = (event) => {
        const genre = event.target.value;
        setSelectedGenre(genre);
        onGenreSelect(genre);
    };

    return (
        <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                    {genre.name}
                </option>
            ))}
        </select>
    );
};

export default DropdownGenres;