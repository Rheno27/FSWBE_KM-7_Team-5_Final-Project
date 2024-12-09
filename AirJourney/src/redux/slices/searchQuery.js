import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromDestination: null,
    toDestination: null,
    departureDate: null,
    arrivalDate: null,
    passenger: null,
    classType: null,
    isReturn: false,
};

export const searchQuerySlice = createSlice({
    name: "searchQuery",
    initialState,
    reducers: {
        setFromDestinationRedux: (state, action) => {
            state.fromDestination = action.payload;
        },
        setToDestinationRedux: (state, action) => {
            state.toDestination = action.payload;
        },
        setDepartureDateRedux: (state, action) => {
            state.departureDate = action.payload;
        },
        setArrivalDateRedux: (state, action) => {
            state.arrivalDate = action.payload;
        },
        setPassengerRedux: (state, action) => {
            state.passenger = action.payload;
        },
        setClassTypeRedux: (state, action) => {
            state.classType = action.payload;
        },
        setIsReturnRedux: (state, action) => {
            state.isReturn = action.payload;
        },
    },
});

export const {
    setFromDestinationRedux,
    setToDestinationRedux,
    setDepartureDateRedux,
    setArrivalDateRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
