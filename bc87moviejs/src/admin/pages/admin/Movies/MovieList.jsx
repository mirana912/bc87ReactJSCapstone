import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovie } from "../../../../redux/slices/movieSlice";
import { useNavigate } from "react-router-dom";

export default function MovieList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Quản lý phim</h2>
          <button
            onClick={() => navigate("/admin/movies/add")}
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded font-semibold"
          >
            + Thêm phim
          </button>
        </div>

        {loading && <p>Đang tải danh sách phim...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4">Mã phim</th>
                <th className="py-3 px-4">Tên phim</th>
                <th className="py-3 px-4">Hình ảnh</th>
                <th className="py-3 px-4">Mô tả</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {list.map((movie) => (
                <tr key={movie.maPhim} className="border-b border-gray-700">
                  <td className="py-3 px-4">{movie.maPhim}</td>
                  <td className="py-3 px-4">{movie.tenPhim}</td>
                  <td className="py-3 px-4">
                    <img
                      src={movie.hinhAnh}
                      alt={movie.tenPhim}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 truncate max-w-xs">{movie.moTa}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/movies/edit/${movie.maPhim}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => dispatch(deleteMovie(movie.maPhim))}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
