import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import User from "../../interfaces/user/User";

const initialState = {
    data:{} as User ,
    status: "idle", 
    error : {},
  };

  export const getUser = createAsyncThunk(
    '/getUser',
    async ( { id ,token }: {id: string | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`http://localhost:3000/users/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    catch(error){
      if (error instanceof AxiosError && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } 
      throw error;
    }
    }
  );


  export const updateUser = createAsyncThunk(
    '/updateUser',
    async ({ id, updateUser, token }: { id: string | null | undefined, updateUser: Partial<User> | null | undefined, token: string | null | undefined }, thunkAPI) => {
      try {
        await axios.put(`http://localhost:3000/users/${id}`, updateUser, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
        throw error;
      }
    }
  );
  
  export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
});

export default profileSlice.reducer;