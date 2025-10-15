import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';

import BannerCarousel from '../components/BannerCarousel';
import MoviesGrid from '../components/MoviesGrid';

export default function Home() {
  const [nowPlayingRef, nowPlayingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showtimesRef, showtimesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #0e0e10 0%, #121216 50%, #0e0e10 100%)' }}>
      {/* Hero Section với Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <BannerCarousel />
      </motion.div>

      {/* Now Playing Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <motion.div
          ref={nowPlayingRef}
          initial={{ opacity: 0, y: 50 }}
          animate={nowPlayingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              id="now-playing"
              variant="h3"
              sx={{
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                  borderRadius: 2,
                }
              }}
            >
              Phim Đang Chiếu
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}
            >
              Khám phá bộ sưu tập phim bom tấn đang chiếu tại các rạp CGV trên toàn quốc
            </Typography>
          </Box>
          <MoviesGrid />
        </motion.div>

        {/* Showtimes CTA Section */}
        <motion.div
          ref={showtimesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={showtimesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          sx={{ mt: 10 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                  borderRadius: 2,
                }
              }}
            >
              Đặt Vé Ngay
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mt: 3, mb: 4 }}
            >
              Khám phá lịch chiếu phim và đặt vé dễ dàng với hệ thống rạp CGV hiện đại trên toàn quốc
            </Typography>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={RouterLink}
                to="/showtimes"
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                  borderRadius: 25,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 8px 25px rgba(255,107,107,0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5252, #ff8c00)',
                    boxShadow: '0 12px 35px rgba(255,107,107,0.4)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Xem Lịch Chiếu & Đặt Vé
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
