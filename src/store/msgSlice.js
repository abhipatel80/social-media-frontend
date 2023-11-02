import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMsg, sendMsg } from "../api/chatapi";

export const addMessageAsync = createAsyncThunk(
    "message/add",
    async (formData) => {
        try {
            const data = await sendMsg(formData);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
);

export const getMessageAsync = createAsyncThunk(
    "message/get",
    async (id) => {
        try {
            const data = await getMsg(id);
            return data;
        } catch (e) {
            return e.response.data;
        }
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMessageAsync.fulfilled, (state, action) => {
            state.messages = action.payload
        })
    }
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
