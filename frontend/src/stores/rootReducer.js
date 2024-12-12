import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from './Carts/cartSlice'
import authReducer from './auth/authSlice'

const rootReducer = combineReducers(
    {
    cart: cartReducer,
    auth: authReducer
    }
);

export default rootReducer;