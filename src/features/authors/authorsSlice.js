import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiAuthors, postApiAuthors } from './authorsAPI'
const initialState = {
    authorName:'',
    authors:[],
    catagoryId:null,
    editableAuthor:null,
    isLoading:false,
    isError:false,
    error:null,
}
// getAuthors Thunk
export const getAuthors = createAsyncThunk('authors/getAuthors',
    async ()=>{
        const authors = await getApiAuthors()
        return authors
    }
)

// postAuthors Thunk
export const postAuthors = createAsyncThunk('authors/postAuthors',
    async (newAuthor)=>{
       const authors = await postApiAuthors(newAuthor)
       return authors
    }
)

export const AuthorsSlice = createSlice({
  name: 'authors',
  initialState,
    extraReducers:(builder)=>{
        builder
        // getAuthors
        .addCase(getAuthors.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getAuthors.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.authors = action.payload
        })
        .addCase(getAuthors.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        // postAuthors
        .addCase(postAuthors.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(postAuthors.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.authors.push(action.payload)
        })
        .addCase(postAuthors.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = AuthorsSlice.actions
export const useAuthorsSelector = (state)=> state.authors

export default AuthorsSlice.reducer