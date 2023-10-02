import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./api";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});



export default authSlice.reducer;

export const selectAuthStatus = (state) => state.auth.status;
