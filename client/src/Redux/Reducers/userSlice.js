import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "js-cookie"

const host = 'http://localhost:5073/api/v1';


export const StudentLogin = createAsyncThunk('user/studentlogin', async (formData) => {
  const response = await axios.post(`${host}/user/auth/student/login`,formData, {
    withCredentials: true 
  });
  return response.data.data;
});

export const AlumniLogin = createAsyncThunk(
  'user/AlumniLogin',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${host}/user/auth/alumni/login`, formData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const AdminLogin = createAsyncThunk(
  'user/AdminLogin',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${host}/user/auth/admin/login`, formData, {
        withCredentials: true,
      });
      Cookies.set("token",response.data.accessToken)
      console.log(response)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const CurrentUser = createAsyncThunk('user/current-user', async () => {
  const response = await axios.get(`${host}/user/auth/user/current-user`, {
    withCredentials: true ,
    headers:{
      Authorization:`Bearer ${Cookies.get("accessToken")}`
    }
  });
  console.log(response.data.data)
  return response.data.data;
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated:null,
    user: null,
    error: null,
    status: 'idle'
  },
  reducers: {
    LogoutUser:  (state) => {
      state.userInfo = null;
      Cookies.remove("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(StudentLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(StudentLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(StudentLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(AlumniLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AlumniLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(AlumniLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(AdminLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = action.payload;
      })
      .addCase(AdminLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(CurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(CurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { LogoutUser } = userSlice.actions;
export default userSlice.reducer;