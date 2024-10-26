import { createSlice } from '@reduxjs/toolkit';

const checkToken = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        isLoggedIn: false,
    },
    reducers:{
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;