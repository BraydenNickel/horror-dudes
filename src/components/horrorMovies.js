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
import FilterModal from './filterModal';

const HorrorMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [showModal, setShowModal] = useState(false); // For Modal Visibility

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
        setShowModal(false); // Close modal after applying filters
    };

    return (
        <div>
            <h1>Horror & Thriller Movies</h1>

            {/* Movie List */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredMovies.map((movie) => (
                    <li key={movie.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                        <img
                            src={movie.image || 'https://via.placeholder.com/150x225?text=No+Image'}
                            alt={movie.title}
                            style={{
                                width: '150px',
                                height: '225px',
                                marginRight: '15px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <div>
                            <strong>{movie.title}</strong> ({movie.release_date})<br />
                            Rating: {movie.vote_average} / 10
                            <p style={{ marginTop: '10px', maxWidth: '600px', fontSize: '0.9em', color: '#555' }}>
                                {movie.overview || 'No description available.'}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Include FilterModal component here */}
            <FilterModal showModal={showModal} setShowModal={setShowModal} handleFilter={handleFilter} />
        </div>
    );
};

export default HorrorMovies;