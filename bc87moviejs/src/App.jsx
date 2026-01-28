import { Routes, Route } from "react-router-dom";
import Welcome from "./welcome/index";
import AdminPage from "./admin/admin-pages/index";
import MovieForm from "./admin/admin-pages/Movies/MovieForm";
import MovieList from "./admin/admin-pages/Movies/MovieList";

export default function App() {
  return (
    <Routes>
      {/* Welcome Page */}
      <Route path="/" element={<Welcome />} />

      {/* Admin Routes - PHẢI ĐẶT CÁC ROUTE CỤ THỂ TRƯỚC WILDCARD */}
      <Route path="/admin/movies/add" element={<MovieForm />} />
      <Route path="/admin/movies/edit/:maPhim" element={<MovieForm />} />
      <Route path="/admin/movies" element={<MovieList />} />

      {/* Admin wildcard route - đặt CUỐI CÙNG */}
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
}
