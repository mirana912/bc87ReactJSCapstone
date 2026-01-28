import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.hinhAnh} alt={movie.tenPhim} />
      <h4>{movie.tenPhim}</h4>
      <Link to={`/movie/${movie.maPhim}`}>Đặt vé</Link>
    </div>
  );
}
