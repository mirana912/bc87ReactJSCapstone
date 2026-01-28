import { Routes, Route } from "react-router-dom";
import HomePage from "../admin/pages/HomePage";
import MovieDetail from "../admin/pages/client-page/MovieDetail.client";
import BookingPage from "../admin/pages/BookingPage";
import LoginPage from "../admin/pages/LoginPage";
import ProfilePage from "../admin/pages/ProfilePage";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/booking/:showtimeId" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
