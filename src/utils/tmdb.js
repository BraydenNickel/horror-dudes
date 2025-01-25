class TMDBClient {
    constructor() {
      this.apiKey = process.env.TMDB_MOVIE_API_READ_KEY;
      this.baseUrl = 'https://api.themoviedb.org/3';
  
      if (!this.apiKey) {
        throw new Error('API key is required to initialize TMDBClient.');
      }
    }
  
    /**
     * Makes a GET request to the TMDB API using fetch.
     * @param {string} endpoint - The TMDB API endpoint (e.g., '/discover/movie').
     * @param {Object} params - Query parameters for the request.
     * @returns {Promise<Object>} - The response data from the API.
     */
    async request(endpoint, params = {}) {
      try {
        // Build query string from params
        const queryParams = new URLSearchParams({
          api_key: this.apiKey,
          ...params,
        }).toString();
  
        const url = `${this.baseUrl}${endpoint}?${queryParams}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error(`Error making request to TMDB API: ${error.message}`);
        throw error;
      }
    }
  
    /**
     * Fetches the list of official genres for movies.
     * @param {string} language - Language for genre names (default: 'en-US').
     * @returns {Promise<Array>} - Array of genres.
     */
    async fetchMovieGenres(language = 'en-US') {
      try {
        const { genres } = await this.request('/genre/movie/list', { language });
        return genres;
      } catch (error) {
        console.error('Error fetching movie genres:', error);
        throw error;
      }
    }
  
    /**
     * Fetches specific genres by their names.
     * @param {Array<string>} genreNames - List of genre names (e.g., ['Horror', 'Thriller']).
     * @param {string} language - Language for genre names (default: 'en-US').
     * @returns {Promise<Array>} - Array of genres that match the specified names.
     */
    async fetchSpecificGenres(genreNames, language = 'en-US') {
      try {
        const allGenres = await this.fetchMovieGenres(language);
        return allGenres.filter((genre) => genreNames.includes(genre.name));
      } catch (error) {
        console.error('Error fetching specific genres:', error);
        throw error;
      }
    }
  }
  
  module.exports = TMDBClient;
  