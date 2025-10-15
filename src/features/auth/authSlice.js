import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';
import { toast } from 'react-toastify';

const userFromLS = localStorage.getItem('user');
const tokenFromLS = localStorage.getItem('token');

const initialState = {
  user: userFromLS ? JSON.parse(userFromLS) : null,
  token: tokenFromLS || null,
  account: null,
  accountStatus: 'idle',
  status: 'idle',
  error: null,
};

export const fetchAccount = createAsyncThunk('auth/fetchAccount', async (_, { rejectWithValue }) => {
  try {
    const res = await client.post('/QuanLyNguoiDung/ThongTinTaiKhoan');
    return res.data.content;  // Trả về thông tin tài khoản
  } catch (err) {
    return rejectWithValue(err.response?.data?.content || 'Không tải được thông tin tài khoản');
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const data = {
      taiKhoan: payload.taiKhoan,
      matKhau: payload.matKhau,
      email: payload.email,
      soDt: payload.soDT,
      maNhom: payload.maNhom || 'GP01',
      maLoaiNguoiDung: payload.maLoaiNguoiDung || 'KhachHang',
      hoTen: payload.hoTen,
    };

    const res = await client.put('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
    toast.success('Cập nhật thông tin thành công!');
    return res.data.content;
  } catch (err) {
    toast.error('Cập nhật thông tin thất bại! Vui lòng thử lại.');
    return rejectWithValue(err.response?.data?.content || 'Cập nhật thất bại');
  }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (payload, { rejectWithValue }) => {
  try {
    const data = {
      taiKhoan: payload.taiKhoan,
      matKhau: payload.matKhau,
      email: payload.email,
      soDt: payload.soDT,
      maNhom: payload.maNhom || 'GP01',
      maLoaiNguoiDung: payload.maLoaiNguoiDung || 'KhachHang',
      hoTen: payload.hoTen,
      matKhauMoi: payload.matKhauMoi,
    };

    const res = await client.put('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
    toast.success('Đổi mật khẩu thành công!');
    return res.data.content;
  } catch (err) {
    toast.error('Đổi mật khẩu thất bại! Vui lòng kiểm tra lại.');
    return rejectWithValue(err.response?.data?.content || 'Đổi mật khẩu thất bại');
  }
});

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await client.post('/QuanLyNguoiDung/DangNhap', payload);
    return res.data.content;
  } catch (err) {
    toast.error('Đăng nhập thất bại! Vui lòng thử lại.');
    return rejectWithValue(err.response?.data?.content || 'Đăng nhập thất bại');
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const data = {
      taiKhoan: (payload.taiKhoan || '').trim(),
      matKhau: payload.matKhau,
      email: (payload.email || '').trim(),
      hoTen: (payload.hoTen || '').trim(),
      maNhom: payload.maNhom || 'GP01',
      soDt: (payload.soDt ?? payload.soDT ?? '').toString().trim(),
    };
    const res = await client.post('/QuanLyNguoiDung/DangKy', data);
    toast.success('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
    return res.data.content;
  } catch (err) {
    toast.error('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.');
    return rejectWithValue(err.response?.data?.content || 'Đăng ký thất bại');
  }
});

// Đăng xuất và thông báo
export const logout = () => (dispatch) => {
  dispatch(clearUser());
  toast.info('Đã đăng xuất!');
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.account = null;
      state.accountStatus = 'idle';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (b) => {
    b
      .addCase(fetchAccount.pending, (s) => { s.accountStatus = 'loading'; s.error = null; })
      .addCase(fetchAccount.fulfilled, (s, a) => {
        s.accountStatus = 'idle';
        s.account = a.payload;
      })
      .addCase(fetchAccount.rejected, (s, a) => { s.accountStatus = 'failed'; s.error = String(a.error?.message); })
      .addCase(updateProfile.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(updateProfile.fulfilled, (s, a) => {
        s.status = 'idle';
        s.account = a.payload;
        s.user = a.payload;
        localStorage.setItem('user', JSON.stringify(a.payload));
      })
      .addCase(updateProfile.rejected, (s, a) => { s.status = 'failed'; s.error = String(a.error?.message); })
      .addCase(changePassword.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(changePassword.fulfilled, (s, a) => {
        s.status = 'idle';
        s.account = a.payload;
        s.user = a.payload;
        localStorage.setItem('user', JSON.stringify(a.payload));
      })
      .addCase(changePassword.rejected, (s, a) => { s.status = 'failed'; s.error = String(a.error?.message); })
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.status = 'idle';
        s.user = a.payload;
        s.token = a.payload.accessToken;
        localStorage.setItem('user', JSON.stringify(a.payload));
        localStorage.setItem('token', a.payload.accessToken);
        toast.success('Đăng nhập thành công!');
      })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = String(a.error?.message); })
      .addCase(register.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(register.fulfilled, (s) => { s.status = 'idle'; })
      .addCase(register.rejected, (s, a) => { s.status = 'failed'; s.error = String(a.error?.message); });
  }
});

export const { clearUser } = slice.actions;
export default slice.reducer;
