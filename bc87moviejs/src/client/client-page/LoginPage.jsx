import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate("/");
    } catch (err) {
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input name="taiKhoan" placeholder="Tài khoản" onChange={handleChange} />
      <input
        name="matKhau"
        type="password"
        placeholder="Mật khẩu"
        onChange={handleChange}
      />
      <button disabled={loading}>Đăng nhập</button>
      {error && <p style={{ color: "red" }}>{error.toString()}</p>}
    </form>
  );
}
