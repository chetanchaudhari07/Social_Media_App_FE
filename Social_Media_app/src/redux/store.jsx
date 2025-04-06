import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        posts: postReducer,
        comments: commentReducer,
    },
});