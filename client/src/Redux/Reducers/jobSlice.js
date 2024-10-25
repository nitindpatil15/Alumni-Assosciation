import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:5073/api/v1';

export const addNewJob = createAsyncThunk('jobs/addnew', async (jobData) => {
  const response = await axios.post(`${host}/job/newjob`,jobData,{
    withCredentials: true 
  });
  return response.data.data;
});

export const AllJobs = createAsyncThunk('jobs/allJobs', async () => {
  const response = await axios.get(`${host}/job/all-jobs`, {
    withCredentials: true 
  });
  return response.data.data;
});

export const GetJobbyId = createAsyncThunk('jobs/jobbyId', async (id) => {
  const response = await axios.get(`${host}/job/job/${id}`, {
    withCredentials: true 
  });
  return response.data.data;
});

export const updateJob = createAsyncThunk('jobs/updatejob', async (id,updateData) => {
  const response = await axios.patch(`${host}/job/update/${id}`,updateData, {
    withCredentials: true 
  });
  return response.data.data;
});

export const deleteJob = createAsyncThunk('jobs/deltejob', async (id) => {
  const response = await axios.patch(`${host}/job/delete/${id}`, {
    withCredentials: true 
  });
  return response.data.data;
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    error: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(AllJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AllJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(AllJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(GetJobbyId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetJobbyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(GetJobbyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default jobSlice.reducer;