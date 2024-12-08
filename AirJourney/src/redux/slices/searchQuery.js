import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromDestination: null,
    toDestination: null,
    searchDate: null,
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
        setSearchDateRedux: (state, action) => {
            state.searchDate = action.payload;
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
    setSearchDateRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
