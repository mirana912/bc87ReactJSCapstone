import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/axiosClient";

export default function Login() {
  const [taiKhoan, setTaiKhoan] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login({ taiKhoan, matKhau }));

    if (login.fulfilled.match(result)) {
      // Kiểm tra an toàn cho dữ liệu trả về
      const userData =
        result?.payload?.content || result?.payload || result?.user || {};

      if (userData.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/movies");
      } else if (userData.maLoaiNguoiDung === "KhachHang") {
        navigate("/client/home");
      } else {
        alert("Tài khoản không hợp lệ hoặc không có quyền truy cập!");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('../../../public/images/login-bg.jpg')", // lưu ý: file trong public/images/
      }}
    >
      <div className="bg-gray-900/80 p-8 rounded-2xl shadow-2xl w-96 text-white backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Đăng nhập hệ thống
        </h2>

        <form onSubmit={handleSubmit}>
          {/* --- Tài khoản --- */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Tài khoản
            </label>
            <input
              type="text"
              value={taiKhoan}
              onChange={(e) => setTaiKhoan(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập tài khoản..."
              required
            />
          </div>

          {/* --- Mật khẩu --- */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Mật khẩu</label>
            <input
              type="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          {/* --- Thông báo lỗi --- */}
          {error && (
            <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
          )}

          {/* --- Nút đăng nhập --- */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 transition-all p-2 rounded font-semibold disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
