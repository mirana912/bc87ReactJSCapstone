import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';


const initialState = { items: [], status: 'idle', error: undefined };


export const fetchBanners = createAsyncThunk('banners/fetch', async () => {
const res = await client.get('/QuanLyPhim/LayDanhSachBanner');
return res.data.content;
});


const slice = createSlice({
name: 'banners',
initialState,
reducers: {},
extraReducers: (b) => {
b.addCase(fetchBanners.pending, (s)=>{ s.status='loading'; })
.addCase(fetchBanners.fulfilled, (s,a)=>{ s.status='idle'; s.items=a.payload; })
.addCase(fetchBanners.rejected, (s,a)=>{ s.status='failed'; s.error=String(a.error?.message||'Error'); });
}
});
export default slice.reducer;