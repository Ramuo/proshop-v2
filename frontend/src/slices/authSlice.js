import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: {
        //Set credential function
        setCredidentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
        },
    },
});

export const {setCredidentials} = authSlice.actions
export default authSlice.reducer;