import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Invoice from '../../interfaces/Invoice';
import download from 'downloadjs';

const initialState = {
  data: [] as Invoice [] | null ,
  status: "idle",
  error: {},
};

export const getInvoices =createAsyncThunk(
    '/invoices',
    async ( {id, skip, limit, token }: {id: string | null | undefined,skip: number, limit: number, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/invoice/${id}?skip=${skip}&limit=${limit}`, {
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

  export const downloadInvoice =createAsyncThunk(
    '/downloadInvoice',
    async ( {id,ref, token }: {id: string | null | undefined,ref: string | null | undefined ,token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/invoice/download/${id}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      download(response.data, `'Facture${ref}.pdf`, 'application/pdf');
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

  export const openInvoice =createAsyncThunk(
    '/openInvoice',
    async ( {id, token }: {id: string | null | undefined, token : string | undefined | null} , thunkAPI ) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/invoice/open/${id}`, {
        headers : {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const pdfUrl = URL.createObjectURL(response.data);
      window.open(pdfUrl, '_blank');
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

  export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error={}
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(downloadInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downloadInvoice.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(downloadInvoice.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(openInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(openInvoice.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error={}
      })
      .addCase(openInvoice.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
  });

  export default invoiceSlice.reducer;