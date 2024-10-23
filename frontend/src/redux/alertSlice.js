import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        show: false,
        message: '',
        variant: ''
    },
    reducers: {
        setAlert: (state, action) => {
            state.show = true;
            state.message = action.payload.message;
            state.variant = action.payload.variant;
        },
        clearAlert: (state) => {
            state.show = false;
            state.message = '';
            state.variant = '';
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;