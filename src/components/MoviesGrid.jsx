import Grid from '@mui/material/Grid'; // v7: Grid mới
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useMemo, memo } from 'react';
import { fetchMovies } from '../features/movies/moviesSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MoviesGrid = memo(function MoviesGrid(){
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(s=>s.movies);

  const itemsMemo = useMemo(() => items, [items]);

  useEffect(()=>{ dispatch(fetchMovies()); },[dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={2} sx={{ mt:3 }}>
        {itemsMemo.map((m, index) => (
          <Grid key={m.maPhim} size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card sx={{ height:'100%', display:'flex', flexDirection:'column' }}>
                <CardMedia component="img" image={m.hinhAnh} alt={m.tenPhim}
                  sx={{ aspectRatio:'2/3', objectFit:'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }} />
                <CardContent sx={{ flex:1 }}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom noWrap>
                    {m.tenPhim}
                  </Typography>
                  <Typography variant="body2" color="text.secondary"
                    sx={{ display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {m.moTa}
                  </Typography>
                </CardContent>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button component={RouterLink} to={`/detail/${m.maPhim}`} variant="contained" sx={{ m:2 }}>
                    Book Now
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
});

export default MoviesGrid;
