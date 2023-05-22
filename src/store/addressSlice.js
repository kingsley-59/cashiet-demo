import { createSlice } from "@reduxjs/toolkit";

let addresses = []

const addressSlice = createSlice({
    name: 'address',
    initialState: { addresses: [], change: false },
    reducers: {
        UpdatedAddresses(state, action){
            state.addresses = action.payload;
        },
        isChanged(state, action){
            state.change = !state.change;
        }
    },
});

export const addressActions = addressSlice.actions;
export default addressSlice.reducer;