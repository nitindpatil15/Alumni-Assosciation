import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"

const host = "http://localhost:5073/api/v1";

export const addEvent = createAsyncThunk("events/addevent", async (data) => {
  const response = await axios.post(`${host}/event/newevent`, data, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
});

export const GetEvent = createAsyncThunk("events/getevent", async (id) => {
  const response = await axios.get(`${host}/event/getbyid/${id}`, {
    withCredentials: true,
  });
  console.log(`Event:`, response.data.data);
  return response.data.data;
});

export const UserRegisterEvent = createAsyncThunk("events/resgister", async ({id,data}) => {
  const response = await axios.post(`${host}/registerevent/register/${id}`, data, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
});

export const RegisteredUserByEventId = createAsyncThunk(
  "event/register/user",
  async (id) => {
    const response = await axios.get(
      `${host}/registerevent/register/user/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const GetAllEvent = createAsyncThunk(
  "events/get-all-event",
  async (id) => {
    const response = await axios.get(`${host}/event/`, {
      withCredentials: true,
    });
    console.log(`Events:`, response.data.data);
    return response.data.data;
  }
);

export const UpdateEvent = createAsyncThunk(
  "events/update-event",
  async ({ id, data }) => {
    const response = await axios.patch(`${host}/event/update/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const DeleteEvent = createAsyncThunk("events/deletevent", async (id) => {
  const response = await axios.delete(`${host}/event/delete/${id}`, {
    withCredentials: true,
  });
  return response.data;
});

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    event: [],
    registeredusers: [],
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
      })
      .addCase(GetEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload;
      })
      .addCase(GetEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetAllEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAllEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(GetAllEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(UpdateEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload;
      })
      .addCase(UpdateEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deleteEvent = action.payload;
      })
      .addCase(DeleteEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(UserRegisterEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserRegisterEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registeredusers = action.payload;
      })
      .addCase(UserRegisterEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(RegisteredUserByEventId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisteredUserByEventId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registeredusers = action.payload;
      })
      .addCase(RegisteredUserByEventId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
