import { configureStore } from '@reduxjs/toolkit'
import catagoriesReducer from '../features/catagories/catagoriesSlice'
import authorsReducer from '../features/authors/authorsSlice'
import tagsReducer from '../features/tags/tagsSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from "../features/comments/commentsSlice"
export const store = configureStore({
    reducer: {
        catagories: catagoriesReducer,
        authors:authorsReducer,
        tags:tagsReducer,
        posts:postsReducer,
        comments:commentsReducer
    },
})