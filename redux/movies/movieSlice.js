import { createSlice } from '@reduxjs/toolkit';
import { fetchGenre, fetchMovieByName, fetchMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from './api';



const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    genres: [],
    popularMovies: [],
    upcomingMovies: [],
    topRatedMovies: [],
    status: 'idle',
    search: {
      status: 'idle',
      result: [],
      error: null
    },
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchGenre.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        // Converting the array of genres to an object with genre IDs as keys and names as values
        state.genres = action.payload.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchGenre.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieByName.pending, (state) => {
        state.search.status = 'loading';
        state.search.error = null;
      })
      .addCase(fetchMovieByName.fulfilled, (state, action) => {
        state.search.result = action.payload
        state.search.status = 'succeeded';
        state.search.error = null;
      })
      .addCase(fetchMovieByName.rejected, (state, action) => {
        state.search.status = 'failed';
        state.search.error = action.error.message;
      })
  },
});




export default movieSlice.reducer;


export const selectMovies = (state) => state.movie.movies;
export const selectTopRatedMovies = (state) => state.movie.topRatedMovies;
export const selectUpcomingMovies = (state) => state.movie.upcomingMovies;
export const selectPopularMovies = (state) => state.movie.popularMovies;
export const selectGenre = (state) => state.movie.genres;
export const selectMoviesStatus = (state) => state.movie.status;
export const selectMoviesError = (state) => state.movie.error;
export const selectSearchMovies = (state) => state.movie.search;