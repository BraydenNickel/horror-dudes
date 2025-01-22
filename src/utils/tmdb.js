require('dotenv').config();

const { TmbdClient } = require('./tmdb-js/tmdb-js');

const tmdbClient = () => {
    const apiKey = process.env.TMDB_MOVIE_API_READ_KEY
    if (!apiKey) {
        throw new Error("TMBD API Key is required")
    }

    return new TmbdClient(apiKey);
}

module.exports = tmdbClient;