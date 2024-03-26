import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Connector from "../../interfaces/Connector";

const initialState = {
    data:[] as Connector[],
    status: "idle", 
    error : {},
  };

  export const createConnector= createAsyncThunk(
    '/createConnector',
    async ( { createConnector ,token }: {id : string | null | undefined, createConnector: Connector | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.post(`http://localhost:3000/printers`, {createConnector},{
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

  export const getConnectors= createAsyncThunk(
    '/getConnectors',
    async ( { token }: {id: string | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`http://localhost:3000/printers}`,{
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

  export const getConnector= createAsyncThunk(
    '/getConnector',
    async ( {id ,token }: {id: string | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`http://localhost:3000/printers/${id}}`,{
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


  export const updateConnector = createAsyncThunk(
    '/updateConnector',
    async ({ id, updateConnector, token }: { id: string | null | undefined, updateConnector: Connector| null | undefined, token: string | null | undefined }, thunkAPI) => {
      try {
        await axios.put(`http://localhost:3000/printers/${id}`, updateConnector, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
        throw error;
      }
    }
  );


  
  export const connectorsSlice = createSlice({
    name: 'connectors',
    initialState,
    reducers: {
      setData: (state,action)=>{
        state.data= action.payload;
       }
    },
    extraReducers: (builder) => {
      builder
      .addCase(createConnector.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createConnector.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createConnector.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(getConnector.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getConnector.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getConnector.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(getConnectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getConnectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getConnectors.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(updateConnector.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateConnector.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateConnector.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
});

export default connectorsSlice.reducer;