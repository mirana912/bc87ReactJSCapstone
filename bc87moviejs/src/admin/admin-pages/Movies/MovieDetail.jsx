import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy mã phim");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/LayThongTinPhim?MaPhim=${id}`, {
        headers: { TokenCybersoft: TOKEN_CYBERSOFT },
      })
      .then((res) => {
        setMovie(res.data.content);
        setError(null);
      })
      .catch((err) => {
        console.error("Lỗi load chi tiết phim:", err);
        setError("Không thể tải thông tin phim. Vui lòng thử lại.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Đang tải chi tiết phim...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Không tìm thấy phim
          </h2>
          <p className="text-gray-300 mb-6">
            {error || "Không tìm thấy thông tin phim."}
          </p>
          <button
            onClick={() => navigate("/admin/movies")}
            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            ← Quay lại danh sách phim
          </button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // Get YouTube video ID from URL
  const getYouTubeID = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const youtubeID = getYouTubeID(movie.trailer);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/movies")}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <span>←</span>
            <span>Quay lại</span>
          </button>

          <button
            onClick={() => navigate(`/admin/movies/edit/${movie.maPhim}`)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <span>✏️</span>
            <span>Chỉnh sửa</span>
          </button>
        </div>

        {/* Main content */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Movie info section */}
          <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-pink-400">
                {movie.tenPhim}
              </h1>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-700/50 p-4 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Mã phim</p>
                  <p className="font-semibold">{movie.maPhim}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ngày khởi chiếu</p>
                  <p className="font-semibold">
                    {formatDate(movie.ngayKhoiChieu)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Đánh giá</p>
                  <p className="font-semibold">
                    <span className="text-yellow-400 text-xl">★</span>{" "}
                    {movie.danhGia}/10
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Trạng thái</p>
                  <p className="font-semibold">
                    {movie.sapChieu ? (
                      <span className="text-blue-400">🔜 Sắp chiếu</span>
                    ) : movie.dangChieu ? (
                      <span className="text-green-400">🎬 Đang chiếu</span>
                    ) : (
                      <span className="text-gray-400">⏸️ Không chiếu</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-pink-400">
                  📝 Mô tả
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.moTa || "Không có mô tả cho phim này."}
                </p>
              </div>

              {/* Alias */}
              {movie.biDanh && (
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Bí danh (URL)</p>
                  <p className="font-mono text-sm text-gray-300">
                    {movie.biDanh}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trailer section */}
          {youtubeID && (
            <div className="p-6 md:p-8 bg-gray-900/50">
              <h3 className="font-semibold text-xl mb-4 text-pink-400">
                🎬 Trailer
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeID}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="p-6 md:p-8 bg-gray-900/50 flex gap-4 flex-wrap">
            {movie.trailer && !youtubeID && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <span>🎬</span>
                <span>Xem trailer</span>
              </a>
            )}

            <button
              onClick={() => navigate(`/admin/movies/edit/${movie.maPhim}`)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <span>✏️</span>
              <span>Chỉnh sửa phim</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
