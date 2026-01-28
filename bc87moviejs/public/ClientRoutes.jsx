import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/client/MovieDetail.client";
import BookingPage from "../pages/BookingPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

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
