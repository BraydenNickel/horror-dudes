import React, { useState, useEffect } from 'react';
import {
    fetchHorrorAndThrillerMovies,
    searchMovies,
} from '../queries/fetchHorror'; // TMDB Queries
import {
    filterMoviesByYear,
    filterMoviesByRating,
    filterMoviesByName,
} from '../utils/movieFilters'; // Filters

const HorrorMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await fetchHorrorAndThrillerMovies();
                setMovies(movies);
                setFilteredMovies(movies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = async () => {
        if (searchQuery) {
            try {
                const searchResults = await searchMovies(searchQuery);
                setFilteredMovies(searchResults);
            } catch (error) {
                console.error('Error searching for movies:', error);
            }
        }
    };

    const handleFilter = () => {
        let filtered = movies;

        if (year) {
            filtered = filterMoviesByYear(filtered, parseInt(year, 10));
        }

        if (rating) {
            filtered = filterMoviesByRating(filtered, parseFloat(rating));
        }

        setFilteredMovies(filtered);
    };

    return (
        <div>
            <h1>Horror & Thriller Movies</h1>

            {/* Filters */}
            <div>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>

                <input
                    type="number"
                    placeholder="Year (e.g. 2023)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating (e.g. 7.5)"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button onClick={handleFilter}>Filter</button>
            </div>

            {/* Movie List */}
            <ul>
                {filteredMovies.map((movie) => (
                    <li key={movie.id}>
                        <strong>{movie.title}</strong> ({movie.release_date}) - Rating: {movie.vote_average}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HorrorMovies;
