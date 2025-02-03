const makeRequest = require('../utils/tmdb');
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie posters (w500 is the image size)


const fetchHorrorAndThrillerMovies = async (page = 1) => {
  const genreIds = [27, 53]; // Horror: 27, Thriller: 53

  try {
    const response = await makeRequest('/discover/movie', {
      with_genres: genreIds.join(','),
      sort_by: 'release_date.desc',
      include_adult: true,
      include_video: true,
      language: 'en-US',
      page,
    });

    return {
        movies: response.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        overview: movie.overview,
        image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    })),
    total_pages : response.total_pages
    };
  } catch (error) {
    console.error('Error fetching horror and thriller movies:', error);
    throw error;
  }
};

const searchMovies = async (query) => {
  try {
    const response = await makeRequest('/search/movie', {
      query,
      language: 'en-US',
      include_adult: false,
    });

    return response.results;
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

module.exports = {
  fetchHorrorAndThrillerMovies,
  searchMovies,
};
