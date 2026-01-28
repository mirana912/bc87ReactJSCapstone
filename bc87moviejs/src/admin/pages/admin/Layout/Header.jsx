import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/admin", { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-center items-center">
      <h1 className="text-xl font-bold text-gray-800">Trang quản trị</h1>
      <button
        hidden
        onClick={handleLogout}
        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition-all"
      >
        Đăng xuất
      </button>
    </header>
  );
}
