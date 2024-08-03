import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/user/authSlice.js';
import { apiSlice } from '../slices/apiSlice.js';

import adminAuthReducer from '../slices/admin/adminauthSlice.js';
import adminUsersCollectionReducer from '../slices/admin/adminUsersSlice.js';
import CounterReducer from "../slices/couterSlice.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        Users: adminUsersCollectionReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        counter:CounterReducer,
       
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
        ,
});

export default store;
