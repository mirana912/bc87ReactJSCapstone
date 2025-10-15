import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/index";
import AdminPage from "./pages/admin/index";
import MovieForm from "./pages/admin/Movies/MovieForm";
import MovieList from "./pages/admin/Movies/MovieList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/admin/movies" element={<MovieList />} />
      <Route path="/admin/movies/add" element={<MovieForm />} />
      <Route path="/admin/movies/edit/:maPhim" element={<MovieForm />} />
    </Routes>
  );
}
