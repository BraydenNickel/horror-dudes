import React, { useState, useEffect } from 'react';
import {
    fetchHorrorAndThrillerMovies,
    searchMovies
} from '../queries/fetchHorror'; // TMDB Queries
import FilterModal from './filterModal'; // Filter Modal Component
import '../styles/movies.css'; // Styles

const HorrorMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [isUpcoming, setIsUpcoming] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [expandMovies, setExpandMovies] = useState({});
    const [page, setPage] = useState(1); // Pagination

    useEffect(() => {
        fetchMovies();
    }, [isUpcoming, year, month, page]);

    const fetchMovies = async () => {
        try {
            const options = { isUpcoming, year, month, page };
            const movies = await fetchHorrorAndThrillerMovies(options);
            setMovies((prevMovies) => (page === 1 ? movies : [...prevMovies, ...movies]));
            setFilteredMovies((prevMovies) => (page === 1 ? movies : [...prevMovies, ...movies]));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSearch = async () => {
        if (searchQuery) {
            const results = await searchMovies(searchQuery, movies);
            setFilteredMovies(results);
        } else {
            setFilteredMovies(movies);
        }
    };

    const handleFilter = (year, month, isUpcoming) => {
        setYear(year);
        setMonth(month);
        setIsUpcoming(isUpcoming);
        setPage(1); // Reset pagination on new filters
    };

    const showExpand = (id, e) => {
        e.stopPropagation();
        setExpandMovies((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleSearch}
                className="search-bar"
            />

            <ul className="movie-list">
                {filteredMovies.map((movie) => {
                    const isExpanded = expandMovies[movie.id];

                    return (
                        <li key={movie.id} className={`movie-item ${isExpanded ? 'expanded' : ''}`}>
                            <img
                                src={movie.image || 'https://via.placeholder.com/150x225?text=No+Image'}
                                alt={movie.title}
                                className="movie-image"
                            />
                            <div className="movie-details">
                                <div className="movie-title">{movie.title}</div>
                                <div>({movie.release_date})</div>
                                <div className="movie-rating">Rating: {movie.vote_average} / 10</div>
                                <p className="movie-description">
                                    {movie.overview || 'No description available.'}
                                </p>
                                {movie.overview && movie.overview.length > 50 && (
                                    <button className="show-more" onClick={(e) => showExpand(movie.id, e)}>
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Show More Button */}
            <button onClick={() => setPage((prev) => prev + 1)} className="load-more">
                Show More
            </button>

            <FilterModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleFilter={handleFilter}
            />
        </div>
    );
};

export default HorrorMovies;
