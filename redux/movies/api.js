import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGQxYjQ5OGIzYjMxODE2MTA0ZWEzMjEwNDI1MGI0NCIsInN1YiI6IjYyNjk2YjM1NjRmNzE2MTYwZDBmODgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X9zUsEV94okfrdWhqPmr6ApGoFJULE3DtXZi7NAhW1k',
  },
};

export const fetchMovies = createAsyncThunk(
  'items/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
      console.log("🚀 ~ file: api.js:12 ~ response.data:", response)
      return response.data?.results;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGenre = createAsyncThunk(
  'items/fetchGenre',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
      console.log("🚀 ~ fgeee", response)
      return response.data?.genres;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchPopularMovies = createAsyncThunk(
  'items/fetchPopularMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      console.log("🚀 ~ fgeee", response)
      return response.data?.results;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchTopRatedMovies = createAsyncThunk(
  'items/fetchTopRatedMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      console.log("🚀 ~ fgeee", response)
      return response.data?.results;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUpcomingMovies = createAsyncThunk(
  'items/fetchUpcomingMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      console.log("🚀 ~ fgeee", response)
      return response.data?.results;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieByName = createAsyncThunk(
  'items/fetchMovieByName',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
      console.log("search", response)
      return response.data?.results;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
