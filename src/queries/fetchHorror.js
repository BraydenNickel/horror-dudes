const makeRequest = require('../utils/tmdb');
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie posters (w500 is the image size)


const fetchHorrorAndThrillerMovies = async (options = {}) => {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    const params = {
        with_genres: '27,53', // Horror: 27, Thriller: 53
        sort_by: options.isUpcoming ? 'release_date.asc' : 'release_date.desc',
        include_adult: true,
        include_video: false,
        language: 'en-US',
        page: options.page || 1
    };

    // Filtering for Released or Upcoming movies
    if (options.isUpcoming) {
        params.release_date_gte = today; // Only upcoming movies
    } else {
        params.release_date_lte = today; // Only released movies
    }

    // Filtering by Year & Month
    if (options.year) {
        params.primary_release_year = options.year;
    }
    if (options.year && options.month) {
        const month = options.month.toString().padStart(2, '0'); // Ensure two-digit month format
        const startOfMonth = `${options.year}-${month}-01`; // Start date of the month
        
        // Calculate the last day of the selected month
        const lastDayOfMonth = new Date(options.year, options.month, 0).getDate(); // Get the last day of the month
        const endOfMonth = `${options.year}-${month}-${lastDayOfMonth.toString().padStart(2, '0')}`; // End date of the month
    
        // Apply the start and end of the month
        params["release_date.gte"] = startOfMonth;
        params["release_date.lte"] = endOfMonth;
    }
    

    try {
        const response = await makeRequest('/discover/movie', params);

        const movies = response.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            popularity: movie.popularity,
            vote_average: movie.vote_average,
            overview: movie.overview,
            image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
        }));

        return movies;
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
