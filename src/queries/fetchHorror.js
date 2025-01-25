const tmdbClient = require('../utils/tmdb')

const fetchHorrorAndThrillerMovies = async () => {
    const genreIds = [27, 53] // horror: 27, Thriller: 53
    const tmdb = tmdbClient();

    try {
        const discover = tmdb.getDiscoverSection();
        const response = await discover.discoverMoviesAsync({
                with_genres: genreIds.join(','),
                sort_by: 'release_date.desc',
            });

            return response.results;
    } catch (error) {
        console.error('Error fetching horror and thriller movies', error)
        throw error;
    }
};


const searchMovies = async (query) => {
    const tmdb = tmdbClient();

    try {
        const search = tmdb.getSearch();
        const response = await search.SearchMoviesAsync(query);

        return response.results;
    } catch (error) {
        console.error('Error searching for movies')
        throw error;
    }
};

module.exports = {
    fetchHorrorAndThrillerMovies,
    searchMovies,
};