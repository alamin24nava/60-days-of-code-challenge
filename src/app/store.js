import { configureStore } from '@reduxjs/toolkit'
import catagoriesReducer from '../features/catagories/catagoriesSlice'
import authorsReducer from '../features/authors/authorsSlice'
export const store = configureStore({
    reducer: {
        catagories: catagoriesReducer,
        authors:authorsReducer,
    },
})