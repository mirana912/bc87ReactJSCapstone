import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/index";
import AdminPage from "./pages/admin/index";
import MovieForm from "./pages/admin/Movies/MovieForm";
import MovieList from "./pages/admin/Movies/MovieList";

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
