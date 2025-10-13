import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { MenuItem, IconButton, Avatar, Paper } from '@mui/material';
import { useState } from 'react';
import { logout } from '../features/auth/authSlice';
import TopNav from './TopNav';
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [anchor, setAnchor] = useState(null);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(14,14,16,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        <Toolbar sx={{ gap: 3, py: 1 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
                  alt="CGV"
                  sx={{ height: 40, width: 'auto' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    letterSpacing: 1
                  }}
                >
                  CGV Việt Nam
                </Typography>
              </Box>
            </RouterLink>
          </motion.div>

          <Box sx={{ flex: 1 }} />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <TextField
              size="small"
              placeholder="Tìm phim, rạp..."
              variant="outlined"
              sx={{
                minWidth: 280,
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 25,
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#ff6b6b' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.6)', mr: 1 }} />
                ),
              }}
            />
          </motion.div>

          <AnimatePresence>
            {!user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', gap: 8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="text"
                    sx={{
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Đăng nhập
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                      borderRadius: 25,
                      px: 3,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff5252, #ff8c00)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(255,107,107,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Đăng ký
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <IconButton
                    onClick={(e) => setAnchor(e.currentTarget)}
                    size="small"
                    sx={{
                      border: '2px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#ff6b6b',
                        boxShadow: '0 0 20px rgba(255,107,107,0.3)'
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                        fontWeight: 700
                      }}
                    >
                      {(user.hoTen || user.taiKhoan || 'U')[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                </motion.div>

                <AnimatePresence>
                  {anchor && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Paper
                        sx={{
                          position: 'absolute',
                          top: 60,
                          right: 0,
                          minWidth: 200,
                          background: 'rgba(18,18,22,0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 2,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                          zIndex: 1300
                        }}
                      >
                        <MenuItem disabled sx={{ opacity: 0.7, fontSize: '0.9rem' }}>
                          {user.hoTen || user.taiKhoan}
                        </MenuItem>
                        <MenuItem
                          component={RouterLink}
                          to="/profile"
                          onClick={() => setAnchor(null)}
                          sx={{
                            '&:hover': {
                              background: 'rgba(255,107,107,0.1)',
                              color: '#ff6b6b'
                            }
                          }}
                        >
                          Tài khoản của tôi
                        </MenuItem>
                        <MenuItem
                          onClick={() => { dispatch(logout()); setAnchor(null); }}
                          sx={{
                            '&:hover': {
                              background: 'rgba(255,107,107,0.1)',
                              color: '#ff6b6b'
                            }
                          }}
                        >
                          Đăng xuất
                        </MenuItem>
                      </Paper>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </Toolbar>

        {/* Thanh điều hướng nhỏ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Toolbar
            variant="dense"
            sx={{
              minHeight: 48,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              background: 'linear-gradient(90deg, rgba(255,107,107,0.05), rgba(255,172,80,0.05))'
            }}
          >
            <TopNav />
          </Toolbar>
        </motion.div>
      </AppBar>
    </motion.div>
  );
}
