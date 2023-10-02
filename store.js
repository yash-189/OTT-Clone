import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './redux/movies/movieSlice'
import movieDetailSlice from './redux/movieDetails/movieDetailSlice'
import authSlice from './redux/auth/authSlice'

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    movieDetail: movieDetailSlice,
    auth: authSlice,
  },
})