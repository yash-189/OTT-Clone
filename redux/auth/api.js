import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from '../../firebase';



export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await signInWithEmailAndPassword(email, password);

    console.log("🚀 ~ file: api.js:10 ~ signIn ~ user:", user)

    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await signUpWithEmailAndPassword(email, password);

    console.log("🚀 ~ file: api.js:22 ~ signUp ~ user:", user)

    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
