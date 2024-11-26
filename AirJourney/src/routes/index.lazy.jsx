import { createLazyFileRoute } from "@tanstack/react-router";
import "../index.css";
import banner from "../assets/img/home-banner.png";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import SearchIcon from "@mui/icons-material/Search";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
export const Route = createLazyFileRoute("/")({
    component: Index,
});
function Index() {
    const [destination, setDestination] = useState(1);
    const [isReturn, setIsReturn] = useState(false);

    const destinationQueryTest = [
        { id: 1, name: "Semua" },
        { id: 2, name: "Asia" },
        { id: 3, name: "Amerika" },
        { id: 4, name: "Australia" },
        { id: 5, name: "Eropa" },
        { id: 6, name: "Afrika" },
    ];
    const destinationListTest = [
        {
            id: 1,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 2,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 3,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 1,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 2,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 3,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 1,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
        {
            id: 2,
            from: "Jakarta",
            to: "Bangkok",
            airline: "AirAsia",
            date: "20 - 30 Maret 2023",
            price: 430000,
            picture: "https://picsum.photos/200",
        },
    ];

    useEffect(() => {
        console.log(destination, isReturn);
    }, [destination, isReturn]);

    return (
        <div className="flex flex-col items-center">
            {/* banner */}
            <div className="w-full h-32 flex justify-center relative my-16 bg-gradient-to-r from-darkblue3 to-darkblue2">
                <div className="w-full max-w-7xl h-60 flex items-center justify-center absolute -top-14">
                    <img src={banner} />
                </div>
            </div>

            {/* search */}
            <div className="w-full h-64 flex justify-center relative">
                <div className="w-full max-w-5xl flex justify-between flex-col h-72 -top-16 rounded-xl bg-white border shadow-sm overflow-hidden absolute">
                    <div className="h-full flex flex-col px-8 py-6 gap-3">
                        <div className="font-bold text-xl">
                            Pilih Jadwal Penerbangan spesial di{" "}
                            <span className="text-darkblue5">Terbangin!</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex w-full gap-4 justify-between">
                                <div className="flex items-center flex-1 gap-3">
                                    <FlightTakeoffIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        From
                                    </span>
                                    <button className="flex-1 pb-1 mx-3 text-lg text-start font-semibold border-b">
                                        {"Jakarta (JKT)"}
                                    </button>
                                </div>
                                <button>
                                    <SwapHorizIcon
                                        fontSize="large"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                                <div className="flex items-center flex-1 gap-3">
                                    <FlightTakeoffIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        To
                                    </span>
                                    <button className="flex-1 pb-1 mx-3 text-lg text-start font-semibold border-b">
                                        {"Melbourne (MBA)"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex w-full gap-4 justify-between">
                                <div className="flex items-center flex-1 gap-3">
                                    <DateRangeIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        Date
                                    </span>
                                    <div className="flex flex-1 justify-between">
                                        <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                            <span className="text-gray-500 w-10">
                                                Departure
                                            </span>
                                            <button className="flex-1 text-lg text-start font-semibold">
                                                {"Jakarta (JKT)"}
                                            </button>
                                        </div>
                                        <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                            <div>
                                                <div className="text-gray-500 w-full flex justify-between">
                                                    <span>Return</span>
                                                    <Switch
                                                        checked={isReturn}
                                                        onCheckedChange={() => {
                                                            setIsReturn(
                                                                !isReturn
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                className="flex-1 text-lg text-start font-semibold"
                                                disabled={!isReturn}
                                            >
                                                <span
                                                    className={`${isReturn ? "text-darkblue4" : "text-darkblue2"}`}
                                                >
                                                    {"Pilih Tanggal"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button disabled>
                                    <SwapHorizIcon
                                        fontSize="large"
                                        sx={{ color: "white" }}
                                    />
                                </button>
                                <div className="flex items-center flex-1 gap-3">
                                    <AirlineSeatReclineNormalIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        To
                                    </span>
                                    <div className="flex flex-1 justify-between">
                                        <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                            <span className="text-gray-500 w-10">
                                                Passengers
                                            </span>
                                            <button className="flex-1 text-lg text-start font-semibold">
                                                {"2"} Penumpang
                                            </button>
                                        </div>
                                        <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                            <div>
                                                <span className="text-gray-500 w-10">
                                                    Seat Class
                                                </span>
                                            </div>
                                            <button className="flex-1 text-lg text-start font-semibold text-darkblue4">
                                                {"Pilih Class"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="py-2.5 bg-darkblue4 text-white font-semibold">
                        Cari Penerbangan
                    </button>
                </div>
            </div>

            {/* list */}
            <div className="w-full max-w-5xl flex flex-col px-8 gap-4">
                {/* query */}
                <div className="flex flex-col gap-3">
                    <span className="font-bold text-lg">Destinasi Favorit</span>
                    <div className="flex gap-4">
                        {destinationQueryTest.map((data) => (
                            <button
                                key={data.id}
                                onClick={() => {
                                    setDestination(data.id);
                                }}
                                className={`flex gap-1 items-center rounded-xl px-6 py-2.5 ${destination == data.id ? "bg-darkblue4 text-white" : "bg-darkblue1 text-black"}`}
                            >
                                <SearchIcon />
                                <span>{data.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* result */}
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {destinationListTest.map((data) => (
                        <div
                            key={data.id}
                            className="flex flex-col rounded-xl overflow-hidden border-1 shadow-sm p-3 gap-2"
                        >
                            <img
                                src={data.picture}
                                alt=""
                                className="rounded-md overflow-hidden w-full h-28"
                            />
                            <div className="flex flex-col flex-initial">
                                <p className="font-medium">
                                    {data.from} {"->"} {data.to}
                                </p>
                                <p className="font-bold text-sm text-darkblue4">
                                    {data.airline}
                                </p>
                                <p className="text-sm">
                                    {data.date}
                                </p>
                                <p className="">
                                    Mulai dari{" "}
                                    <span className="font-bold text-[#FF0000]">
                                        IDR {data.price}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
