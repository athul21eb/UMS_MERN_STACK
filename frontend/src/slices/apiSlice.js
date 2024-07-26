import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery();

export const apiSlice = createApi({
    baseQuery,
    tagTypes:["User"],
    endpoints :(builder)=>({

    })
})