import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addConversation,getConversation } from "../api/chatapi";

export const addConversationAsync = createAsyncThunk(
    "conversation/add",
    async (formData) => {
        try {
            const data = await addConversation(formData);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
);

export const getConversationAsync = createAsyncThunk(
    "conversation/get",
    async (formData) => {
        try {
            const data = await getConversation(formData);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
);

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversationData: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getConversationAsync.fulfilled, (state, action) => {
            state.conversationData = action.payload;
        })
    }
})

export default conversationSlice.reducer;
