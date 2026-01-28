// src/client/client-components/BannerCarrousel.jsx
import { useEffect, useRef, useMemo, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../features/banners/bannersSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const BannerCarousel = memo(function BannerCarousel() {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((s) => s.banners);

  useEffect(() => {
    if (!items.length) dispatch(fetchBanners());
  }, [dispatch, items.length]);

  const swiperRef = useRef(null);
  const wrapRef = useRef(null);

  const itemsMemo = useMemo(() => items, [items]);
  const statusMemo = useMemo(() => status, [status]);

  const onSwiper = useCallback((swiper) => {
    swiperRef.current = swiper;
  }, []);

  const onPlayTrailer = useCallback((trailer) => {
    window.open(trailer, "_blank");
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const swiper = swiperRef.current;
        if (!swiper?.autoplay) return;
        entry.isIntersecting ? swiper.autoplay.start() : swiper.autoplay.stop();
      },
      { threshold: 0.25 },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [itemsMemo.length]);

  // Skeleton loading when data is not loaded
  if (statusMemo === "loading" && !itemsMemo.length) {
    return (
      <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Skeleton variant="rectangular" height={420} />
      </Box>
    );
  }

  return (
    <Box
      ref={wrapRef}
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        onSwiper={onSwiper}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".banner-next",
          prevEl: ".banner-prev",
        }}
        pagination={{
          el: ".banner-pagination",
          clickable: true,
          dynamicBullets: true,
        }}
        loop={itemsMemo.length > 1}
        spaceBetween={0}
        slidesPerView={1}
        style={{ borderRadius: 16 }}
      >
        {itemsMemo.map((b) => (
          <SwiperSlide key={b.maBanner}>
            <Card
              sx={{
                position: "relative",
                borderRadius: 0,
                overflow: "hidden",
                height: { xs: 280, md: 500 },
              }}
            >
              <CardMedia
                component="img"
                image={b.hinhAnh || "https://via.placeholder.com/800x400"} // Fallback image
                alt={b.tenPhim ?? "banner"}
                loading="lazy"
                decoding="async"
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.9)",
                  transition: "filter 0.3s ease",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=No+Image";
                }}
              />

              {/* Enhanced Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
                  backdropFilter: "blur(1px)",
                }}
              />

              {/* Content Container */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  px: { xs: 3, md: 6 },
                  py: 4,
                }}
              >
                <Box sx={{ maxWidth: { xs: "100%", md: "50%" }, zIndex: 2 }}>
                  {b.tenPhim && (
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        mb: 2,
                        background:
                          "linear-gradient(45deg, #ffffff 0%, #f0f0f0 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        fontSize: { xs: "1.8rem", md: "3rem" },
                        lineHeight: 1.1,
                      }}
                    >
                      {b.tenPhim}
                    </Typography>
                  )}

                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      mb: 3,
                      fontWeight: 400,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    Khám phá bộ phim bom tấn đang chiếu tại hệ thống rạp CGV
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {!!b.trailer && (
                      <Button
                        variant="contained"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => onPlayTrailer(b.trailer)}
                        sx={{
                          background:
                            "linear-gradient(45deg, #ff6b6b, #ffa500)",
                          borderRadius: 25,
                          px: 4,
                          py: 1.5,
                          fontWeight: 700,
                          fontSize: "1rem",
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(255,107,107,0.4)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #ff5252, #ff8c00)",
                            boxShadow: "0 12px 35px rgba(255,107,107,0.5)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Xem Trailer
                      </Button>
                    )}

                    <Button
                      component={RouterLink}
                      to="/showtimes"
                      variant="outlined"
                      sx={{
                        borderColor: "rgba(255,255,255,0.8)",
                        color: "white",
                        borderRadius: 25,
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                        backdropFilter: "blur(10px)",
                        background: "rgba(255,255,255,0.1)",
                        "&:hover": {
                          borderColor: "#ff6b6b",
                          background: "rgba(255,107,107,0.2)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(255,107,107,0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Đặt Vé Ngay
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <IconButton
        className="banner-prev"
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.2)",
          "&:hover": {
            background: "rgba(255,107,107,0.8)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.3s ease",
          width: 48,
          height: 48,
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <IconButton
        className="banner-next"
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.2)",
          "&:hover": {
            background: "rgba(255,107,107,0.8)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.3s ease",
          width: 48,
          height: 48,
        }}
      >
        <NavigateNextIcon />
      </IconButton>

      {/* Custom Pagination */}
      <Box
        className="banner-pagination"
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          "& .swiper-pagination-bullet": {
            background: "rgba(255,255,255,0.5)",
            opacity: 0.7,
            width: 12,
            height: 12,
            margin: "0 4px",
            transition: "all 0.3s ease",
          },
          "& .swiper-pagination-bullet-active": {
            background: "#ff6b6b",
            opacity: 1,
            transform: "scale(1.2)",
          },
        }}
      />
    </Box>
  );
});

export default BannerCarousel;
// ==========================================
