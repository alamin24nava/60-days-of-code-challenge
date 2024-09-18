import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCatagories } from './catagoriesAPI'

const initialState = {
    catagoryName:'',
    catagories:[],
    isLoading:false,
    isError:false,
    error:null,
}
export const fetchCatagories = createAsyncThunk('catagories/fetchCatagories', 
    async ()=>{
        const catagories = await getCatagories()
        return catagories
    }
)
export const catagoriesSlice = createSlice({
    name: 'catagories',
    initialState,
    // reducers: {
    //     CATAGORIES:(state, action)=>{
    //         state.catagories.push(action.payload)
    //     },
    // },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCatagories.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchCatagories.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.catagories = action.payload
        })
        .addCase(fetchCatagories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
    }
})


export const {CATAGORIES} = catagoriesSlice.actions
// export const useGetSelector = (state)=> state.catagories
export default catagoriesSlice.reducer