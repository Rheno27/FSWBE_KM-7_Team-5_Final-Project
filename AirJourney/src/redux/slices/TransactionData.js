import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    passengerData: [],
};

export const transactionDataSlice = createSlice({
    name: "transactionData",
    initialState,
    reducers: {
        setPassengerData: (state, action) => {
            state.passengerData = action.payload;
        },
    },
});

export const { 
    setPassengerData,
} = transactionDataSlice.actions;

export default transactionDataSlice.reducer;
