import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/authAPI";

// login async
export const login = createAsyncThunk(
  "auth/login",
  async ({ taiKhoan, matKhau }, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(taiKhoan, matKhau);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// register async
export const register = createAsyncThunk(
  "auth/register",
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await authAPI.register(
        newUser.taiKhoan,
        newUser.matKhau,
        newUser.email,
        newUser.soDt,
        newUser.hoTen,
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    token: localStorage.getItem("userToken") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        localStorage.setItem("userToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
