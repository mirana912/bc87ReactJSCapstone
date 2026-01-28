// src/common/shared-components/route/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check userToken thay vì isAuthenticated
  const token = localStorage.getItem("userToken");

  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
// ==========================================
