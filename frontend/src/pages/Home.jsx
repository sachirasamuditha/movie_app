
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../service/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load popular movies
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);

        const popularMovies = await getPopularMovies();

        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const searchResults = await searchMovies(searchQuery);

      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  // Filter movies
  const filteredMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(
      searchQuery.trim().toLowerCase()
    )
  );

  return (
    <div className="home">

      <form
        onSubmit={handleSearch}
        className="search-form"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          type="submit"
          className="search-button"
          disabled={loading}
        >
          Search
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          Loading...
        </div>
      ) : (
        <div className="movies-grid">

          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
              />
            ))
          ) : (
            <p>No movies found!</p>
          )}

        </div>
      )}

    </div>
  );
}

export default Home;
