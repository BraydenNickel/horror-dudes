const filterMoviesByYear = (movies, year) => {
    return movies.filter((movie) => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear === year;
    });
};

const filterMoviesByRating = (movies, minRating) => {
    return movies.filter((movie) => movie.vote_average >= minRating);
};

const filterMoviesByName = (movies, name) => {
    return movies.filter((movie) => {
        movie.title.toLowerCase().includes(name.toLowerCase())
    });
};

module.exports = {
    filterMoviesByYear,
    filterMoviesByRating,
    filterMoviesByName
};