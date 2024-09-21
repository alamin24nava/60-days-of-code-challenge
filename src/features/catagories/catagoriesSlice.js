import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiCatagories, postApiCatagories,deleteApiCatagories,updateApiCatagories } from './catagoriesAPI'

const initialState = {
    catagoryName:'',
    catagories:[],
    editableCatagory:null,
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
// deleteCatagories Thunk
export const deleteCatagories = createAsyncThunk('catagories/deleteCatagories', 
    async (catagoryId)=>{
        await deleteApiCatagories(catagoryId)
        return catagoryId
    }
)
// updateCatagories Thunk
export const updateCatagories = createAsyncThunk('catagories/updateCatagories',
    async (catagory)=>{
        const catagories = await updateApiCatagories(catagory)
        return catagories
    }
)

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
            state.catagories = state.catagories.filter((item)=> item.id !== action.payload)
            // state.catagories.push(action.payload)
        })
        .addCase(deleteCatagories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        // updateCatagories
        .addCase(updateCatagories.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            const findIndex = state.catagories.findIndex(category => category.id === action.payload.id)
            state.catagories[findIndex].title = action.payload.title
        })
    }
})
// export const {CATAGORIES} = catagoriesSlice.actions
export const useGetSelector = (state)=> state.catagories
export default catagoriesSlice.reducer