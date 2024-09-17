import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ctgName : '',
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

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        allctgs:(state, action)=>{
          state.catagories.push(action.payload)
        },
        HANDLE_DELETE:(state, action)=>{
          state.catagories = state.catagories.filter((item)=> item.id !== action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const {allctgs, HANDLE_DELETE } = blogSlice.actions

export default blogSlice.reducer