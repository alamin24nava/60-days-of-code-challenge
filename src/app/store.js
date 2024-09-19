import { configureStore } from '@reduxjs/toolkit'
import catagoriesReducer from '../features/catagories/catagoriesSlice'
export const store = configureStore({
    reducer: {
        catagories: catagoriesReducer
    },
})