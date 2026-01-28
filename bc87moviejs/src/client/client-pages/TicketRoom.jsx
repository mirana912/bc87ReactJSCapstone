// src/client/client-pages/TicketRoom.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAccount } from "../features/auth/authSlice";
import client from "../api/client";
import { Button, Chip, Stack, Typography, Divider, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TicketRoom() {
  const { maLichChieu } = useParams();
  const [room, setRoom] = useState(null); // { thongTinPhim, danhSachGhe }
  const [picked, setPicked] = useState({}); // { [maGhe]: seat }
  // Trạng thái đặt vé đã bị loại bỏ vì không sử dụng
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu sơ đồ ghế từ API
    (async () => {
      try {
        const res = await client.get("/QuanLyDatVe/LayDanhSachPhongVe", {
          params: { MaLichChieu: maLichChieu },
        });
        setRoom(res.data.content); // Lưu thông tin phòng vé
      } catch {
        toast.error("Không tải được sơ đồ ghế.");
      }
    })();
  }, [maLichChieu]);

  const total = Object.values(picked).reduce((s, g) => s + (g.giaVe || 0), 0);

  const toggleSeat = (g) => {
    if (g.daDat) return; // Nếu ghế đã được đặt, không cho chọn
    setPicked((prev) => {
      const cp = { ...prev };
      if (cp[g.maGhe])
        delete cp[g.maGhe]; // Nếu ghế đã chọn, bỏ chọn
      else cp[g.maGhe] = g; // Nếu ghế chưa chọn, thêm vào
      return cp;
    });
  };

  const book = async () => {
    const danhSachVe = Object.values(picked).map((g) => ({
      maGhe: g.maGhe,
      giaVe: g.giaVe,
    }));
    if (danhSachVe.length === 0) {
      toast.info("Chọn ít nhất 1 ghế.");
      return;
    }

    try {
      // Đặt vé
      await client.post("/QuanLyDatVe/DatVe", { maLichChieu, danhSachVe });
      toast.success("Đặt vé thành công!");

      // Cập nhật lại thông tin vé đã đặt
      dispatch(fetchAccount());
      setPicked({}); // Reset trạng thái ghế đã chọn

      // Chuyển tới trang Vé của tôi
      nav("/profile");
    } catch {
      toast.error("Đặt vé thất bại. Hãy đăng nhập lại nếu token hết hạn.");
    }
  };

  if (!room) return null;

  return (
    <Stack gap={2}>
      <Typography variant="h5" fontWeight={700}>
        Đặt vé
      </Typography>
      <Typography color="text.secondary">
        {room.thongTinPhim?.tenCumRap} — {room.thongTinPhim?.tenRap} —{" "}
        {room.thongTinPhim?.tenPhim}
      </Typography>

      <Box
        sx={{
          p: 2,
          border: "1px dashed rgba(255,255,255,0.2)",
          borderRadius: 2,
          maxWidth: 900,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2, opacity: 0.7 }}>Màn hình</Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(16, 1fr)",
            gap: 0.5,
          }}
        >
          {room.danhSachGhe?.map((g) => {
            const selected = !!picked[g.maGhe];
            const sold = g.daDat;
            const vip = g.loaiGhe?.toLowerCase() === "vip";
            return (
              <Button
                key={g.maGhe}
                onClick={() => toggleSeat(g)}
                size="small"
                sx={{
                  minWidth: 0,
                  height: 32,
                  fontSize: 12,
                  bgcolor: sold
                    ? "grey.700"
                    : selected
                      ? "primary.main"
                      : vip
                        ? "warning.dark"
                        : "grey.900",
                  opacity: sold ? 0.5 : 1,
                  color: "white",
                  "&:hover": {
                    bgcolor: sold
                      ? "grey.700"
                      : selected
                        ? "primary.dark"
                        : vip
                          ? "warning.main"
                          : "grey.800",
                  },
                }}
                disabled={sold}
                title={`${g.tenGhe} - ${vip ? "VIP" : "Thường"} - ${g.giaVe?.toLocaleString()}đ`}
              >
                {g.tenGhe}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Stack direction="row" gap={1} alignItems="center">
        <Chip size="small" label="Thường" sx={{ bgcolor: "grey.900" }} />
        <Chip size="small" label="VIP" sx={{ bgcolor: "warning.dark" }} />
        <Chip
          size="small"
          label="Đã bán"
          sx={{ bgcolor: "grey.700", opacity: 0.6 }}
        />
        <Chip size="small" label="Đang chọn" sx={{ bgcolor: "primary.main" }} />
      </Stack>

      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        maxWidth={900}
      >
        <Typography>
          Tổng: <b>{total.toLocaleString()}đ</b> — Ghế:{" "}
          {Object.values(picked)
            .map((g) => g.tenGhe)
            .join(", ") || "Chưa chọn"}
        </Typography>
        <Button variant="contained" onClick={book}>
          Đặt vé
        </Button>
      </Stack>
    </Stack>
  );
}
// ==========================================
