// src/client/features/movies/moviesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";

const initialState = { items: [], status: "idle", error: undefined };

export const fetchMovies = createAsyncThunk("movies/fetch", async () => {
  const res = await client.get("/QuanLyPhim/LayDanhSachPhim", {
    params: { MaNhom: "GP01" },
  });
  return res.data.content;
});

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMovies.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchMovies.fulfilled, (s, a) => {
        s.status = "idle";
        s.items = a.payload;
      })
      .addCase(fetchMovies.rejected, (s, a) => {
        s.status = "failed";
        s.error = String(a.error?.message || "Error");
      });
  },
});
export default slice.reducer;
// ==========================================
