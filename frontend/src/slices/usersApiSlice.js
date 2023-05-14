import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";



const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'post',
                body: data
            }),
        }),
    }),
});

export const {useLoginMutation} = userApiSlice;