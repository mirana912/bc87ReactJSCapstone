import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

import CinemaSystems from '../components/CinemaSystems';
import Showtimes from '../components/Showtimes';

export default function ShowtimesPage() {
  return (
    <Box sx={{ background: 'linear-gradient(180deg, #0e0e10 0%, #121216 50%, #0e0e10 100%)', minHeight: '100vh' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumbs
            sx={{
              mb: 4,
              '& .MuiBreadcrumbs-separator': { color: 'text.secondary' },
              '& a': { color: 'text.secondary', textDecoration: 'none' },
              '& a:hover': { color: 'primary.main' }
            }}
          >
            <Link component={RouterLink} to="/">Trang chủ</Link>
            <Typography color="text.primary" fontWeight={600}>Lịch Chiếu & Đặt Vé</Typography>
          </Breadcrumbs>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Typography
            variant="h2"
            sx={{
              background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -15,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 5,
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                borderRadius: 3,
              }
            }}
          >
            Lịch Chiếu Phim
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}
          >
            Chọn rạp, chọn phim, chọn suất chiếu và đặt vé ngay lập tức với hệ thống CGV hiện đại
          </Typography>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,172,80,0.08))',
              borderRadius: 4,
              p: 4,
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <Grid container spacing={4}>
              {/* Cinema Systems Sidebar */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{
                        color: 'primary.main',
                        mb: 2,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -5,
                          left: 0,
                          width: 40,
                          height: 3,
                          background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                          borderRadius: 2,
                        }
                      }}
                    >
                      Chọn Rạp
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Chọn hệ thống rạp CGV gần bạn nhất
                    </Typography>
                  </Box>
                  <CinemaSystems />
                </motion.div>
              </Grid>

              {/* Showtimes Content */}
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{
                        color: 'primary.main',
                        mb: 2,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -5,
                          left: 0,
                          width: 40,
                          height: 3,
                          background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                          borderRadius: 2,
                        }
                      }}
                    >
                      Lịch Chiếu
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Chọn phim và suất chiếu phù hợp với bạn
                    </Typography>
                  </Box>
                  <Showtimes />
                </motion.div>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          sx={{ mt: 6, textAlign: 'center' }}
        >
          <Paper
            sx={{
              background: 'linear-gradient(135deg, rgba(18,18,22,0.8), rgba(30,30,35,0.8))',
              borderRadius: 3,
              p: 4,
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: 'primary.main' }}>
              Thông Tin Quan Trọng
            </Typography>
            <Grid container spacing={3} sx={{ textAlign: 'left' }}>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  🎫 Chính Sách Đặt Vé
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Vé có thể đổi/trả trong vòng 24h trước suất chiếu
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  🎭 Quy Định Xem Phim
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Trẻ em dưới 13 tuổi cần có người lớn đi kèm
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                  📞 Hỗ Trợ Khách Hàng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hotline: 1900 6017 | 24/7
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
