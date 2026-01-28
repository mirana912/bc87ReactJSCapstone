import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(form));
    alert("Đăng ký thành công");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <input name="taiKhoan" onChange={handleChange} placeholder="Tài khoản" />
      <input
        name="matKhau"
        type="password"
        onChange={handleChange}
        placeholder="Mật khẩu"
      />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="soDt" onChange={handleChange} placeholder="Số điện thoại" />
      <input name="hoTen" onChange={handleChange} placeholder="Họ và tên" />
      <button>Đăng ký</button>
    </form>
  );
}
