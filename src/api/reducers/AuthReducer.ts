import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import AuthState from '../../interfaces/user/AuthState';
import { typeState } from '@piximind/custom-hook/lib/esn/interfaces';

const initialState = {
  data: {} as AuthState | null ,
  auth: false,
  status: "idle",
  error: {},
};
export const authenticateUser = createAsyncThunk(
    'auth/login',
    async ( { email, password,rememberMe }: { email: string, password: string, rememberMe: boolean } , thunkAPI ) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, 
      { email, password, rememberMe },
      );
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

  export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
    try{
       await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`);
    }
    catch(error){
      return error;
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/signup`, { firstName,lastName,email,password});
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/verify`, { token});
      thunkAPI.dispatch(setData(response.data));
      console.log(response.data);
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
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/forgotPassword`,{email});
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/resetPassword`,{email: email, password: password});
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
    name: 'authentication',
    initialState,
    reducers: {
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
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(logout.rejected, (state, action) => {
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
  
  export const {setData} = authentificationSlice.actions;
  export default authentificationSlice.reducer;