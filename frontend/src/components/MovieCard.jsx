
import { useMovieContext } from "../contexts/MoiveContext";
import "../css/MovieCard.css";

function MovieCard({ movie }) {

  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites
  } = useMovieContext();

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">

      <div className="movie-poster">

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-poster.png"
          }
          alt={movie.title || "Movie poster"}
        />

        <div className="movie-overlay">

          <button
            type="button"
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={
              favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {favorite ? "❤️" : "🤍"}
          </button>

        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.release_date
            ? movie.release_date.split("-")[0]
            : "Release date unavailable"}
        </p>
        <p>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</p>
      </div>

    </div>
  );
}

export default MovieCard;
