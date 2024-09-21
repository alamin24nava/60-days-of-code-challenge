import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiAuthors } from './authorsAPI'
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
export const postAuthors = createAsyncThunk('authors/getAuthors',
    async (newAuthor)=>{
        const response = await fetch('http://localhost:3000/authors',
            {
                method:"POST",
                body:JSON.stringify(newAuthor),
                headers:{"Content-type":"application/json"}
            }
        )
        return response.json()
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
        // .addCase(postAuthors.pending, (state)=>{
        //     state.isError = false;
        //     state.isLoading = true;
        // })
        // .addCase(postAuthors.fulfilled, (state, action)=>{
        //     state.isError = false;
        //     state.isLoading = false;
        //     state.authors.push(action.payload)
        // })
        // .addCase(postAuthors.rejected, (state, action)=>{
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.error.message
        // })
    }
})

// Action creators are generated for each case reducer function
export const { reducerCreateAuthor, decrement, incrementByAmount } = AuthorsSlice.actions
export const useAuthorsSelector = (state)=> state.authors
export default AuthorsSlice.reducer