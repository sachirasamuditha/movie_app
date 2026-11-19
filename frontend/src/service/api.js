
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const request = async (endpoint) => {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`);
  }

  return response.json();
};

export const getPopularMovies = async () => {
  const data = await request("/movie/popular");
  return data.results || [];
};

export const searchMovies = async (query) => {
  const data = await request(
    `/search/movie?query=${encodeURIComponent(query)}`
  );

  return data.results || [];
};
