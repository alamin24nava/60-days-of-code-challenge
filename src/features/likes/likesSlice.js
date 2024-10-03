import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiLikes } from './likesAPI'
const initialState = {
    likes:[{
        count:null,
        blogId:null,
    }],
    isLoading:false,
    isError:false,
    error:null
}
// getAuthors Thunk
export const getLikes = createAsyncThunk('likes/getLikes',
    async ()=>{
        const likes = await getApiLikes()
        return likes
    }
)


export const LikesSlice = createSlice({
  name: 'likes',
  initialState,
    extraReducers:(builder)=>{
        builder
        // getAuthors
        .addCase(getLikes.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getLikes.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.likes = action.payload
        })
        .addCase(getLikes.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        
         
    }
})

// Action creators are generated for each case reducer function
export const { } = LikesSlice.actions
export const useLikesSelector = (state)=> state.likes

export default LikesSlice.reducer