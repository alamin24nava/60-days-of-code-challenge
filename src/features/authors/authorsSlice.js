import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    authorName:'',
    authors:[],
    catagoryId:null,
    editableAuthor:null,
    isLoading:false,
    isError:false,
    error:null,
}

export const getAuthors = createAsyncThunk('authors/getAuthors',
    async ()=>{
        const response = await fetch('http://localhost:3000/authors')
        return response.json()
    }
)

export const AuthorsSlice = createSlice({
  name: 'authors',
  initialState,
    extraReducers:(builder)=>{
        builder
        // getCatagories
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
    }
})

// Action creators are generated for each case reducer function
export const { reducerCreateAuthor, decrement, incrementByAmount } = AuthorsSlice.actions
export const useAuthorsSelector = (state)=> state.authors
export default AuthorsSlice.reducer