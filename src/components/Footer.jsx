import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        mt: 8,
        pt: 6,
        pb: 4,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CGV Cinema
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Trải nghiệm điện ảnh đỉnh cao với công nghệ chiếu phim hiện đại,
              âm thanh sống động và dịch vụ chuyên nghiệp tại hệ thống rạp CGV.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                sx={{
                  color: '#4267B2',
                  '&:hover': { color: '#365899', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease',
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#E4405F',
                  '&:hover': { color: '#d6336c', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease',
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#FF0000',
                  '&:hover': { color: '#cc0000', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease',
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#1DA1F2',
                  '&:hover': { color: '#0d95e8', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease',
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ff6b6b' }}>
              Dịch Vụ
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Đặt Vé Online
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Thành Viên CGV
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Khuyến Mãi
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Sự Kiện
              </Link>
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ff6b6b' }}>
              Hỗ Trợ
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Trung Tâm Trợ Giúp
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Chính Sách Bảo Mật
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Điều Khoản Sử Dụng
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}>
                Tuyển Dụng
              </Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ff6b6b' }}>
              Liên Hệ
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  123 Đường ABC, Quận 1, TP.HCM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  1900 XXX XXX
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  support@cgv.vn
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

        {/* Bottom Section */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: { xs: 'center', sm: 'left' } }}>
            © {currentYear} CGV Corporation. Tất cả quyền được bảo lưu.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ color: 'rgba(255,255,255,0.6)' }}>
            <Typography variant="body2">Điều khoản</Typography>
            <Typography variant="body2">Bảo mật</Typography>
            <Typography variant="body2">Cookie</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
