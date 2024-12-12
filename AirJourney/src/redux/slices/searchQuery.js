import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromDestination: null,
    toDestination: null,
    fromDestinationId: null,
    toDestinationId: null,
    departureDate: null,
    arrivalDate: null,
    flightId:null,
    returnFlightId:null,
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
        setFromDestinationIdRedux: (state, action) =>{
            state.fromDestinationId = action.payload;
        },
        setToDestinationIdRedux: (state,action)=>{
            state.toDestinationId = action.payload;
        },
        setDepartureDateRedux: (state, action) => {
            state.departureDate = action.payload;
        },
        setArrivalDateRedux: (state, action) => {
            state.arrivalDate = action.payload;
        },
        setFlightIdRedux: (state, action) => {
            state.flightId = action.payload;
        },
        setReturnFlightIdRedux: (state, action) => {
            state.returnFlightId = action.payload;
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
    setFromDestinationIdRedux,
    setToDestinationIdRedux,
    setDepartureDateRedux,
    setArrivalDateRedux,
    setFlightIdRedux,
    setReturnFlightIdRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
