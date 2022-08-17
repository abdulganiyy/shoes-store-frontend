import { configureStore } from "@reduxjs/toolkit";

import userReducer from 'slices/user'
import productsReducer from "slices/products";

const store = configureStore({
    reducer:{
        user:userReducer,
        products:productsReducer
    }
})


export default store
// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

