// src/client/client-components/Showtimes.jsx
import { useEffect, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimes } from "../features/showtimes/showtimesSlice";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";

const Showtimes = memo(function Showtimes() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.showtimes);
  const { selected } = useSelector((s) => s.cinemas);

  const itemsMemo = useMemo(() => items, [items]);
  const statusMemo = useMemo(() => status, [status]);
  const selectedMemo = useMemo(() => selected, [selected]);

  useEffect(() => {
    if (!selectedMemo) {
      dispatch(fetchShowtimes({ maHeThongRap: undefined }));
    }
  }, [dispatch, selectedMemo]);

  if (statusMemo === "loading") {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (itemsMemo.length === 0) {
    return (
      <Typography color="text.secondary" py={2}>
        Chọn hệ thống rạp bên trái để xem lịch chiếu.
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={2}>
        {itemsMemo.map((m, index) => (
          <Grid key={m.maPhim} item size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card sx={{ display: "flex", gap: 2 }}>
                {/* Fallback image if not found */}
                <CardMedia
                  component="img"
                  image={m.hinhAnh || "https://via.placeholder.com/140x200"} // Fallback image
                  alt={m.tenPhim}
                  sx={{ width: 140, height: 200, objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/140x200?text=No+Image";
                  }}
                />
                <Stack sx={{ flex: 1, p: 1 }}>
                  <CardHeader
                    titleTypographyProps={{ variant: "h6" }}
                    title={m.tenPhim}
                    sx={{ p: 0, pb: 1 }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {m.lstLichChieuTheoPhim.slice(0, 20).map((lc) => (
                        <motion.div
                          key={lc.maLichChieu}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            component={RouterLink}
                            to={`/ticketroom/${lc.maLichChieu}`}
                            size="small"
                            variant="outlined"
                          >
                            {dayjs(lc.ngayChieuGioChieu).format("DD/MM HH:mm")}
                          </Button>
                        </motion.div>
                      ))}
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
});

export default Showtimes;
// ==========================================
