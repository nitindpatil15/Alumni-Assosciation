import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const host = "http://localhost:5073/api/v1";

export const addEvent = createAsyncThunk("events/addevent", async (data) => {
    const response = await axios.post(`${host}/event/newevent`,data,{
        withCredentials:true
    })
    return response.data;
});

export const GetEvent = createAsyncThunk("events/getevent", async (id) => {
  const response = await axios.post(`${host}/event/getbyid/${id}`,{
      withCredentials:true
  })
  return response.data;
});

export const GetAllEvent = createAsyncThunk("events/get-all-event", async (id) => {
  const response = await axios.post(`${host}/event/`,{
      withCredentials:true
  })
  return response.data;
});

export const UpdateEvent = createAsyncThunk("events/update-event", async (id,data) => {
  const response = await axios.post(`${host}/event/update/${id}`,data,{
      withCredentials:true
  })
  return response.data;
});

export const DeleteEvent = createAsyncThunk("events/deletevent", async (id) => {
  const response = await axios.post(`${host}/event/delete/${id}`,{
      withCredentials:true
  })
  return response.data;
});

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
