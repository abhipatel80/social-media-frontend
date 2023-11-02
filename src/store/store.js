import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import postSlice from './postSlice';
import likeSlice from './likeSlice';
import conversationSlice from './conversationSlice';
import msgSlice from './msgSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        like: likeSlice,
        conversation: conversationSlice,
        msg: msgSlice,
    }
});

export default store;
