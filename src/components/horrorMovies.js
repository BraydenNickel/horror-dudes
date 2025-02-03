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
import '../styles/movies.css'; // Styles 
import FilterModal from './filterModal';

const HorrorMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [expandMovies, setExpandMovies] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchMovies(1);
    }, []);

    const fetchMovies = async (page) => {
        try {
            const { movies: newMovies, total_pages } = await fetchHorrorAndThrillerMovies(page);
            setMovies((prevMovies) => [...prevMovies, ...newMovies]); // Append new results
            setFilteredMovies((prevMovies) => [...prevMovies, ...newMovies]); // Update filtered list
            setTotalPages(total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleShowMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchMovies(nextPage);
                return nextPage;
            });
        }
    };

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

    const showExpand = (id, e) => {
        e.stopPropagation();
        setExpandMovies((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    return (
        <div>
            <ul className="movie-list">
                {filteredMovies.map((movie) => {
                    const isExpanded = expandMovies[movie.id];

                    return (
                        <li 
                            key={movie.id} 
                            className={`movie-item ${isExpanded ? "expanded" : ""}`}
                        >
                            <img
                                src={movie.image || "https://via.placeholder.com/150x225?text=No+Image"}
                                alt={movie.title}
                                className="movie-image"
                            />
                            <div className="movie-details">
                                <div className="movie-title">{movie.title}</div>
                                <div>({movie.release_date})</div>
                                <div className="movie-rating">Rating: {movie.vote_average} / 10</div>
                                <p className="movie-description">
                                    {movie.overview || "No description available."}
                                </p>
                                {movie.overview && movie.overview.length > 50 && (
                                    <button 
                                        className="show-more" 
                                        onClick={(e) => showExpand(movie.id, e)}
                                    >
                                        {isExpanded ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
            {currentPage < totalPages && (
                <button className='load-more' onClick={handleShowMore}>
                Show More
                </button>
            )}
            <FilterModal showModal={showModal} setShowModal={setShowModal} handleFilter={handleFilter} />
        </div>
    );
};

export default HorrorMovies