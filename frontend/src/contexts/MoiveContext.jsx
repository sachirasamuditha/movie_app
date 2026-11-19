
import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

const MovieContext = createContext(null);

export const useMovieContext = () =>
  useContext(MovieContext);

export const MovieProvider = ({ children }) => {

  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch {
      return [];
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Add movie to favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (item) => item.id === movie.id
      );

      if (exists) return prev;

      return [...prev, movie];
    });
  };

  // Remove movie from favorites
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  // Check favorite status
  const isFavorite = (movieId) => {
    return favorites.some(
      (movie) => movie.id === movieId
    );
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
