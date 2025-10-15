import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

export default function DetailMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_BASE}/LayThongTinPhim?MaPhim=${id}`, {
        headers: { TokenCybersoft: TOKEN_CYBERSOFT },
      })
      .then((res) => setMovie(res.data.content))
      .catch((err) => console.error("Lỗi load chi tiết phim:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="p-8 text-white">Đang tải chi tiết phim...</div>;
  if (!movie)
    return (
      <div className="p-8 text-red-400">
        Không tìm thấy thông tin phim.
        <button
          onClick={() => navigate("/admin/movies")}
          className="ml-4 bg-gray-700 px-3 py-1 rounded"
        >
          ← Quay lại
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-6 shadow-lg">
        <button
          onClick={() => navigate("/admin/movies")}
          className="mb-4 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
        >
          ← Quay lại
        </button>
        <div className="flex gap-6">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-48 h-64 object-cover rounded shadow"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">{movie.tenPhim}</h2>
            <p className="text-sm text-gray-300 mb-1">
              Mã phim: <span className="text-gray-200">{movie.maPhim}</span>
            </p>
            <p className="text-sm text-gray-300 mb-1">
              Ngày khởi chiếu:{" "}
              <span className="text-gray-200">
                {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
              </span>
            </p>
            <p className="text-sm text-gray-300 mb-1">
              Đánh giá:{" "}
              <span className="text-yellow-400 font-semibold">
                {movie.danhGia}/10
              </span>
            </p>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              {movie.moTa || "Không có mô tả."}
            </p>
            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-sm"
              >
                🎬 Xem trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
