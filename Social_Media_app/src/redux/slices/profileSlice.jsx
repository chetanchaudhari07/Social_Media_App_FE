import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';


export const fetchProfile = createAsyncThunk('profile/fetch', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/users/profile');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.msg || 'Error fetching profile');
    }
});


export const updateProfile = createAsyncThunk('profile/update', async (formData, { rejectWithValue }) => {
    try {
        const res = await api.put('/users/profile', formData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.msg || 'Error updating profile');
    }
});


export const changePassword = createAsyncThunk('profile/changePassword', async (data, { rejectWithValue }) => {
    try {
        const res = await api.put('/users/change-password', data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.msg || 'Error changing password');
    }
});


export const deleteProfile = createAsyncThunk('profile/delete', async (_, { rejectWithValue }) => {
    try {
        const res = await api.delete('/users/delete');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.msg || 'Error deleting account');
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        loading: false,
        error: null,
        message: '',
    },
    reducers: {
        clearMessage(state) {
            state.message = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.message = 'Profile updated successfully';
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(changePassword.fulfilled, (state, action) => {
                state.message = action.payload.msg;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.profile = null;
                state.message = action.payload.msg;
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearMessage } = profileSlice.actions;
export default profileSlice.reducer;
