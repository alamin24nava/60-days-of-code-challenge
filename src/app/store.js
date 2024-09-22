import { configureStore } from '@reduxjs/toolkit'
import catagoriesReducer from '../features/catagories/catagoriesSlice'
import authorsReducer from '../features/authors/authorsSlice'
import tagsReducer from '../features/tags/tagsSlice'
export const store = configureStore({
    reducer: {
        catagories: catagoriesReducer,
        authors:authorsReducer,
        tags:tagsReducer
    },
})