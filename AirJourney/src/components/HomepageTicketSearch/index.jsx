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
    setFromDestinationIdRedux,
    setToDestinationIdRedux,
    setArrivalDateRedux,
    setDepartureDateRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
} from "../../redux/slices/searchQuery";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const HomepageTicketSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storageFormData =
        localStorage.getItem("searchQuery") &&
        JSON.parse(localStorage.getItem("searchQuery"));
    // for component state
    const [isReturn, setIsReturn] =
        useState(useSelector((state) => state.searchQuery.isReturn)) ||
        storageFormData?.isReturn ||
        false;
    const [isReturnFilled, setIsReturnFilled] = useState(true);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [showFromDestinationModal, setShowFromDestinationModal] =
        useState(false);
    const [isFromModal, setIsFromModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showPassengerModal, setShowPassengerModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);
    // for query
    const [fromDestination, setFromDestination] = useState(
        useSelector((state) => state.searchQuery.fromDestination) ||
            storageFormData?.fromDestination ||
            null
    );
    const [toDestination, setToDestination] = useState(
        useSelector((state) => state.searchQuery.toDestination) ||
            storageFormData?.toDestination ||
            null
    );
    const [fromDestinationId, setFromDestinationId] = useState(
        useSelector((state) => state.searchQuery.fromDestinationId) ||
            storageFormData?.airportIdFrom ||
            null
    );
    const [toDestinationId, setToDestinationId] = useState(
        useSelector((state) => state.searchQuery.toDestinationId) ||
            storageFormData?.airportIdTo ||
            null
    );
    const departureDateRedux = useSelector(
        (state) => state.searchQuery.departureDate
    );
    const arrivalDateRedux = useSelector(
        (state) => state.searchQuery.arrivalDate
    );
    const [searchDate, setSearchDate] = useState(
        arrivalDateRedux
            ? {
                  from: new Date(departureDateRedux),
                  to: new Date(arrivalDateRedux),
              }
            : (departureDateRedux ? new Date(departureDateRedux) : null) ||
                  ((new Date(storageFormData?.departureDate) > new Date()) &&
                      new Date(storageFormData?.departureDate)) ||
                  new Date()
    );
    const [passenger, setPassenger] = useState(
        useSelector((state) => state.searchQuery.passenger) ||
            storageFormData?.passenger || {
                ADULT: 1,
                CHILD: 0,
                INFANT: 0,
            }
    );
    const [classType, setClassType] = useState(
        useSelector((state) => state.searchQuery.classType) ||
            storageFormData?.class ||
            "Economy"
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

    const { data: airportList, isSuccess } = useQuery({
        queryKey: ["airports"],
        queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/airports`),
    });

    useEffect(() => {
        if (isSuccess && (!fromDestination || !toDestination)) {
            setFromDestination(airportList.data.data[0].name);
            setToDestination(airportList.data.data[1].name);
            setFromDestinationId(airportList.data.data[0].id);
            setToDestinationId(airportList.data.data[1].id);
        }
    }, [isSuccess]);
    const searchClickHandler = () => {
        dispatch(setFromDestinationRedux(fromDestination));
        dispatch(setFromDestinationIdRedux(fromDestinationId));
        dispatch(setToDestinationRedux(toDestination));
        dispatch(setToDestinationIdRedux(toDestinationId));
        dispatch(setPassengerRedux(passenger));
        dispatch(setClassTypeRedux(classType));
        dispatch(setIsReturnRedux(isReturn));

        const formData = {
            class: classType.toUpperCase().replace(/\s/g, "_"),
        };
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }; // toISOString() placeholder since its have a bug;

        if (fromDestinationId) {
            formData.airportIdFrom = fromDestinationId;
        }
        if (toDestinationId) {
            formData.airportIdTo = toDestinationId;
        }
        if (isReturn) {
            formData.departureDate = formatDate(searchDate.from);

            dispatch(setDepartureDateRedux(formData.departureDate));
            dispatch(setArrivalDateRedux(formatDate(searchDate.to)));
        } else {
            formData.departureDate = formatDate(searchDate);
            dispatch(setDepartureDateRedux(formData.departureDate));
        }
        localStorage.setItem(
            "searchQuery",
            JSON.stringify({
                ...formData,
                passenger,
                fromDestination,
                toDestination,
                isReturn,
            })
        );
        navigate({
            to: `/users/public/detailPenerbangan?${new URLSearchParams(formData).toString()}`,
        });
    };

    useEffect(() => {
        if (isReturn && searchDate.to && fromDestinationId && toDestinationId) {
            setIsReturnFilled(true);
        } else if (
            isReturn &&
            !searchDate.to &&
            !fromDestinationId &&
            !toDestinationId
        ) {
            setIsReturnFilled(false);
        }
    }, [searchDate, isReturn, fromDestinationId, toDestinationId]);

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
                            <div className="relative flex-1">
                                <div className="flex items-center flex-1 gap-3 relative">
                                    <FlightTakeoffIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        From
                                    </span>
                                    <button
                                        className="flex-1 pb-1 mx-3 text-lg text-start font-semibold border-b"
                                        onClick={() => {
                                            setShowFromDestinationModal(true);
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

                                {showFromDestinationModal && (
                                    <>
                                        <DestinationModal
                                            setShowDestinationModal={
                                                setShowDestinationModal
                                            }
                                            setShowFromDestinationModal={
                                                setShowFromDestinationModal
                                            }
                                            setFromDestination={
                                                setFromDestination
                                            }
                                            setToDestination={setToDestination}
                                            isFromModal={isFromModal}
                                            setIsFromModal={setIsFromModal}
                                            fromDestination={fromDestination}
                                            toDestination={toDestination}
                                            setFromDestinationId={
                                                setFromDestinationId
                                            }
                                            setToDestinationId={
                                                setToDestinationId
                                            }
                                            airportList={airportList}
                                            isSuccess={isSuccess}
                                        />
                                        <div
                                            className="fixed z-1 w-screen h-screen inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                            onClick={() => {
                                                setIsFromModal(false);
                                                setShowFromDestinationModal(
                                                    false
                                                );
                                            }}
                                        ></div>
                                    </>
                                )}
                            </div>
                            <button>
                                <SwapHorizIcon
                                    fontSize="large"
                                    sx={{ color: "#4B1979" }}
                                    onClick={() => {
                                        const fromTemp = fromDestination;
                                        const fromIdTemp = fromDestinationId;
                                        setFromDestination(toDestination);
                                        setFromDestinationId(toDestinationId);
                                        setToDestinationId(fromIdTemp);
                                        setToDestination(fromTemp);
                                    }}
                                />
                            </button>
                            <div className="flex-1 relative">
                                <div className="flex items-center flex-1 gap-3">
                                    <FlightTakeoffIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        To
                                    </span>
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
                                            setFromDestination={
                                                setFromDestination
                                            }
                                            setShowFromDestinationModal={
                                                setShowFromDestinationModal
                                            }
                                            setToDestination={setToDestination}
                                            isFromModal={isFromModal}
                                            setIsFromModal={setIsFromModal}
                                            fromDestination={fromDestination}
                                            toDestination={toDestination}
                                            setFromDestinationId={
                                                setFromDestinationId
                                            }
                                            setToDestinationId={
                                                setToDestinationId
                                            }
                                            airportList={airportList}
                                            isSuccess={isSuccess}
                                        />
                                        <div
                                            className="fixed z-1 w-screen h-screen inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                            onClick={() => {
                                                setIsFromModal(false);
                                                setShowDestinationModal(false);
                                            }}
                                        ></div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* date & passenger*/}
                        <div className="flex flex-col w-full gap-4 justify-between sm:flex-row">
                            {/* date */}
                            <div className="flex items-start flex-1 gap-3 relative sm:items-center">
                                <DateRangeIcon color="disabled" />
                                <span className="text-gray-500 w-10">
                                    Tanggal
                                </span>
                                <div className="flex flex-col gap-4 flex-1 justify-between md:flex-row phone:gap-0">
                                    <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1">
                                        <span className="text-gray-500 w-10">
                                            Keberangkatan
                                        </span>
                                        <button
                                            className="flex-1 text-lg text-start font-semibold overflow-hidden whitespace-nowrap text-ellipsis"
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
                                                <span>Kembali</span>
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
                                                className={`${isReturn ? "text-darkblue4" : "text-darkblue2"} overflow-hidden whitespace-nowrap text-ellipsis`}
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
                                            Penumpang
                                        </span>
                                        <button
                                            className="flex-1 text-lg text-start font-semibold text-nowrap"
                                            onClick={() =>
                                                setShowPassengerModal(true)
                                            }
                                        >
                                            {passenger?.ADULT +
                                                passenger?.CHILD +
                                                passenger?.INFANT}{" "}
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
                                                Kelas Kursi
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
                    disabled={
                        (isReturn && !isReturnFilled) ||
                        (toDestination
                            ? fromDestination
                                ? false
                                : true
                            : false)
                    }
                >
                    Cari Penerbangan
                </button>
            </div>
        </div>
    );
};

export default HomepageTicketSearch;
