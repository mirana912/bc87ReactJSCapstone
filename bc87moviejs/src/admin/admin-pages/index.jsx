import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Movies from "./Movies/index";
import AddMovie from "./Movies/AddMovie";
// import EditMovie from "./Movies/EditMovie";
import MovieDetail from "./Movies/MovieDetail";
import Users from "./Users/index";
import AdminLayout from "./Layout/AdminLayout";
import PrivateRoute from "../../common/shared-components/routes/PrivateRoute";

export default function AdminPage() {
  return (
    <Routes>
      {/* Trang đăng nhập */}
      <Route path="/" element={<Login />} />

      {/* Trang quản trị - cần đăng nhập */}
      <Route
        path="movies"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Movies />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Thêm phim */}
      <Route
        path="movies/add"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AddMovie />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Sửa phim */}
      {/* <Route
        path="movies/edit/:id"
        element={
          <PrivateRoute>
            <AdminLayout>
              <EditMovie />
            </AdminLayout>
          </PrivateRoute>
        }
      /> */}

      {/* Chi tiết phim */}
      <Route
        path="movies/:id"
        element={
          <PrivateRoute>
            <AdminLayout>
              <MovieDetail />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Trang Users */}
      <Route
        path="users"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Mặc định chuyển hướng về movies */}
      <Route path="" element={<Navigate to="/admin/movies" replace />} />
      <Route path="*" element={<Navigate to="/admin/movies" replace />} />
    </Routes>
  );
}
