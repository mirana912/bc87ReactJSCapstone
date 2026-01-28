import axios from "axios";

const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const userService = {
  getAll: (keyword = "") =>
    api.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?tuKhoa=${keyword}`),
  add: (data) => api.post(`/QuanLyNguoiDung/ThemNguoiDung`, data),
  update: (data) => api.post(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data),
  delete: (taiKhoan) =>
    api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`),
};
// ==========================================
