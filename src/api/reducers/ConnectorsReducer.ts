import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Connector from "../../interfaces/Connector";

const initialState = {
    data:[] as Connector[] | Connector,
    status: "idle", 
    error : {},
  };

  export const createConnector= createAsyncThunk(
    '/createConnector',
    async ( { createConnector ,token }: {createConnector: Connector | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.post(`http://localhost:3000/connector`, 
      {
        connectorName: createConnector?.connectorName,
        webSite : createConnector?.webSite,
        userId: createConnector?.userId,
      }
      ,{
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
    async ( { id ,token }: {id: string | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`http://localhost:3000/connector/connectors/${id}`,{
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
      const response = await axios.get(`http://localhost:3000/connector/${id}`,{
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
        await axios.put(`http://localhost:3000/connector/${id}`, updateConnector, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
        throw error;
      }
    }
  );

  export const deleteConnector = createAsyncThunk(
    '/deleteConnector',
    async ({ id, token }: { id: string | null | undefined, token: string | null | undefined }, thunkAPI) => {
      try {
        await axios.delete(`http://localhost:3000/connector/${id}`, { headers: { Authorization: `Bearer ${token}` } });
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
    .addCase(deleteConnector.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteConnector.fulfilled, (state) => {
      state.status = 'succeeded';
    })
    .addCase(deleteConnector.rejected, (state, action) => {
      state.error = action.error.message || 'error occurred';
    })
  }
  });

export default connectorsSlice.reducer;