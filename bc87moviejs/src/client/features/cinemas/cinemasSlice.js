// src/client/features/auth/bannersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";

const initialState = {
  items: [],
  status: "idle",
  selected: undefined,
  error: undefined,
};

export const fetchCinemaSystems = createAsyncThunk(
  "cinemas/fetch",
  async () => {
    const res = await client.get("/QuanLyRap/LayThongTinHeThongRap");
    return res.data.content;
  },
);

const slice = createSlice({
  name: "cinemas",
  initialState,
  reducers: {
    selectCinema: (s, a) => {
      s.selected = a.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCinemaSystems.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchCinemaSystems.fulfilled, (s, a) => {
        s.status = "idle";
        s.items = a.payload;
      })
      .addCase(fetchCinemaSystems.rejected, (s, a) => {
        s.status = "failed";
        s.error = String(a.error?.message || "Error");
      });
  },
});

export const { selectCinema } = slice.actions;
export default slice.reducer;
// ==========================================
