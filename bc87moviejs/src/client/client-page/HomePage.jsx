import { useEffect, useState } from "react";
import { movieAPI } from "../../services/movieAPI";
import MovieCard from "../../admin/admin-component/MovieCard";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieAPI.getMovies().then((res) => {
      setMovies(res.data.content);
    });
  }, []);

  return (
    <div className="container">
      <h2>🎬 Now Showing</h2>
      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.maPhim} movie={movie} />
        ))}
      </div>
    </div>
  );
}
