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
    }
    catch(err){
      console.log(err);
      if (err instanceof AxiosError && err.response) {
        return thunkAPI.rejectWithValue(err.response.data);
      } 
    }
    }
  );
  
  export const authentificationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logOut: (state) => {
        state.data = null;

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