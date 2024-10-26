import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer:{
        alert: alertReducer,
        auth: authReducer
    }
})

export default store;