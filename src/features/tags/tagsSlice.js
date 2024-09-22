import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {postApiTags, deleteApiTags, getApiTags, updateApiTags} from '../tags/tagsAPI'
const initialState = {
    tagName:'',
    tags:[],
    editableTag:null,
    isLoading:false,
    isError:false,
    error:null
}
export const getTags = createAsyncThunk('tags/getTags',
    async()=>{
        const tags = await getApiTags()
        return tags
    }
)

export const postTags = createAsyncThunk('tags/postTags',
    async(newTag)=>{
        const tags = await postApiTags(newTag)
        return tags
    }
)
export const updateTags = createAsyncThunk('tags/updateTags',
    async(tag)=>{
        const tags = await updateApiTags(tag)
        return tags
    }
)
export const deleteTags = createAsyncThunk('tags/deleteTags',
    async(tagId)=>{
        const tags = await deleteApiTags(tagId)
        return tagId
    }
)

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers:(builder)=>{
        builder
        // getTags
        .addCase(getTags.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getTags.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.tags = action.payload
        })
        .addCase(getTags.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })

        // postTags
        .addCase(postTags.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(postTags.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.tags.push(action.payload)
            // console.log(state.isError)
        })
        .addCase(postTags.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })
        // deleteTags
        .addCase(deleteTags.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(deleteTags.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.tags = state.tags.filter((item)=> item.id !== action.payload)
        })
        .addCase(deleteTags.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message
        })


        .addCase(updateTags.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            console.log(action.payload)
            const findIndex = state.tags.findIndex(tag => tag.id === action.payload.id)
            state.tags[findIndex].name = action.payload.name
        })
    }
})

// Action creators are generated for each case reducer function
export const useGetSelector = (state)=> state.tags
export default tagsSlice.reducer