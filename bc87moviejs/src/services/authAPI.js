import axios from "axios";

const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

export const authAPI = {
  login: async (taiKhoan, matKhau) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/QuanLyNguoiDung/DangNhap`,
        { taiKhoan, matKhau },
        {
          headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.content; // API của CyberSoft trả về dạng { statusCode, content }
    } catch (error) {
      console.error("[authAPI] login error:", error);
      throw error.response?.data?.content || "Đăng nhập thất bại";
    }
  },
};
