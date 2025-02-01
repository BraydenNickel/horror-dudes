const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_MOVIE_API_READ_KEY;

if (!TMDB_API_TOKEN) {
  throw new Error('TMDB Bearer Token is required!');
}

/**
 * Makes a request to the TMDB API.
 * @param {string} endpoint - The TMDB API endpoint (e.g., '/discover/movie').
 * @param {Object} params - Query parameters for the request.
 * @returns {Promise<Object>} - The JSON response from the API.
 */
const makeRequest = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams}`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request to ${endpoint} failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in TMDB API request: ${error.message}`);
    throw error;
  }
};

module.exports =  makeRequest;