const TMDBClient = require('./tmdb');

class TMDBView {
  constructor() {
    this.tmdbClient = new TMDBClient();
  }

  /**
   * Fetches the official list of movie genres.
   * @param {string} language - Language for genre names (default: 'en-US').
   * @returns {Promise<Array>} - Array of genres.
   */
  async getMovieGenres(language = 'en-US') {
    try {
      const { genres } = await this.tmdbClient.fetchMovieGenres(language);
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
  async getSpecificGenres(genreNames, language = 'en-US') {
    try {
      const allGenres = await this.getMovieGenres(language);
      return allGenres.filter((genre) => genreNames.includes(genre.name));
    } catch (error) {
      console.error('Error fetching specific genres:', error);
      throw error;
    }
  }
}

module.exports = TMDBView;
