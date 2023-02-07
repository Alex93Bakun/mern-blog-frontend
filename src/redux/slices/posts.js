import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`);
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get post
        builder.addCase(fetchPosts.pending, (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        });

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'success';
        });

        builder.addCase(fetchPosts.rejected, (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        });

        // get tag
        builder.addCase(fetchTags.pending, (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        });

        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'success';
        });

        builder.addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        });

        // delete post
        builder.addCase(fetchRemovePost.pending, (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        });
    },
});

export const postsReducer = postSlice.reducer;
