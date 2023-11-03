import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPost,
  editPost,
  getPost,
  getSinglePost,
  getfollowersPosts,
  getmyPost,
} from "../api/postapi";

export const addPostAsync = createAsyncThunk(
  "post/addpost",
  async (formData) => {
    try {
      const data = await addPost(formData);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const editPostAsync = createAsyncThunk(
  "post/editpost",
  async ({ caption, id }) => {
    try {
      const data = await editPost({ caption, id });
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getPostAsync = createAsyncThunk("post/getpost", async (page) => {
  try {
    const data = await getPost(page);
    return data;
  } catch (e) {
    return e.response.data;
  }
});

export const getSinglePostAsync = createAsyncThunk(
  "post/getsinglepost",
  async (id) => {
    try {
      const data = await getSinglePost(id);
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getMyPostAsync = createAsyncThunk("post/getmypost", async (id) => {
  try {
    const data = await getmyPost(id);
    return data;
  } catch (e) {
    return e.response.data;
  }
});

export const getFollowersPostAsync = createAsyncThunk(
  "post/followersPost",
  async () => {
    try {
      const data = await getfollowersPosts();
      return data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    error: "",
    allPosts: [],
    myPosts: [],
    singlePost: {},
    followersPost: [],
    loading: false,
  },
  reducers: {
    addNewPost: (state, action) => {
      state.allPosts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPostAsync.fulfilled, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(editPostAsync.fulfilled, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getPostAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyPostAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSinglePostAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFollowersPostAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getPostAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(getMyPostAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.myPosts = action.payload;
    });
    builder.addCase(getSinglePostAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePost = action.payload;
    });
    builder.addCase(getFollowersPostAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.followersPost = action.payload;
    });
  },
});

export const { addNewPost } = postSlice.actions;

export default postSlice.reducer;
