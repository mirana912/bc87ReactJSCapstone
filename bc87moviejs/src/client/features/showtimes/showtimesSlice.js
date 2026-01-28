// src/client/features/showtimes/showtimesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";

const initialState = { items: [], status: "idle", error: undefined };

export const fetchShowtimes = createAsyncThunk(
  "showtimes/fetch",
  async ({ maHeThongRap } = { maHeThongRap: undefined }) => {
    const res = await client.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: { maNhom: "GP01", maHeThongRap },
    });
    return res.data.content || [];
  },
);

const slice = createSlice({
  name: "showtimes",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchShowtimes.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchShowtimes.fulfilled, (s, a) => {
        s.status = "idle";
        const systems = a.payload;
        const map = new Map();
        systems.forEach((sys) => {
          sys.lstCumRap?.forEach((cum) => {
            cum.danhSachPhim?.forEach((p) => {
              if (!map.has(p.maPhim)) {
                map.set(p.maPhim, {
                  maPhim: p.maPhim,
                  tenPhim: p.tenPhim,
                  hinhAnh: p.hinhAnh,
                  lstLichChieuTheoPhim: [],
                });
              }
              const m = map.get(p.maPhim);
              m.lstLichChieuTheoPhim.push(...(p.lstLichChieuTheoPhim || []));
            });
          });
        });
        s.items = Array.from(map.values());
      })
      .addCase(fetchShowtimes.rejected, (s, a) => {
        s.status = "failed";
        s.error = String(a.error?.message || "Error");
      });
  },
});
export default slice.reducer;
// ==========================================
