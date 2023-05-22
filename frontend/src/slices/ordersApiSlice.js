
import { apiSlice } from './apiSlice';
import {ORDERS_URL} from '../constants'




export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //Create Order
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'post',
                body: {...order}
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation
} = ordersApiSlice;



