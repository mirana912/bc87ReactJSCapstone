// src/redux/store.js
// Admin store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import movieReducer from "./slices/movieSlice";

// Client store
import bannersReducer from "../client/features/banners/bannersSlice";
import moviesReducer from "../client/features/movies/moviesSlice";
import cinemasReducer from "../client/features/cinemas/cinemasSlice";
import showtimesReducer from "../client/features/showtimes/showtimesSlice";

export const store = configureStore({
  reducer: {
    // Admin
    auth: authReducer,
    moviesAdmin: movieReducer,

    // Client
    banners: bannersReducer,
    movies: moviesReducer,
    cinemas: cinemasReducer,
    showtimes: showtimesReducer,
  },
});
// ==========================================
