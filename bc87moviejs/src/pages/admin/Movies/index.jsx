import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy danh sách phim
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/LayDanhSachPhim?maNhom=GP01`, {
        headers: { TokenCybersoft: TOKEN_CYBERSOFT },
      });
      setMovies(res.data.content);
    } catch (err) {
      console.error("Lỗi khi tải phim:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Xóa phim
  const handleDelete = async (maPhim) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này không?")) return;
    try {
      await axios.delete(`${API_BASE}/XoaPhim?MaPhim=${maPhim}`, {
        headers: { TokenCybersoft: TOKEN_CYBERSOFT },
      });
      alert("Xóa phim thành công!");
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Không thể xóa phim. Vui lòng thử lại!");
    }
  };

  if (loading)
    return (
      <div className="text-center text-black mt-10 text-xl">
        Đang tải danh sách phim...
      </div>
    );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">🎬 Danh sách phim</h2>
        <button
          onClick={() => navigate("/admin/movies/add")}
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded font-semibold"
        >
          ➕ Thêm phim
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-100 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Mã</th>
              <th className="px-4 py-3 text-left">Hình ảnh</th>
              <th className="px-4 py-3 text-left">Tên phim</th>
              <th className="px-4 py-3 text-left">Mô tả</th>
              <th className="px-4 py-3 text-center">Đánh giá</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((phim) => (
              <tr
                key={phim.maPhim}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">{phim.maPhim}</td>
                <td className="px-4 py-3">
                  <img
                    src={phim.hinhAnh}
                    alt={phim.tenPhim}
                    className="w-16 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{phim.tenPhim}</td>
                <td className="px-4 py-3 truncate max-w-xs">{phim.moTa}</td>
                <td className="px-4 py-3 text-center">{phim.danhGia}</td>
                <td className="px-4 py-3 text-center ">
                  <div className="inline-flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/movies/detail/${phim.maPhim}`)
                      }
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/movies/edit/${phim.maPhim}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(phim.maPhim)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
