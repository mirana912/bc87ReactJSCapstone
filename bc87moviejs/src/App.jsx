// src/App.jsx
import { memo, lazy, Suspense, useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
// Admin
import Welcome from "./welcome/index";
import AdminPage from "./admin/admin-pages/index";
import MovieForm from "./admin/admin-pages/Movies/MovieForm";
import MovieList from "./admin/admin-pages/Movies/MovieList";
// Client
import Header from "./client/client-components/Header";
import Footer from "./client/client-components/Footer";
import ProtectedRoute from "./client/client-components/ProtectedRoute";

// 1) Lazy load các trang
const Home = lazy(() => import("./client/client-pages/Home"));
const ShowtimesPage = lazy(() => import("./client/client-pages/ShowtimesPage"));
const Detail = lazy(() => import("./client/client-pages/Detail"));
const TicketRoom = lazy(() => import("./client/client-pages/TicketRoom"));
const Login = lazy(() => import("./client/client-pages/Login"));
const Register = lazy(() => import("./client/client-pages/Register"));
const Profile = lazy(() => import("./client/client-pages/Profile"));

// 2) Memo để tránh re-render không cần thiết
const HeaderMemo = memo(Header);
const FooterMemo = memo(Footer);

// 3) Fallback hiển thị trong lúc tải chunk
function PageLoader() {
  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <LinearProgress />
    </Box>
  );
}

export default function App() {
  // tránh tạo object mới mỗi render
  const containerSx = useMemo(() => ({ flex: 1, py: 3 }), []);

  // 4) Prefetch các route nặng khi rảnh tay (tăng tốc lần truy cập sau)
  useEffect(() => {
    const idle = (cb) =>
      window.requestIdleCallback
        ? requestIdleCallback(cb, { timeout: 2000 })
        : setTimeout(cb, 1200);

    const cancel = (id) =>
      window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id);

    const id = idle(() => {
      import("./client/client-pages/Detail");
      import("./client/client-pages/TicketRoom");
      import("./client/client-pages/Profile");
    });
    return () => cancel(id);
  }, []);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Client Header*/}
      <HeaderMemo />

      <Container maxWidth="xl" sx={containerSx}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Welcome Page */}
            <Route path="/" element={<Welcome />} />

            {/* Client Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:maPhim" element={<Detail />} />
            <Route path="/showtimes" element={<ShowtimesPage />} />
            <Route
              path="/ticketroom/:maLichChieu"
              element={
                <ProtectedRoute>
                  <TicketRoom />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - PHẢI ĐẶT CÁC ROUTE CỤ THỂ TRƯỚC WILDCARD */}
            <Route path="/admin/movies/add" element={<MovieForm />} />
            <Route path="/admin/movies/edit/:maPhim" element={<MovieForm />} />
            <Route path="/admin/movies" element={<MovieList />} />

            {/* Admin wildcard route - đặt CUỐI CÙNG */}
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </Container>

      {/* Client Footer*/}
      <FooterMemo />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
      />
    </div>
  );
}
