
import { apiSlice } from "../apiSlice";

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

            })

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
        })
    })
})

export const { useAdminLoginMutation, useLoadUsersMutation, useAdminLogoutMutation, useAdminDeleteUserMutation ,
    useAdminAddUserMutation,
    useAdminUpdateUserMutation,
} = adminApiSlice;