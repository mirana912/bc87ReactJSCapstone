// src/client/client-pages/Login.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
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

export default function Login() {
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Đăng nhập thành công!");
      nav("/", { replace: true });
    } else {
      toast.error(
        "Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản và mật khẩu.",
      );
    }
  };

  return (
    <Stack alignItems="center" mt={6}>
      <Paper sx={{ p: 3, width: 360 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Đăng nhập
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
              fullWidth
              size="small"
              value={form.taiKhoan}
              onChange={(e) => setForm({ ...form, taiKhoan: e.target.value })}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              size="small"
              value={form.matKhau}
              onChange={(e) => setForm({ ...form, matKhau: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
// ==========================================
