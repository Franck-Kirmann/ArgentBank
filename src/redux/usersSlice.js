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

export const getUser = createAsyncThunk(
  "usersSlice/getUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().users.token;

    const { data } = await Axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data.body);
    return data.body;
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("logout");
      sessionStorage.clear();
      state.token = null;
      state.currentUser = {};
    },
  },

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

    builder.addCase(getUser.fulfilled, (state, action) => {
      // sessionStorage.setItem("token", action.payload.token);
      state.currentUser = action.payload;
      state.error = null;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      sessionStorage.clear();
      console.log(state.error);
    });
  },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
