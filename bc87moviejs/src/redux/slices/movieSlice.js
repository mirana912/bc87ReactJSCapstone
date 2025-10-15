import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://movienew.cybersoft.edu.vn/api/QuanLyPhim";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const res = await axios.get(`${API_BASE}/LayDanhSachPhim`, {
    headers: { TokenCybersoft: TOKEN_CYBERSOFT },
  });
  return res.data.content;
});

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (maPhim) => {
    const res = await axios.delete(`${API_BASE}/XoaPhim?MaPhim=${maPhim}`, {
      headers: { TokenCybersoft: TOKEN_CYBERSOFT },
    });
    return maPhim;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (movie) => movie.maPhim !== action.payload
        );
      });
  },
});

export default movieSlice.reducer;
