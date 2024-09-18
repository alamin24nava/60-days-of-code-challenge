import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../features/blog/blogSlice'
import catagoriesReducer from '../features/catagories/catagoriesSlice'
export const store = configureStore({
    reducer: {
        blog: blogReducer,
        catagories: catagoriesReducer
    },
})