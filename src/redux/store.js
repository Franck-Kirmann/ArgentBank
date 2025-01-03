import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    users: useReducer,
  },
});

export default store;
