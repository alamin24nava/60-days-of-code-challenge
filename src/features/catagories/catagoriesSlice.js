import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiCatagories, postApiCatagories } from './catagoriesAPI'

const initialState = {
    catagoryName:'',
    catagories:[],
    isLoading:false,
    isError:false,
    error:null,
}
// getCatagories Thunk
export const getCatagories = createAsyncThunk('catagories/getCatagories', 
    async ()=>{
        const catagories = await getApiCatagories()
        return catagories
    }
)
// PostCatagories Thunk
export const postCatagories = createAsyncThunk('catagories/postCatagories', 
    async (newCatagory)=>{
        const catagories = await postApiCatagories(newCatagory)
        return catagories
    }
)

// export const deleteCatagories = createAsyncThunk('catagories/deleteCatagories', async (catagoryId)=>{
//     (await fetch('http://localhost:3000/catagories')).json()
//     console.log(catagoryId)
// })



export const catagoriesSlice = createSlice({
    name: 'catagories',
    initialState,
    extraReducers:(builder)=>{
        builder
        // getCatagories
        .addCase(getCatagories.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getCatagories.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.catagories = action.payload
        })
        .addCase(getCatagories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        // postCatagories
        .addCase(postCatagories.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(postCatagories.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.catagories.push(action.payload)
        })
        .addCase(postCatagories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        // deleteCatagories
        .addCase(deleteCatagories.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(deleteCatagories.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            console.log(action.payload)
        })
        .addCase(deleteCatagories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
    }
})


// export const {CATAGORIES} = catagoriesSlice.actions
export const useGetSelector = (state)=> state.catagories
export default catagoriesSlice.reducer