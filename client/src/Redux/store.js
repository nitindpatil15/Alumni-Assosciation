import { configureStore } from '@reduxjs/toolkit';
import postReducer from "./Reducers/postSlice"
import jobReducer from "./Reducers/jobSlice"
import eventReducer from "./Reducers/eventSlice"

const store = configureStore({
  reducer: {
    post:postReducer,
    job:jobReducer,
    event:eventReducer
  }
});

export default store;