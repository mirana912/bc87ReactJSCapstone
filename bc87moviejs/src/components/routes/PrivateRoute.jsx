import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    // Nếu chưa đăng nhập thì chuyển về /admin (trang login)
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}
