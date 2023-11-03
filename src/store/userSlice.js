import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  allUser,
  editUser,
  getsingleuser,
  login,
  register,
  searchUser,
} from "../api/userapi";

export const registerAsync = createAsyncThunk(
  "user/register",
  async (formData) => {
    try {
      const data = await register(formData);
      localStorage.setItem("token", data?.token);
      localStorage.setItem("userId", data?.user?._id);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const loginAsync = createAsyncThunk("user/login", async (formData) => {
  try {
    const data = await login(formData);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("userId", data?.user?._id);
    return data;
  } catch (e) {
    return e.response.data;
  }
});

export const getSingleUserAsync = createAsyncThunk(
  "user/singleuser",
  async (id) => {
    try {
      const data = await getsingleuser(id);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const editUserAsync = createAsyncThunk(
  "user/edituser",
  async (formData) => {
    try {
      const data = await editUser(formData);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getSearchAsync = createAsyncThunk(
  "user/searchuser",
  async (name) => {
    try {
      const data = await searchUser(name);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getAllUserAsync = createAsyncThunk("user/alluser", async () => {
  try {
    const data = await allUser();
    return data;
  } catch (e) {
    return e.response.data;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    singleUser: {},
    error: "",
    searchUsers: [],
    userLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getSingleUserAsync.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(getSingleUserAsync.fulfilled, (state, action) => {
      state.userLoading = false;
      state.singleUser = action.payload;
    });

    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getAllUserAsync.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(getSearchAsync.pending, (state, action) => {
      state.userLoading = true;
    });

    builder.addCase(getAllUserAsync.fulfilled, (state, action) => {
      state.userLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getSearchAsync.fulfilled, (state, action) => {
      state.userLoading = false;
      state.searchUsers = action.payload;
    });
  },
});

export default userSlice.reducer;
