import { createAsyncThunk } from "@reduxjs/toolkit";
import { addComment } from "../api/commentapi";

export const addCommentAsync = createAsyncThunk(
    "post/addcomment",
    async (formData) => {
        try {
            const data = await addComment(formData);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
)
