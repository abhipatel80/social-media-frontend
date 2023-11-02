import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLikedPost } from "../api/likeapi";

export const getLikedPostsAsync = createAsyncThunk(
    "post/likedPost",
    async () => {
        try {
            const data = await getLikedPost();
            return data;
        } catch (e) {
            return e;
        }
    }
);

const likeSlice = createSlice({
    name: "like",
    initialState: {
        likedPost: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getLikedPostsAsync.fulfilled, (state, action) => {
            state.likedPost = action.payload
        });
    }
});

export default likeSlice.reducer;
