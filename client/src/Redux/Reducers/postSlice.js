import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = 'http://localhost:5073/api/v1';

export const addNewpost = createAsyncThunk('posts/addnew', async (postData) => {
  const response = await axios.post(`${host}/post/newpost`,postData,{
    withCredentials: true 
  });
  return response.data.data;
});

export const Allposts = createAsyncThunk('posts/allposts', async () => {
  const response = await axios.get(`${host}/post/all-posts`, {
    withCredentials: true 
  });
  return response.data.data;
});

export const GetuserPosts = createAsyncThunk('posts/user/all-posts', async () => {
  const response = await axios.get(`${host}/post/user/all-posts`, {
    withCredentials: true 
  });
  return response.data.data;
});

export const updatepost = createAsyncThunk('posts/updatepost', async (id,updateData) => {
  const response = await axios.patch(`${host}/post/update-post/${id}`,updateData, {
    withCredentials: true 
  });
  return response.data.data;
});

export const deletepost = createAsyncThunk('posts/deltepost', async (id) => {
  const response = await axios.patch(`${host}/post/delete-post/${id}`, {
    withCredentials: true 
  });
  return response.data.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    error: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewpost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewpost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(addNewpost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(Allposts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Allposts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(Allposts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(GetuserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetuserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(GetuserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatepost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatepost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(updatepost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletepost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletepost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(deletepost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default postSlice.reducer;