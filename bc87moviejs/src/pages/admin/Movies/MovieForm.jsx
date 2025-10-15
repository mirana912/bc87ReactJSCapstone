import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

export default function MovieForm() {
  const navigate = useNavigate();
  const { maPhim } = useParams();

  const [movie, setMovie] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    danhGia: "",
    hinhAnh: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Nếu là chế độ "Edit" thì load thông tin phim
  useEffect(() => {
    const fetchMovie = async () => {
      if (!maPhim) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/LayThongTinPhim?MaPhim=${maPhim}`,
          {
            headers: { TokenCybersoft: TOKEN_CYBERSOFT },
          }
        );
        const data = res.data.content;
        setMovie({
          tenPhim: data.tenPhim,
          trailer: data.trailer,
          moTa: data.moTa,
          ngayKhoiChieu: data.ngayKhoiChieu?.split("T")[0],
          danhGia: data.danhGia,
          hinhAnh: null,
        });
        setPreview(data.hinhAnh);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [maPhim]);

  // Xử lý khi nhập liệu
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "hinhAnh") {
      const file = files[0];
      setMovie({ ...movie, hinhAnh: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setMovie({ ...movie, [name]: value });
    }
  };

  // Xử lý Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (let key in movie) {
      if (movie[key]) formData.append(key, movie[key]);
    }
    formData.append("maNhom", "GP01");

    try {
      if (maPhim) {
        // Update
        await axios.post(`${API_BASE}/CapNhatPhimUpload`, formData, {
          headers: { TokenCybersoft: TOKEN_CYBERSOFT },
        });
        alert("Cập nhật phim thành công!");
      } else {
        // Add
        await axios.post(`${API_BASE}/ThemPhimUploadHinh`, formData, {
          headers: { TokenCybersoft: TOKEN_CYBERSOFT },
        });
        alert("Thêm phim thành công!");
      }
      navigate("/admin/movies");
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi. Vui lòng kiểm tra lại dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {maPhim ? "Cập nhật phim" : "Thêm phim mới"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Tên phim</label>
            <input
              type="text"
              name="tenPhim"
              value={movie.tenPhim}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Nhập tên phim..."
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Trailer</label>
            <input
              type="text"
              name="trailer"
              value={movie.trailer}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="URL trailer..."
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mô tả</label>
            <textarea
              name="moTa"
              value={movie.moTa}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Nhập mô tả..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">
                Ngày khởi chiếu
              </label>
              <input
                type="date"
                name="ngayKhoiChieu"
                value={movie.ngayKhoiChieu}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Đánh giá (0–10)
              </label>
              <input
                type="number"
                name="danhGia"
                value={movie.danhGia}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Hình ảnh</label>
            <input
              type="file"
              name="hinhAnh"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-56 object-cover mt-3 rounded-lg shadow-md border border-gray-600"
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/movies")}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded font-semibold"
            >
              {loading ? "Đang xử lý..." : maPhim ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
