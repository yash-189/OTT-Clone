import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGQxYjQ5OGIzYjMxODE2MTA0ZWEzMjEwNDI1MGI0NCIsInN1YiI6IjYyNjk2YjM1NjRmNzE2MTYwZDBmODgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X9zUsEV94okfrdWhqPmr6ApGoFJULE3DtXZi7NAhW1k',
  },
};

export const fetchMovieDetail = createAsyncThunk(
  'items/fetchMovieDetail',
  async (movieId, { rejectWithValue }) => {

    console.log("🚀 ~ file: api.js:16 ~ movieId:", movieId)

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
      console.log("🚀 details", response)
     
      return response?.data;



    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieTrailer = createAsyncThunk(
  'items/fetchMovieTrailer',
  async (movieId, { rejectWithValue }) => {

    console.log("🚀 ~ file: api.js:30 ~ movieId:", movieId)

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
      console.log("🚀 ~ file: api.js:12 ~ response.data:", response)
      const trailerKey = response?.data?.results[0]?.key; 
      const youtubeURL = `https://www.youtube.com/watch?v=${trailerKey}`;
      return youtubeURL;


    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);