import { configureStore } from '@reduxjs/toolkit';
import bannersReducer from '../features/banners/bannersSlice';
import moviesReducer from '../features/movies/moviesSlice';
import cinemasReducer from '../features/cinemas/cinemasSlice';
import showtimesReducer from '../features/showtimes/showtimesSlice';
import authReducer from '../features/auth/authSlice';


export const store = configureStore({
reducer: {
banners: bannersReducer,
movies: moviesReducer,
cinemas: cinemasReducer,
showtimes: showtimesReducer,
auth: authReducer,
},
});