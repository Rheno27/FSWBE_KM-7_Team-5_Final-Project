import { useState, useEffect } from "react";
import "../../index.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";
import ManIcon from "@mui/icons-material/Man";
import GirlIcon from "@mui/icons-material/Girl";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Switch } from "@/components/ui/switch";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Calendar } from "@/components/ui/calendar";
import EventIcon from "@mui/icons-material/Event";
import TodayIcon from "@mui/icons-material/Today";
import { useDispatch } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import {
    setFromDestinationIdRedux,
    setFromDestinationRedux,
    setToDestinationIdRedux,
    setToDestinationRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
    setDepartureDateRedux,
    setArrivalDateRedux,
} from "../../redux/slices/searchQuery";

const HomepageFlightClick = ({ setIsShowModal, selectedFlight }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classList = [
        { name: "Economy" },
        { name: "Premium Economy" },
        { name: "Business" },
        { name: "First Class" },
    ];
    const [passenger, setPassenger] = useState({
        ADULT: 1,
        CHILD: 0,
        INFANT: 0,
    });
    const [adult, setAdult] = useState(passenger?.ADULT || 0);
    const [child, setChild] = useState(passenger?.CHILD || 0);
    const [infant, setInfant] = useState(passenger?.INFANT || 0);
    const [classType, setClassType] = useState("");
    const [isReturn, setIsReturn] = useState(false);
    const [searchDate, setSearchDate] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        setPassenger({ ADULT: adult, CHILD: child, INFANT: infant });
    }, [adult, child, infant]);

    const searchClickHandler = () => {
        dispatch(setFromDestinationRedux(selectedFlight.airportFrom.name));
        dispatch(setFromDestinationIdRedux(selectedFlight.airportIdFrom));
        dispatch(setToDestinationRedux(selectedFlight.airportTo.name));
        dispatch(setToDestinationIdRedux(selectedFlight.airportIdTo));
        dispatch(setPassengerRedux(passenger));
        dispatch(setClassTypeRedux(classType));
        dispatch(setIsReturnRedux(isReturn));

        const formData = {
            airportIdFrom: selectedFlight.airportIdFrom,
            airportIdTo: selectedFlight.airportIdTo,
            departureDate: selectedFlight.departureDate.split("T")[0],
        };
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }; // toISOString() placeholder since its have a bug;

        if(classType){
            formData.class = classType.toUpperCase().replace(/\s/g, "_");
        }
        if (isReturn) {
            dispatch(setDepartureDateRedux(formData.departureDate));
            dispatch(setArrivalDateRedux(formatDate(searchDate)));
        } else {
            dispatch(setDepartureDateRedux(formData.departureDate));
        }
        console.log(formData);
        navigate({
            to: `/users/public/detailPenerbangan?${new URLSearchParams(formData).toString()}`,
        });
    };

    return (
        <div className="z-2 w-fit h-5/6 p-8 bg-white rounded-lg flex flex-col overflow-auto gap-4">
            <div className="flex justify-end mb-1">
                <CloseIcon
                    className="cursor-pointer"
                    onClick={() => setIsShowModal(false)}
                />
            </div>
            {/* class passenger */}
            <div className="flex flex-col gap-12 md:flex-row">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex gap-2">
                        <FlightClassIcon color="disabled" />
                        <span className="font-semibold">Pilih Class</span>
                    </div>
                    <div className="flex flex-col text-nowrap gap-2">
                        {classList.map((item) => {
                            return (
                                <button
                                    key={item.name}
                                    className={`flex items-center justify-between border-b rounded-lg py-2 px-4 ${classType == item.name ? "bg-darkblue5 text-white" : ""}`}
                                    onClick={() => setClassType(item.name)}
                                >
                                    <div className="flex flex-col text-left w-36 sm:w-52">
                                        <span className="font-bold">
                                            {item.name}
                                        </span>
                                    </div>
                                    {classType == item.name && (
                                        <CheckCircleIcon
                                            color="success"
                                            sx={{ color: "#73CA5C" }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex gap-2">
                        <AirlineSeatReclineNormalIcon color="disabled" />
                        <span className="font-semibold">Pilih Penumpang</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col phone:flex-row gap-2 md:gap-20 border-b pb-2 justify-between">
                            <div className="flex gap-2">
                                <ManIcon />
                                <div className="flex flex-col text-nowrap">
                                    <span className="font-bold">Dewasa</span>
                                    <span className="text-slate-500">
                                        (12 tahun keatas)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 h-fit w-fit">
                                <button
                                    className="border-1 border-darkblue4 p-2 rounded-lg"
                                    onClick={() =>
                                        adult > 0 && setAdult(adult - 1)
                                    }
                                >
                                    <RemoveIcon
                                        fontSize="medium"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                                <div className="border-1 border-darkblue2 rounded-lg w-14 flex items-center justify-center text-lg">
                                    {adult}
                                </div>
                                <button
                                    className="border-1 border-darkblue4 p-2 rounded-lg"
                                    onClick={() => setAdult(adult + 1)}
                                >
                                    <AddIcon
                                        fontSize="medium"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col phone:flex-row gap-2 md:gap-20 border-b pb-2 justify-between">
                            <div className="flex gap-2">
                                <GirlIcon />
                                <div className="flex flex-col text-nowrap">
                                    <span className="font-bold">Anak</span>
                                    <span className="text-slate-500">
                                        (2 - 11 tahun)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 h-fit w-fit">
                                <button
                                    className="border-1 border-darkblue4 p-2 rounded-lg"
                                    onClick={() =>
                                        child > 0 && setChild(child - 1)
                                    }
                                >
                                    <RemoveIcon
                                        fontSize="medium"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                                <div className="border-1 border-darkblue2 rounded-lg w-14 flex items-center justify-center text-lg">
                                    {child}
                                </div>
                                <button
                                    className="border-1 border-darkblue4 p-2 rounded-lg"
                                    onClick={() => setChild(child + 1)}
                                >
                                    <AddIcon
                                        fontSize="medium"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col phone:flex-row md:gap-20 border-b pb-2 justify-between">
                            <div className="flex gap-2">
                                <ChildFriendlyIcon />
                                <div className="flex flex-col text-nowrap">
                                    <span className="font-bold">Bayi</span>
                                    <span className="text-slate-500">
                                        (dibawah 2 tahun)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-1 h-fit w-fit">
                                <button
                                    className="border-1 border-darkblue4 p-2 rounded-lg"
                                    onClick={() =>
                                        infant > 0 && setInfant(infant - 1)
                                    }
                                >
                                    <RemoveIcon
                                        fontSize="medium"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                                <div className="border-1 border-darkblue2 rounded-lg w-14 flex items-center justify-center text-lg">
                                    {infant}
                                </div>
                                <button
                                    className="border-1 border-darkblue4 p-2 rounded-lg"
                                    onClick={() => setInfant(infant + 1)}
                                >
                                    <AddIcon
                                        fontSize="medium"
                                        sx={{ color: "#4B1979" }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* date detail */}
            <div className="flex flex-col gap-12 md:flex-row">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex gap-2">
                        <FlightLandIcon color="disabled" />
                        <span className="font-semibold">
                            Penerbangan Kembali / Return
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <Switch
                            checked={isReturn}
                            onCheckedChange={() => {
                                setIsReturn(!isReturn);
                            }}
                        />
                        <span>
                            {isReturn
                                ? "Dengan penerbangan kembali"
                                : "Tanpa penerbangan kembali"}
                        </span>
                    </div>
                    {isReturn && (
                        <Calendar
                            selected={date}
                            onSelect={(value) => {
                                if (isReturn && !value) {
                                    return;
                                }
                                setDate(value);
                                setSearchDate(value);
                            }}
                            mode="single"
                            disabled={{ before: new Date(selectedFlight.departureDate.split("T")[0]) }}
                            required
                        />
                    )}
                </div>
                <div className="flex flex-col gap-4 flex-1 justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <LocationOnIcon />
                            <span>
                                Tujuan :{" "}
                                <span className="font-semibold">
                                    {selectedFlight?.airportFrom.city} {"->"}{" "}
                                    {selectedFlight?.airportTo.city}
                                </span>
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <TodayIcon />
                            <span>
                                Departure :{" "}
                                <span className="font-semibold">
                                    {
                                        selectedFlight?.departureDate.split(
                                            "T"
                                        )[0]
                                    }
                                </span>
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <AirlineSeatReclineNormalIcon />
                            <span>
                                Penumpang :{" "}
                                <span className="font-semibold">
                                    {adult + child + infant} orang
                                </span>
                            </span>
                        </div>
                        {isReturn && searchDate && (
                            <div className="flex gap-2">
                                <EventIcon />
                                <span>
                                    Return :{" "}
                                    <span className="font-semibold">
                                        {
                                            searchDate
                                                .toLocaleDateString("en-CA")
                                                .split("T")[0]
                                        }
                                    </span>
                                </span>
                            </div>
                        )}
                        {classType && (
                            <div className="flex gap-2">
                                <FlightClassIcon />
                                <span>
                                    Class :{" "}
                                    <span className="font-semibold">
                                        {classType}
                                    </span>
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        className="bg-darkblue4 text-white p-2 rounded-lg"
                        onClick={() => {
                            searchClickHandler();
                        }}
                    >
                        Cari Penerbangan
                    </button>
                </div>
            </div>
        </div>
    );
};

HomepageFlightClick.propTypes = {
    setIsShowModal: PropTypes.any,
    selectedFlight: PropTypes.any,
};

export default HomepageFlightClick;
