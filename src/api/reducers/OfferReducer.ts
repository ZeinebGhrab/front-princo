import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Offer } from '../../interfaces/Offer';

const initialState = {
  data: [] as Offer [] | null ,
  status: "idle",
  error: {},
};

export const getOffers =createAsyncThunk(
    '/offers',
    async ( {skip, limit, token }: {skip: number, limit: number, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`http://localhost:3000/offer?skip=${skip}&limit=${limit}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        }
      });
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

  export const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getOffers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });

  export default offerSlice.reducer;