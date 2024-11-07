import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import socket from '../../socket';

const HOST = 'http://localhost:5073/api/v1/chat';

// Async action to fetch messages
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${HOST}/${receiverId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Action for real-time incoming messages
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    sendMessage: (state, action) => {
      socket.emit('sendMessage', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { receiveMessage, sendMessage } = chatSlice.actions;

// Export the reducer
export default chatSlice.reducer;
