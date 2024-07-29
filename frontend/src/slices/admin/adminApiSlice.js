
import { apiSlice } from "../apiSlice";
import { ClearAdminCredentials, SetAdminCredentials } from "./adminauthSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({

                url: `${ADMIN_URL}/auth`,
                method: "POST",
                body: data,

            }),
        }),
        loadUsers: builder.mutation({
            query: () => ({

                url: `${ADMIN_URL}/getUsers`,
                method: "GET",


            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: "POST",

            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                   const res =  await queryFulfilled;
                   dispatch(ClearAdminCredentials());
                   dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            }

        }),

        adminDeleteUser: builder.mutation({

            query: (data) => ({
                url: `${ADMIN_URL}/deleteUser`,
                method: "PUT",
                body: data,
            })
        }),
        adminAddUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/addUser`,
                method: "POST",
                body: data,
            })

        }),
        adminUpdateUser: builder.mutation({
            query: (data) => ({
                    url:`${ADMIN_URL}/updateUser`,
                    method:"PUT",
                    body:data,
            })
        }),
        adminRefresh:builder.mutation({
            query:()=>({
                url: `/api/tokenRefresh`,
                method: "GET",
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                   const{data} =  await queryFulfilled;
                   console.log(data?.accessToken);
                   const {accessToken} = data;
                   dispatch(SetAdminCredentials({accessToken}));
                   
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const { useAdminRefreshMutation, useAdminLoginMutation, useLoadUsersMutation, useAdminLogoutMutation, useAdminDeleteUserMutation ,
    useAdminAddUserMutation,
    useAdminUpdateUserMutation,
} = adminApiSlice;