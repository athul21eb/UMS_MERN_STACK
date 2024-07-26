 import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/user/authSlice.js'
import { apiSlice } from './slices/apiSlice.js'

 const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    devTools:true,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),

 })

 export default store