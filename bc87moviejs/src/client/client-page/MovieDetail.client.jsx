import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieAPI } from "../../../services/movieAPI";
import { Link } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieAPI.getMovieDetail(id).then((res) => {
      setMovie(res.data.content);
    });
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.tenPhim}</h2>
      <img src={movie.hinhAnh} width="200" />
      <p>{movie.moTa}</p>

      <h3>Lịch chiếu</h3>
      {movie.heThongRapChieu?.map((rap) =>
        rap.cumRapChieu.map((cum) =>
          cum.lichChieuPhim.map((lich) => (
            <Link key={lich.maLichChieu} to={`/booking/${lich.maLichChieu}`}>
              {new Date(lich.ngayChieuGioChieu).toLocaleString()}
            </Link>
          )),
        ),
      )}
    </div>
  );
}
