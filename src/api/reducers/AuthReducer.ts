import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import AuthState from '../../interfaces/AuthState';

const initialState = {
  data: {} as AuthState | null ,
  auth: false,
  status: "idle",
  error: {},
};
export const authenticateUser = createAsyncThunk(
    'auth/login',
    async ( { email, password }: { email: string, password: string } , thunkAPI ) => {
    try{
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      thunkAPI.dispatch(setData(response.data));
      console.log(response.data)
    }
    catch(error){
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
    }
  );
  
  export const authentificationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logOut: (state) => {
        state.data = null;
        state.auth = false;

      },
     setData: (state,action)=>{
      state.data= action.payload;
      state.auth = true;
     }
    },
    extraReducers: (builder) => {
      builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });
  
  export const { logOut, setData} = authentificationSlice.actions;
  export default authentificationSlice.reducer;