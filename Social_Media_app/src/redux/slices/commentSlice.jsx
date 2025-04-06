import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const addComment = createAsyncThunk('comments/addComment', async ({ postId, text, parentCommentId }, thunkAPI) => {
    try {
        const res = await api.post(`/comments/${postId}`, { text, parentCommentId });
        return { postId, comments: res.data };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId, thunkAPI) => {
    try {
        const res = await api.get(`/comments/${postId}`);
        return { postId, comments: res.data };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByPost: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                const postId = action.payload.post;
                if (!state.commentsByPost[postId]) {
                    state.commentsByPost[postId] = [];
                }
                state.commentsByPost[postId].push(action.payload);
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                state.commentsByPost[postId] = comments;
            });
    },
});

export default commentSlice.reducer;
