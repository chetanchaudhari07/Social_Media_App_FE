import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const createPost = createAsyncThunk('posts/createPost', async (formData, thunkAPI) => {
    try {
        const res = await api.post('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page = 1, thunkAPI) => {
    try {
        const res = await api.get(`/posts?page=${page}`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const toggleLike = createAsyncThunk('posts/toggleLike', async (postId, thunkAPI) => {
    try {
        const res = await api.put(`/api/posts/${postId}/like`);
        return { postId, likes: res.data.likes };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});


const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.msg || 'Failed to create post';
            })

            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload.posts;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.posts = [];
                state.error = action.payload?.msg || 'Failed to fetch posts';
            })

            .addCase(toggleLike.fulfilled, (state, action) => {
                const post = state.posts.find((p) => p._id === action.payload.postId);
                if (post) post.likes = action.payload.likes;
            });
    }
});



export default postSlice.reducer;
