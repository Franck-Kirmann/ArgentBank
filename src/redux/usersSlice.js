import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  token: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null,
  currentUser: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : {},

  rememberMe: false,
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
  async (_, { getState }) => {
    const token = getState().users.token;

    const { data } = await Axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data.body);
    return data.body;
  }
);

export const updateUser = createAsyncThunk(
  "usersSlice/updateUser",
  async (userName, { getState }) => {
    console.log(userName);
    const token = getState().users.token;

    const { data } = await Axios.put(
      "http://localhost:3001/api/v1/user/profile",
      userName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data.body);
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

    setRememberMe: (state, action) => {
      console.log(action.payload);
      state.rememberMe = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (state.rememberMe) {
        sessionStorage.setItem("token", action.payload.token);
      }
      state.token = action.payload.token;
      state.error = null;
    });

    builder.addCase(login.rejected, (state) => {
      sessionStorage.clear();
      alert("Invalid username or password");
      console.log(state.error);
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      if (state.rememberMe) {
        sessionStorage.setItem("user", JSON.stringify(action.payload));
      }
      state.currentUser = action.payload;
      state.error = null;
    });

    builder.addCase(getUser.rejected, (state) => {
      sessionStorage.clear();
      console.log(state.error);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      // sessionStorage.setItem("token", action.payload.token);
      state.currentUser = action.payload;
      state.error = null;
    });

    builder.addCase(updateUser.rejected, (state) => {
      sessionStorage.clear();
      console.log(state.error);
    });
  },
});

export const { logout, setRememberMe } = usersSlice.actions;
export default usersSlice.reducer;
