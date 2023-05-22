import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import addressSlice from './addressSlice'

const store = configureStore({
    reducer:{ address: addressSlice, cart: cartSlice }
})

export default store;