import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import AuthState from '../../interfaces/AuthState';
import { typeState } from '@piximind/custom-hook/lib/esn/interfaces';

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
    catch(error){
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
    }
  );

  export const signup = createAsyncThunk(
    '/signup',
    async ( { firstName , lastName, email, password }: 
      { firstName :  typeState | undefined , 
        lastName :  typeState | undefined,
        email :  typeState | undefined,
        password :  typeState | undefined} 
        , thunkAPI ) => {
    try{
      const response = await axios.post('http://localhost:3000/users/signup', { firstName,lastName,email,password});
      thunkAPI.dispatch(setData(response.data));
      return response.data;
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

  export const validate =createAsyncThunk(
    '/validate',
    async ( {token }: { token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.post('http://localhost:3000/users/verify', { token});
      thunkAPI.dispatch(setData(response.data));
      return response.data;
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

  export const forgetPassword =createAsyncThunk(
    '/forgetPassword',
    async ( { email }: { email : string | undefined | null} , thunkAPI ) => {
    try{
      await axios.post('http://localhost:3000/users/forgotPassword',{email});
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

  export const resetPassword =createAsyncThunk(
    '/resetPassword',
    async ( { email, password }: { email : string | undefined | null, password:string | undefined | null } , thunkAPI ) => {
    try{
      const response = await axios.post('http://localhost:3000/users/resetPassword',{email: email, password: password});
      console.log(response.data)
      thunkAPI.dispatch(setData(response.data));
      return response.data;
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
        state.error={}

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
        state.error={}
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(validate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validate.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(validate.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(forgetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload
        state.error={}
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });
  
  export const { logOut, setData} = authentificationSlice.actions;
  export default authentificationSlice.reducer;