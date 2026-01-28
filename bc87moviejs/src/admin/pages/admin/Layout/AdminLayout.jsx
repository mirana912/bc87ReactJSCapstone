import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slices/authSlice";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ← THÊM DÒNG NÀY (BẠN THIẾU!)

  const handleLogout = () => {
    dispatch(logout()); // Giờ dispatch mới hoạt động
    navigate("/admin"); // Về trang login
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
