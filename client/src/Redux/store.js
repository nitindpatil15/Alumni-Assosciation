import { configureStore } from '@reduxjs/toolkit';
import postReducer from "./Reducers/postSlice"
import jobReducer from "./Reducers/jobSlice"
import eventReducer from "./Reducers/eventSlice"
import chatReducer from "./Reducers/chatSlice"
import userReducer from "./Reducers/userSlice"

const store = configureStore({
  reducer: {
    post:postReducer,
    job:jobReducer,
    event:eventReducer,
    chat:chatReducer,
    auth:userReducer,
  }
});

export default store;