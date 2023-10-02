import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetail, fetchMovieTrailer } from './api'; 



const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState:{
    movieDetail: [],
    trailerLink: null ,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieTrailer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieTrailer.fulfilled, (state, action) => {
        state.trailerLink = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchMovieTrailer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     
  },
});




export default movieDetailSlice.reducer;


export const selectmovieDetail = (state) => state.movieDetail.movieDetail;
export const selectmovieTrailerLink = (state) => state.movieDetail.trailerLink;
export const selectmovieDetailStatus = (state) => state.movieDetail.status;
export const selectmovieDetailError = (state) => state.movieDetail.error;