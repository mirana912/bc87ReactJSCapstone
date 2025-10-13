import { memo, lazy, Suspense, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// 1) Lazy load các trang
const Home         = lazy(() => import('./pages/Home'));
const ShowtimesPage = lazy(() => import('./pages/ShowtimesPage'));
const Detail       = lazy(() => import('./pages/Detail'));
const TicketRoom   = lazy(() => import('./pages/TicketRoom'));
const Login        = lazy(() => import('./pages/Login'));
const Register     = lazy(() => import('./pages/Register'));
const Profile      = lazy(() => import('./pages/Profile'));

// 2) Memo để tránh re-render không cần thiết
const HeaderMemo = memo(Header);
const FooterMemo = memo(Footer);

// 3) Fallback hiển thị trong lúc tải chunk
function PageLoader() {
  return (
    <Box sx={{ width: '100%', py: 2 }}>
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
      (window.requestIdleCallback
        ? requestIdleCallback(cb, { timeout: 2000 })
        : setTimeout(cb, 1200));

    const cancel = (id) =>
      (window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id));

    const id = idle(() => {
      import('./pages/Detail');
      import('./pages/TicketRoom');
      import('./pages/Profile');
    });
    return () => cancel(id);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderMemo />

      <Container sx={containerSx}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/showtimes" element={<ShowtimesPage />} />
            <Route path="/detail/:maPhim" element={<Detail />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Container>

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
