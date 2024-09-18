import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPosts } from './postsAPI'

const initialState = {
    ctgName : '',
    editAble:null,
    isLoading: false,
    isError: false,
    error:null,
    catagories: [
        {
            name : "English",
            id : 1
        },
        {
            name : "Bangla",
            id : 2
        },
        {
            name : "History",
            id : 3
        },
    ],
    authors:[
        {
            name:"lemon",
            id:1,
            category_id : 1
        },
        {
            name:"Kamal",
            id:2,
            category_id : 1
        },
        {
            name:"Nafiz",
            id:3,
            category_id : 3
        },
        {
            name:"Jafor",
            id:4,
            category_id : 2
        }
    ],
    tags: [
        {
          name : "trending",
          id : 1
        },
        {
          name : "top",
          id : 2
        },
        {
          name : "high",
          id : 3
        },
        {
          name : "hunter",
          id : 4
        },
        {
          name : "best",
          id : 5
        },
    ],
    blogs: [
        {
          id : 1,
          author_id : 1,
          category_id : 1,
          title : "somethinmg",
          desc : "long text",
          dateTime: "2nd Feb,2024 12:30 AM",
          like : 234,
          tags : [1,3,4],
        },
        {
          id : 2,
          author_id : 1,
          category_id : 2,
          title : "somethinmg2",
          desc : "long text",
          like : 234,
          tags : [1,3,5]
        }
    ],
    comments: [
        {
          blog_id : 1,
          comment : "goog job"
        },
        {
          blog_id : 1,
          comment : "goog job"
        },
    ]
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async () => {
        const posts = await getPosts()
        return posts
    }
)
export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        CATAGORIES:(state, action)=>{
          state.catagories.push(action.payload)
        },
        HANDLE_DELETE:(state, action)=>{
          state.catagories = state.catagories.filter((item)=> item.id !== action.payload)
        },
        HANDLE_EDIT:(state, action)=>{
            console.log(action.payload)
        },
        HANDLE_UPDATE:(state, action)=>{
            state.catagories = state.catagories.map((catagory)=>{
                if(catagory.id === action.payload.id){
                    return {...catagory, name:action.payload}
                }
                return catagory
            })
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending, (state)=>{
            state.isError = false;
            state.isLoading = true
        })
            .addCase(fetchPosts.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.posts = action.payload;

            })
            .addCase(fetchPosts.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload
            })
    }
})

// Action creators are generated for each case reducer function
export const {CATAGORIES, HANDLE_DELETE,HANDLE_EDIT } = blogSlice.actions
export const useGetSelector = (state)=> state.blog
export default blogSlice.reducer