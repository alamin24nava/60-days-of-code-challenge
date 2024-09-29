import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {postApiPosts, deleteApiPosts, getApiPosts, updateApiPosts} from '../posts/postsAPI'
const initialState = {
    posts:[
        {
            authorId:0,
            catagoryId:0,
            postTitle:'',
            postDesc:'',
            dateTime:null,
            like:0,
            tags:[1,2,4],
        }
    ],
    editablePost:null,    
    isLoading:false,
    isError:false,
    error:null
}
export const getPosts = createAsyncThunk('posts/getPosts',
    async(filterData)=>{
        const posts = await getApiPosts(filterData)
        return posts
    }
)

export const postPosts = createAsyncThunk('posts/postPosts',
    async(newPost)=>{
        const posts = await postApiPosts(newPost)
        return posts
    }
)
export const updatePosts = createAsyncThunk('posts/updatePosts',
    async(post)=>{
        const posts = await updateApiPosts(post)
        return posts
    }
)
export const deletePosts = createAsyncThunk('posts/deletePosts',
    async(postId)=>{
        await deleteApiPosts(postId)
        return postId
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        EDITABLE_BLOG:(state, action)=>{
            state.editablePost = action.payload
        },
    },
    extraReducers:(builder)=>{
        builder
        // getPosts
        .addCase(getPosts.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getPosts.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.posts = action.payload
        })
        .addCase(getPosts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })

    //     // postPosts
        .addCase(postPosts.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(postPosts.fulfilled, (state)=>{
            state.isError = false;
            state.isLoading = false;
        })
        .addCase(postPosts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })


        // deleteTags
        .addCase(deletePosts.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(deletePosts.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.posts = state.posts.filter((item)=> item.id !== action.payload)
        })
        .addCase(deletePosts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })


        .addCase(updatePosts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            const findIndex = state.posts.findIndex(post => post.id === action.payload.id)
            state.posts[findIndex] = action.payload
            state.editablePost = null

        })
    }
})

// Action creators are generated for each case reducer function
export const usePostsGetSelector = (state)=> state.posts
export const { EDITABLE_BLOG } = postsSlice.actions
export default postsSlice.reducer