// src/client/client-components/MovieCard.jsx
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import { Link as RouterLink } from "react-router-dom";
import { useRef, useCallback, memo } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import client from "../api/client";

const MovieCard = memo(function MovieCard({ movie }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  }, []);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 800 }}
    >
      <Card
        sx={{
          transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          transition: "transform 120ms ease",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,77,79,.18), transparent 40%)",
            opacity: 0,
            transition: "opacity .2s",
          },
          "&:hover::after": { opacity: 1 },
          "&:hover": {
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            transform:
              "translateY(-8px) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={movie.hinhAnh}
            alt={movie.tenPhim}
            loading="lazy"
            decoding="async"
            sx={{
              aspectRatio: "2/3",
              objectFit: "cover",
              filter: "brightness(0.95)",
              transition: "filter 0.3s ease",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Image";
            }}
          />

          {/* Overlay for play button */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                background: "rgba(255,255,255,0.9)",
                color: "black",
                borderRadius: 25,
                px: 3,
                "&:hover": {
                  background: "white",
                  transform: "scale(1.05)",
                },
              }}
            >
              Trailer
            </Button>
          </Box>

          {/* Rating Badge */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.8)",
              borderRadius: 2,
              px: 1,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <StarIcon sx={{ fontSize: 14, color: "#ffd700" }} />
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: 700 }}
            >
              {movie.danhGia || "N/A"}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            noWrap
            sx={{
              mb: 1,
              fontSize: "1rem",
              lineHeight: 1.2,
            }}
          >
            {movie.tenPhim}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={movie.danhGia ? movie.danhGia / 2 : 0}
              readOnly
              precision={0.5}
              size="small"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              ({movie.danhGia || 0})
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 2,
              fontSize: "0.875rem",
              lineHeight: 1.4,
            }}
          >
            {movie.moTa}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {movie.hot && (
              <Chip
                label="Hot"
                size="small"
                sx={{
                  background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                }}
              />
            )}
            {movie.dangChieu && (
              <Chip
                label="Đang Chiếu"
                size="small"
                sx={{
                  background: "linear-gradient(45deg, #4caf50, #81c784)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                }}
              />
            )}
          </Box>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            component={RouterLink}
            to={`/detail/${movie.maPhim}`}
            onMouseEnter={() => {
              client.get("/QuanLyPhim/LayThongTinPhim", {
                params: { maPhim: movie.maPhim },
                cacheTTL: 5 * 60 * 1000,
              });
              import("../pages/Detail");
            }}
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
              borderRadius: 25,
              py: 1.5,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(255,107,107,0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #ff5252, #ff8c00)",
                boxShadow: "0 6px 20px rgba(255,107,107,0.5)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Đặt Vé Ngay
          </Button>
        </Box>
      </Card>
    </div>
  );
});

export default MovieCard;
// ==========================================
