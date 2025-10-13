import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import client from '../api/client';
import { Box, Card, CardMedia, Typography, Stack, Button, Dialog, DialogContent } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import dayjs from 'dayjs';

const ytId = (url='') => {
  // lấy id YouTube đơn giản
  const m = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/);
  return m ? m[1] : null;
};

export default function Detail(){
  const { maPhim } = useParams();
  const [phim, setPhim] = useState(null);
  const [lich, setLich] = useState([]);    // list hệ thống rạp/ cụm / lịch
  const [openTrailer, setOpenTrailer] = useState(false);

  useEffect(()=>{
    (async ()=>{
      const info = await client.get('/QuanLyPhim/LayThongTinPhim', { params: { maPhim }});
      setPhim(info.data.content);
      const lichRes = await client.get('/QuanLyRap/LayThongTinLichChieuPhim', { params: { MaPhim: maPhim }});
      setLich(lichRes.data.content?.heThongRapChieu || []);
    })();
  },[maPhim]);

  if(!phim) return null;

  const videoId = ytId(phim.trailer);
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card><CardMedia component="img" image={phim.hinhAnh} alt={phim.tenPhim}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }} /></Card>
          {videoId && <Button fullWidth sx={{ mt:2 }} variant="contained" onClick={()=>setOpenTrailer(true)}>Xem trailer</Button>}
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" fontWeight={700}>{phim.tenPhim}</Typography>
          <Typography color="text.secondary" sx={{ mt:1, whiteSpace:'pre-wrap' }}>{phim.moTa}</Typography>

          <Typography variant="h6" sx={{ mt:3, mb:1 }}>Lịch chiếu</Typography>
          <Stack gap={2}>
            {lich.map(sys => (
              <Box key={sys.maHeThongRap}>
                <Typography fontWeight={700} color="primary">{sys.tenHeThongRap}</Typography>
                {sys.cumRapChieu?.map(cum => (
                  <Box key={cum.maCumRap} sx={{ pl:2, my:1 }}>
                    <Typography variant="subtitle2">{cum.tenCumRap}</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
                      {cum.lichChieuPhim?.map(lc => (
                        <Button
  key={lc.maLichChieu}
  component={RouterLink}
  to={`/ticketroom/${lc.maLichChieu}`}
  onMouseEnter={() => client.get('/QuanLyDatVe/LayDanhSachPhongVe', {
    params: { MaLichChieu: lc.maLichChieu },
    cacheTTL: 2 * 60 * 1000
  })}
  variant="outlined"
  size="small"
>
  {dayjs(lc.ngayChieuGioChieu).format('DD/MM HH:mm')}
</Button>

                      ))}
                    </Stack>
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Dialog open={openTrailer} onClose={()=>setOpenTrailer(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p:0 }}>
          {videoId ? (
            <Box sx={{ position:'relative', pt:'56.25%' }}>
              <iframe
                title="trailer"
                src={`https://www.youtube.com/embed/${videoId}`}
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          ) : <Box p={2}>Không có trailer hợp lệ.</Box>}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
