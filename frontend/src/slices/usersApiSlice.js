import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";



const userApiSlice = apiSlice.injectEndpoints({
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
    }),
});

export const {
    useLoginMutation, 
    useRegisterMutation,
    useLogoutMutation
} = userApiSlice; 