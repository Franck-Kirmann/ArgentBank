import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  token: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null,
  currentUser: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : {},
};

export const login = createAsyncThunk("usersSlice/login", async (userData) => {
  const { data } = await Axios.post(
    "http://localhost:3001/api/v1/user/login",
    userData
  );
  return data.body;
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      sessionStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      sessionStorage.clear();
      console.log(state.error);
    });
  },
});

export default usersSlice.reducer;
