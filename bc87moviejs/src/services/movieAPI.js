import axiosClient from "./axiosClient";

export const movieAPI = {
  getMovies: () => axiosClient.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"),

  getMovieDetail: (id) =>
    axiosClient.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),
};
