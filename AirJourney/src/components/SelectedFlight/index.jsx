import "../../index.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const SelectedFlight = ({selectedFlightId, setSelectedFlightId,setIsFromSelected}) => {
    const { data: flight, isSuccess } = useQuery({
        queryKey: ["flight", selectedFlightId],
        queryFn: () =>
            axios.get(`${import.meta.env.VITE_API_URL}/flights/${selectedFlightId}`),
    });

    const clickHandler = () =>{
      setIsFromSelected(false);
      setSelectedFlightId(null);
    }

    return (
        <div
            style={{
                backgroundColor: "#ffff",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "70%",
                height: "auto",
                marginLeft: "5rem",
                marginTop: "2rem",
                // Responsive design for small screens
                "@media (max-width: 768px)": {
                    width: "100%",
                    marginLeft: "0",
                },
            }}
        >
            {isSuccess && (
                <>
                    <p className="mb-4">Penerbangan Awal :</p>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold">
                            {flight.data.data.airline.name} - {flight.data.data.class}
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <p className="font-bold">{flight.data.data.departureTime} - {flight.data.data.arrivalTime}</p>
                                <p className="text-darkblue4 font-bold">
                                    IDR {flight.data.data.price}
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <button className="px-4 py-2 text-white font-bold bg-red-500 active:bg-red-700 rounded-md" onClick={clickHandler}>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
