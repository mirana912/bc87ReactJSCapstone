// src/client/client-pages/Register.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    hoTen: "",
    soDt: "",
    maNhom: "GP01",
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      nav("/login");
    } else {
      toast.error("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <Stack alignItems="center" mt={6}>
      <Paper sx={{ p: 3, width: 420 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Đăng ký
        </Typography>
        {status === "failed" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={onSubmit}>
          <Stack gap={2}>
            <TextField
              label="Tài khoản"
              size="small"
              value={form.taiKhoan}
              onChange={(e) => setForm({ ...form, taiKhoan: e.target.value })}
            />
            <TextField
              label="Mật khẩu"
              size="small"
              type="password"
              value={form.matKhau}
              onChange={(e) => setForm({ ...form, matKhau: e.target.value })}
            />
            <TextField
              label="Họ tên"
              size="small"
              value={form.hoTen}
              onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
            />
            <TextField
              label="Email"
              size="small"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Số ĐT"
              size="small"
              value={form.soDt}
              onChange={(e) => setForm({ ...form, soDt: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
// ==========================================
