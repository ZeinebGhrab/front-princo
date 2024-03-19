import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import InvoiceDetails from "../../interfaces/InvoiceDetails";

const initialState = {
    data:{} as InvoiceDetails ,
    status: "idle", 
    error : {},
  };

export const getInvoiceDetails = createAsyncThunk(
    '/getInvoiceDetails',
    async ( { id ,token }: {id: string | null | undefined ,token: string | null | undefined } , thunkAPI ) => {
    try{
      const response = await axios.get(`http://localhost:5000/users/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  export const updateInvoiceDetails = createAsyncThunk(
    '/updateInvoiceDetails',
    async({invoice , token} : {invoice : InvoiceDetails | null, token: string | null | undefined },thunkAPI) => {
      try {
        await axios.put(`http://localhost:5000/users/${invoice?._id}`,
        {
            legalName: invoice?.legalName,
            mat : invoice?.mat,
            adr :invoice?.adr,
            country : invoice?.country,
            city : invoice?.city,
            postalCode : invoice?.postalCode
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      catch(error) {
        if (error instanceof AxiosError && error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        } 
        throw error;
      }

    }
  )
  export const invoiceSlice = createSlice({
    name: 'invocieDetails',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getInvoiceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInvoiceDetails.fulfilled, (state , action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getInvoiceDetails.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(updateInvoiceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateInvoiceDetails.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateInvoiceDetails.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
    }
})
export default invoiceSlice.reducer;