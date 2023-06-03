import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";




export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //LOGIN
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'post',
                body: data
            }),
        }),
        // REGISTER
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: 'post',
                body: data
            }),
        }),
        // LOGOUT
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'post',
            }),
        }),
        //profile
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        //Get users
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        //Delete user
        deleteUser: builder.mutation({
            query: (userId) => ({
              url: `${USERS_URL}/${userId}`,
              method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLoginMutation, 
    useRegisterMutation,
    useLogoutMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = userApiSlice; 