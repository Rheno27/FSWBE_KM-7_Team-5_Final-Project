import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import "../index.css";
import banner from "../assets/img/home-banner.png";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import SearchIcon from "@mui/icons-material/Search";
import { Switch } from "@/components/ui/switch";
import DestinationModal from "../components/Modal/DestinationModal";
import DateModal from "../components/Modal/DateModal";
import ClassModal from "../components/Modal/ClassModal";
import PassengerModal from "../components/Modal/PassengerModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setFromDestinationRedux,
    setToDestinationRedux,
    setArrivalDateRedux,
    setDepartureDateRedux,
    setPassengerRedux,
    setClassTypeRedux,
    setIsReturnRedux,
} from "../redux/slices/searchQuery";

export const Route = createLazyFileRoute("/")({
    component: Index,
});
function Index() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for component state
    const [isReturn, setIsReturn] = useState(
        useSelector((state) => state.searchQuery.isReturn) || false
    );
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [isFromModal, setIsFromModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showPassengerModal, setShowPassengerModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);
    const [isHasMore, setIsHasMore] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const loadersCount = [1, 2, 3, 4];

    //for search value
    const [destination, setDestination] = useState("ALL");
    const [fromDestination, setFromDestination] = useState(
        useSelector((state) => state.searchQuery.fromDestination) || "Jakarta"
    );
    const [toDestination, setToDestination] = useState(
        useSelector((state) => state.searchQuery.toDestination) || "Inti Bumi"
    );
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

    // data
    const [destinationList, setDestinationList] = useState([]);
    const CONTINENT = [
        { id: "ALL", name: "Semua" },
        { id: "ASIA", name: "Asia" },
        { id: "EUROPE", name: "Eropa" },
        { id: "NORTH_AMERICA", name: "Amerika Utara" },
        { id: "SOUTH_AMERICA", name: "Amerika Selatan" },
        { id: "AUSTRALIA", name: "Australia" },
        { id: "ANTARCTICA", name: "Antartika" },
    ];
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
            //airportIdFrom: fromDestination,
            //airportIdTo: toDestination,
        };
        if (isReturn) {
            formData.departureDate = searchDate.from
                .toISOString()
                .split("T")[0];
            formData.arrivalDate = searchDate.to.toISOString().split("T")[0];
            dispatch(
                setDepartureDateRedux(
                    searchDate.from.toISOString().split("T")[0]
                )
            );
            dispatch(
                setArrivalDateRedux(searchDate.to.toISOString().split("T")[0])
            );
        } else {
            formData.departureDate = searchDate.toISOString().split("T")[0];
            dispatch(
                setDepartureDateRedux(searchDate.toISOString().split("T")[0])
            );
        }
        console.log(formData);
        navigate({to:`/users/public/detailPenerbangan?${new URLSearchParams(formData).toString()}`});
    };

    // for infinite scroll
    const seedLoader = (destinationQuery, isDestinationChanged) => {
        setIsHasMore(true);
        const params = {};

        if (destination != "ALL") {
            params.continent = destinationQuery || destination;
        }
        if (isDestinationChanged) {
            setDestinationList([]);
        } else if (destinationList.length > 0) {
            params.cursorId = destinationList[destinationList.length - 1].id;
        }

        axios
            .get(`${import.meta.env.VITE_API_URL}/flights`, { params })
            .then((res) => {
                isDestinationChanged
                    ? setDestinationList(res.data.data)
                    : setDestinationList([
                          ...destinationList,
                          ...res.data.data,
                      ]);
                if (res.data.data.length < 3) {
                    setIsHasMore(false);
                }
            });
    };

    useEffect(() => {
        if (isInitialized) {
            seedLoader(destination, true);
        } else {
            setIsInitialized(true);
        }
    }, [destination]);

    return (
        <div className="flex flex-col items-center">
            {/* banner */}
            <div className="w-full h-fit flex justify-center relative my-16 mb-24 bg-gradient-to-r from-white to-white md:from-darkblue3 md:to-darkblue3 phone:h-32 phone:mb-16">
                <div className="w-full max-w-7xl h-fit flex items-center justify-center absolute -top-14 phone:h-60">
                    <img src={banner} />
                </div>
            </div>

            {/* search */}
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
                                    <span className="text-gray-500 w-10">
                                        From
                                    </span>
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
                                            setToDestination={setToDestination}
                                            isFromModal={isFromModal}
                                            setIsFromModal={setIsFromModal}
                                            fromDestination={fromDestination}
                                            toDestination={toDestination}
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
                                    <span className="text-gray-500 w-10">
                                        Date
                                    </span>
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
                                                            setIsReturn(
                                                                !isReturn
                                                            );
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
                                                    {isReturn &&
                                                    searchDate.to > 1
                                                        ? `${searchDate.to.getDate()} - ${MONTH[searchDate.to.getMonth()]} - ${searchDate.to.getFullYear()}`
                                                        : `Pilih Tanggal`}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    {showDateModal && (
                                        <>
                                            <DateModal
                                                setShowDateModal={
                                                    setShowDateModal
                                                }
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
                                    <span className="text-gray-500 w-10">
                                        To
                                    </span>
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
                                                        setPassenger={
                                                            setPassenger
                                                        }
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
                                                        setClassType={
                                                            setClassType
                                                        }
                                                    />
                                                    <div
                                                        className="fixed z-1 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                                                        onClick={() =>
                                                            setShowClassModal(
                                                                false
                                                            )
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
                        className="py-2.5 bg-darkblue4 text-white font-semibold rounded-b-xl"
                        onClick={searchClickHandler}
                    >
                        Cari Penerbangan
                    </button>
                </div>
            </div>

            {/* list */}
            <div className="w-full max-w-5xl flex flex-col px-8 pt-96 mt-16 gap-4 phone:mt-0 sm:pt-24 lg:pt-0 lg:mt-0">
                {/* query */}
                <div className="flex flex-col gap-3">
                    <span className="font-bold text-lg">Destinasi Favorit</span>
                    <div className="flex gap-x-4 gap-y-4 flex-wrap">
                        {CONTINENT.map((data) => (
                            <button
                                key={data?.id}
                                onClick={() => {
                                    setDestination(data?.id);
                                }}
                                className={`flex gap-1 items-center rounded-xl px-6 py-2.5 ${destination == data?.id ? "bg-darkblue4 text-white" : "bg-darkblue1 text-black"}`}
                            >
                                <SearchIcon />
                                <span>{data?.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* result */}
                <InfiniteScroll
                    className="flex flex-row gap-8 flex-wrap justify-center mb-12"
                    dataLength={destinationList.length}
                    next={() => {
                        seedLoader();
                        console.log("from infinite");
                    }}
                    hasMore={isHasMore}
                    loader={loadersCount.map((count) => (
                        <div
                            key={count?.id}
                            className="flex flex-col rounded-xl overflow-hidden border-1 shadow-sm p-3 gap-2 w-72 animate-pulse sm:w-52"
                        >
                            <div className="rounded-md overflow-hidden w-full h-28 bg-darkblue1"></div>
                            <div className="flex flex-col flex-initial gap-2">
                                <div className="w-full h-4 bg-darkblue1"></div>
                                <div className="w-full h-4 bg-darkblue1"></div>
                                <div className="w-full h-4 bg-darkblue1"></div>
                            </div>
                        </div>
                    ))}
                    endMessage={
                        <span className="text-slate-500 w-screen text-center">
                            {destinationList.length
                                ? "Tidak ada destinasi lagi"
                                : "Tidak ada destinasi"}
                        </span>
                    }
                >
                    {destinationList.length > 0 &&
                        destinationList.map((data) => (
                            <div
                                key={data?.id}
                                className="flex flex-col rounded-xl overflow-hidden border-1 shadow-sm p-3 gap-2 w-72 sm:w-52"
                            >
                                <img
                                    src={data?.picture}
                                    alt=""
                                    className="rounded-md overflow-hidden w-full h-32"
                                />
                                <div className="flex flex-col flex-initial justify-between h-28">
                                    <p className="font-medium">
                                        {data?.airportFrom.city} {"->"}{" "}
                                        {data?.airportTo.city}
                                    </p>
                                    <div>
                                        <p className="font-bold text-sm text-darkblue4">
                                            {data?.airline.name}
                                        </p>
                                        <p className="text-sm">
                                            {data?.departureDate.split("T")[0]}
                                        </p>
                                        <p className="">
                                            Mulai dari{" "}
                                            <span className="font-bold text-[#FF0000]">
                                                IDR {data?.price}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}
