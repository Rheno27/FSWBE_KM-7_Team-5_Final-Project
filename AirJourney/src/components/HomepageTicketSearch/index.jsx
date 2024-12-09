import { useNavigate } from "@tanstack/react-router";
import "../../index.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { Switch } from "@/components/ui/switch";
import DestinationModal from "../../components/Modal/DestinationModal";
import DateModal from "../../components/Modal/DateModal";
import ClassModal from "../../components/Modal/ClassModal";
import PassengerModal from "../../components/Modal/PassengerModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFromDestinationRedux,
    setToDestinationRedux,
    setArrivalDateRedux,
    setDepartureDateRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
} from "../../redux/slices/searchQuery";

const HomepageTicketSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for component state
    const [isReturn, setIsReturn] = useState(
        useSelector((state) => state.searchQuery.isReturn) || false
    );
    const [isReturnFilled, setIsReturnFilled] = useState(true);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [isFromModal, setIsFromModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showPassengerModal, setShowPassengerModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);

    // for query
    const [fromDestination, setFromDestination] = useState("");
    const [toDestination, setToDestination] = useState("");
    const [fromDestinationId, setFromDestinationId] = useState("");
    const [toDestinationId, setToDestinationId] = useState("");
    const [searchDate, setSearchDate] = useState(
        useSelector((state) => state.searchQuery.searchDate) || new Date()
    );
    const [passenger, setPassenger] = useState(
        useSelector((state) => state.searchQuery.passenger) || {
            adult: 1,
            child: 0,
            baby: 0,
        }
    );
    const [classType, setClassType] = useState(
        useSelector((state) => state.searchQuery.classType) || "Economy"
    );

    const MONTH = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Juni",
        "Juli",
        "Agu",
        "Sept",
        "Okt",
        "Nov",
        "Des",
    ];

    const searchClickHandler = () => {
        dispatch(setFromDestinationRedux(fromDestination));
        dispatch(setToDestinationRedux(toDestination));
        dispatch(setPassengerRedux(passenger));
        dispatch(setClassTypeRedux(classType));
        dispatch(setIsReturnRedux(isReturn));

        const formData = {
            class: classType.toUpperCase().replace(/\s/g, "_"),
            airportIdFrom: fromDestinationId,
            airportIdTo: toDestinationId,
        };
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }; // toISOString() placeholder since its have a bug;

        if (isReturn) {
            formData.departureDate = formatDate(searchDate.from);
            formData.arrivalDate = formatDate(searchDate.to);

            dispatch(setDepartureDateRedux(formData.departureDate));
            dispatch(setArrivalDateRedux(formData.arrivalDate));
        } else {
            formData.departureDate = formatDate(searchDate);
            dispatch(setDepartureDateRedux(formData.departureDate));
        }
        console.log(formData);
        navigate({
            to: `/users/public/detailPenerbangan?${new URLSearchParams(formData).toString()}`,
        });
    };

    useEffect(() => {
        if (isReturn && searchDate.to) {
            setIsReturnFilled(true);
        } else if (isReturn && !searchDate.to) {
            setIsReturnFilled(false);
        }
    }, [searchDate, isReturn]);

    return (
        <div className="w-full h-64 flex justify-center relative">
            <div className="w-11/12 max-w-5xl flex justify-between flex-col h-fit -top-16 rounded-xl bg-white border shadow-sm absolute md:w-full">
                <div className="h-fit flex flex-col px-8 py-6 gap-3">
                    <div className="font-bold text-xl">
                        Pilih Jadwal Penerbangan spesial di{" "}
                        <span className="text-darkblue5">Terbangin!</span>
                    </div>
                    <div className="flex flex-col h-fit justify-between gap-12">
                        {/* destination */}
                        <div className="flex flex-col w-full gap-4 justify-between relative sm:flex-row">
                            <div className="flex items-center flex-1 gap-3">
                                <FlightTakeoffIcon color="disabled" />
                                <span className="text-gray-500 w-10">From</span>
                                <button
                                    className="flex-1 pb-1 mx-3 text-lg text-start font-semibold border-b"
                                    onClick={() => {
                                        setShowDestinationModal(true);
                                        setIsFromModal(true);
                                    }}
                                >
                                    {fromDestination || (
                                        <span className="text-darkblue4">
                                            Pilih destinasi
                                        </span>
                                    )}
                                </button>
                            </div>
                            <button>
                                <SwapHorizIcon
                                    fontSize="large"
                                    sx={{ color: "#4B1979" }}
                                    onClick={() => {
                                        const fromTemp = fromDestination;
                                        setFromDestination(toDestination);
                                        setToDestination(fromTemp);
                                    }}
                                />
                            </button>
                            <div className="flex items-center flex-1 gap-3">
                                <FlightTakeoffIcon color="disabled" />
                                <span className="text-gray-500 w-10">To</span>
                                <button
                                    className="flex-1 pb-1 mx-3 text-lg text-start font-semibold border-b"
                                    onClick={() =>
                                        setShowDestinationModal(true)
                                    }
                                >
                                    {toDestination || (
                                        <span className="text-darkblue4">
                                            Pilih destinasi
                                        </span>
                                    )}
                                </button>
                            </div>
                            {showDestinationModal && (
                                <>
                                    <DestinationModal
                                        setShowDestinationModal={
                                            setShowDestinationModal
                                        }
                                        setFromDestination={setFromDestination}
                                        setToDestination={setToDestination}
                                        isFromModal={isFromModal}
                                        setIsFromModal={setIsFromModal}
                                        fromDestination={fromDestination}
                                        toDestination={toDestination}
                                        setFromDestinationId={
                                            setFromDestinationId
                                        }
                                        setToDestinationId={setToDestinationId}
                                    />
                                    <div
                                        className="fixed z-1 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                        onClick={() => {
                                            setIsFromModal(false);
                                            setShowDestinationModal(false);
                                        }}
                                    ></div>
                                </>
                            )}
                        </div>

                        {/* date & passenger*/}
                        <div className="flex flex-col w-full gap-4 justify-between sm:flex-row">
                            {/* date */}
                            <div className="flex items-start flex-1 gap-3 relative sm:items-center">
                                <DateRangeIcon color="disabled" />
                                <span className="text-gray-500 w-10">Date</span>
                                <div className="flex flex-col gap-4 flex-1 justify-between md:flex-row phone:gap-0">
                                    <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                        <span className="text-gray-500 w-10">
                                            Departure
                                        </span>
                                        <button
                                            className="flex-1 text-lg text-start font-semibold"
                                            onClick={() =>
                                                setShowDateModal(true)
                                            }
                                        >
                                            {isReturn && searchDate.from > 1
                                                ? `${searchDate.from.getDate()} - ${MONTH[searchDate.from.getMonth()]} - ${searchDate.from.getFullYear()}`
                                                : `${searchDate.getDate()} - ${MONTH[searchDate.getMonth()]} - ${searchDate.getFullYear()}`}
                                        </button>
                                    </div>
                                    <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                        <div>
                                            <div className="text-gray-500 w-full flex justify-between">
                                                <span>Return</span>
                                                <Switch
                                                    checked={isReturn}
                                                    onCheckedChange={() => {
                                                        setIsReturn(!isReturn);
                                                        searchDate.from
                                                            ? setSearchDate(
                                                                  searchDate.from
                                                              )
                                                            : null;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className="flex-1 text-lg text-start font-semibold"
                                            disabled={!isReturn}
                                            onClick={() =>
                                                setShowDateModal(true)
                                            }
                                        >
                                            <span
                                                className={`${isReturn ? "text-darkblue4" : "text-darkblue2"}`}
                                            >
                                                {isReturn && searchDate.to > 1
                                                    ? `${searchDate.to.getDate()} - ${MONTH[searchDate.to.getMonth()]} - ${searchDate.to.getFullYear()}`
                                                    : `Pilih Tanggal`}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                {showDateModal && (
                                    <>
                                        <DateModal
                                            setShowDateModal={setShowDateModal}
                                            isReturn={isReturn}
                                            searchDate={searchDate}
                                            setSearchDate={setSearchDate}
                                        />
                                        <div
                                            className="fixed z-1 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                            onClick={() =>
                                                setShowDateModal(false)
                                            }
                                        ></div>
                                    </>
                                )}
                            </div>

                            <button disabled>
                                <SwapHorizIcon
                                    fontSize="large"
                                    sx={{ color: "white" }}
                                />
                            </button>

                            {/* passenger & class */}
                            <div className="flex items-start flex-1 gap-3 md:items-center">
                                <AirlineSeatReclineNormalIcon color="disabled" />
                                <span className="text-gray-500 w-10">To</span>
                                <div className="flex flex-col flex-1 gap-4 justify-between md:flex-row md:gap-0">
                                    {/* passenger */}
                                    <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1 relative">
                                        <span className="text-gray-500 w-10">
                                            Passengers
                                        </span>
                                        <button
                                            className="flex-1 text-lg text-start font-semibold text-nowrap"
                                            onClick={() =>
                                                setShowPassengerModal(true)
                                            }
                                        >
                                            {passenger?.adult +
                                                passenger?.child +
                                                passenger?.baby}{" "}
                                            Penumpang
                                        </button>
                                        {showPassengerModal && (
                                            <>
                                                <PassengerModal
                                                    setShowPassengerModal={
                                                        setShowPassengerModal
                                                    }
                                                    passenger={passenger}
                                                    setPassenger={setPassenger}
                                                />
                                                <div
                                                    className="fixed z-1 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                                    onClick={() =>
                                                        setShowPassengerModal(
                                                            false
                                                        )
                                                    }
                                                ></div>
                                            </>
                                        )}
                                    </div>
                                    {/* class */}
                                    <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1 relative">
                                        <div>
                                            <span className="text-gray-500 w-10">
                                                Seat Class
                                            </span>
                                        </div>
                                        <button
                                            className="flex-1 text-lg text-start font-semibold text-nowrap"
                                            onClick={() =>
                                                setShowClassModal(true)
                                            }
                                        >
                                            {classType}
                                        </button>
                                        {showClassModal && (
                                            <>
                                                <ClassModal
                                                    setShowClassModal={
                                                        setShowClassModal
                                                    }
                                                    classType={classType}
                                                    setClassType={setClassType}
                                                />
                                                <div
                                                    className="fixed z-1 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                                    onClick={() =>
                                                        setShowClassModal(false)
                                                    }
                                                ></div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="py-2.5 bg-darkblue4 disabled:bg-darkblue2 text-white font-semibold rounded-b-xl"
                    onClick={searchClickHandler}
                    disabled={isReturn && !isReturnFilled}
                >
                    Cari Penerbangan
                </button>
            </div>
        </div>
    );
};

export default HomepageTicketSearch;
