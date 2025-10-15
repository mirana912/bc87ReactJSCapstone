import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {
  const [form, setForm] = useState({
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    maNhom: "GP01",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append("File", file);

    try {
      await axios.post("/QuanLyPhim/ThemPhimUploadHinh", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Thêm phim thành công!");
      navigate("/admin/movies");
    } catch (error) {
      console.error(error);
      alert("Thêm phim thất bại!");
    }
  };

  return (
    <div className="p-6 text-black bg-gray-400">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">🎬 Thêm Phim Mới</h2>
        <button
          onClick={() => navigate("/admin/movies")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
        >
          ← Quay lại
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          name="tenPhim"
          placeholder="Tên phim"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          name="biDanh"
          placeholder="Bí danh"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          name="trailer"
          placeholder="Trailer URL"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <textarea
          name="moTa"
          placeholder="Mô tả"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="date"
          name="ngayKhoiChieu"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
        >
          Thêm phim
        </button>
      </form>
    </div>
  );
}
