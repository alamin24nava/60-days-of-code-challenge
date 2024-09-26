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
            editablePost:null,
            tags:[1,2,4],
        }
    ],    
    isLoading:false,
    isError:false,
    error:null
}
export const getPosts = createAsyncThunk('posts/getPosts',
    async()=>{
        const posts = await getApiPosts()
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
            console.log(action.payload)
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
        .addCase(postPosts.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            console.log(action.payload)
            // console.log(state.isError)
        })
        .addCase(postPosts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })


    //     // deleteTags
    //     .addCase(deleteTags.pending, (state)=>{
    //         state.isError = false;
    //         state.isLoading = true;
    //     })
    //     .addCase(deleteTags.fulfilled, (state, action)=>{
    //         state.isError = false;
    //         state.isLoading = false;
    //         state.tags = state.tags.filter((item)=> item.id !== action.payload)
    //     })
    //     .addCase(deleteTags.rejected, (state, action)=>{
    //         state.isLoading = false;
    //         state.isError = true;
    //         state.error = action.error.message
    //     })


    //     .addCase(updateTags.fulfilled, (state, action)=>{
    //         state.isLoading = false;
    //         state.isError = false;
    //         console.log(action.payload)
    //         const findIndex = state.tags.findIndex(tag => tag.id === action.payload.id)
    //         state.tags[findIndex].name = action.payload.name
    //     })
    }
})

// Action creators are generated for each case reducer function
export const usePostsGetSelector = (state)=> state.posts
export default postsSlice.reducer