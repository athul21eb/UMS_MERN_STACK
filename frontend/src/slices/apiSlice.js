import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { SetCredentials } from './user/authSlice.js';
import { SetAdminCredentials } from './admin/adminauthSlice.js';

const baseQuery = fetchBaseQuery({

    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token || getState().adminAuth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers


    }

});

const baseQueryWithReAuth = async (args, api, extraOptions) => {

    console.log(args) //request url,method,body
    //console.log(api)  //signal,dispatch,getState()
    //console.log(extraOptions) //custom like {shout:true}

    const regex = /^\/api\/admin/;
    let admin = false;
    if (regex.test(args?.url)) {
        console.log("URL starts with /api/admin");
        admin = true;
    } else {
        console.log("URL does not start with /api/admin");
        admin = false;
    }

    let result = await baseQuery(args, api, extraOptions);

    console.log(result);
    // if you want , handle other status codes too
    if (result?.error?.status === 403) {
        console.log("sending refresh token ");
        const refreshResult = await baseQuery('/api/tokenRefresh', api, extraOptions)

        if (refreshResult?.data) {

            const { accessToken } = refreshResult?.data;

            if (admin) {
                api.dispatch(SetAdminCredentials({ accessToken }))
            } else {

                api.dispatch(SetCredentials({ accessToken }));
            }

            result = await baseQuery(args, api, extraOptions);




        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your Login has expired   ";
            }

            return refreshResult;


        }


    }

    // send refresh token to get new acess token 
    return result

}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["User"],
    endpoints: (builder) => ({

    })
})