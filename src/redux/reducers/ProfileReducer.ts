import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import User from "../../interfaces/User";
import SignUser from "../../interfaces/SignUser";

const initialState = {
    data:[] as User[],
    status: "idle", 
    error : {},
  };

export const createUser = createAsyncThunk(
    'auth/login',
    async ( { user, token }: { user: SignUser, token: string | null | undefined } , thunkAPI ) => {
    try{
      await axios.post('http://localhost:5000/users', { 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const deleteUser = createAsyncThunk(
  '/deleteUser',
  async({id, token} : {id: string | null | undefined, token: string | null | undefined}, thunkAPI)=>{
    try {
      await axios.delete(`http://localhost:5000/users/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
    catch(error) {
      if (error instanceof AxiosError && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } 
      throw error;
    }
  });

  export const updateUser = createAsyncThunk(
    '/updateUser',
    async({user, token} : {user : User | null, token: string | null | undefined },thunkAPI) => {
      try {
        await axios.put(`http://localhost:5000/users/${user?._id}`,
        {firstName: user?.firstName, email : user?.email, password :user?.password},{
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

  export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message || 'error occurred';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteUser.rejected, (state, action) => {
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