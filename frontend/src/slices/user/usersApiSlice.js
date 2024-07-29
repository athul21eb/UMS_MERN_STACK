
import { apiSlice } from "../apiSlice";
import { ClearCredentials, SetCredentials } from "./authSlice";

const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: "POST",
                body: data,

            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",

            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                   const res =  await queryFulfilled;
                   dispatch(ClearCredentials());
                   dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            }
            
        }),
         register : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data,

            })
        }),
        updateUser : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,

            })
        }),
        refresh:builder.mutation({
            query:()=>({
                url: `/api/tokenRefresh`,
                method: "GET",
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                   const{data} =  await queryFulfilled;
                   
                   const {accessToken} = data;
                   dispatch(SetCredentials({accessToken}));
                   
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {useRefreshMutation, useLoginMutation, useLogoutMutation ,useRegisterMutation,useUpdateUserMutation} = userApiSlice;