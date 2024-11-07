import { configureStore } from '@reduxjs/toolkit';
import postReducer from "./Reducers/postSlice"
import jobReducer from "./Reducers/jobSlice"
import eventReducer from "./Reducers/eventSlice"
import chatReducer from "./Reducers/chatSlice"

const store = configureStore({
  reducer: {
    post:postReducer,
    job:jobReducer,
    event:eventReducer,
    chat:chatReducer
  }
});

export default store;