import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiComments, postApiComments } from './commentsAPI'
const initialState = {
    comments:[{
        commentDesc:'',
        blogId:null,
    }],
    isLoading:false,
    isError:false,
    error:null
}
// getComments Thunk
export const getComments = createAsyncThunk('comments/getComments',
    async ()=>{
        const comments = await getApiComments()
        return comments
    }
)

// postComments Thunk
export const postComments = createAsyncThunk('comments/postComments',
    async (newComment)=>{
       const comments = await postApiComments(newComment)
       return comments
    }
)

// export const dependentAuthorsByCategory = createAsyncThunk('authors/dependentAuthorsByCategory',
//     async(id)=>{
//         const response = await fetch(`http://localhost:3000/authors?catagoryId=${id}`)
//         return response.json()
//     }
// )

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
    extraReducers:(builder)=>{
        builder
        // getComments
        .addCase(getComments.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getComments.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.comments = action.payload
        })
        .addCase(getComments.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        // postComments

        .addCase(postComments.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(postComments.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            // console.log(action.payload)
            state.comments.push(action.payload)
        })
        .addCase(postComments.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })


        // dependentAuthorsByCategory
        // .addCase(dependentAuthorsByCategory.fulfilled, (state, action)=>{
        //     state.isError = false;
        //     state.isLoading = false;
        //     state.authorsByCategories = action.payload
        // })
         
    }
})

// Action creators are generated for each case reducer function
export const { } = commentsSlice.actions
export const useCommentsSelector = (state)=> state.comments

export default commentsSlice.reducer