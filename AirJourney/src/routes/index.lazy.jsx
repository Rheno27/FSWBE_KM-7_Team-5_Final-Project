import { createLazyFileRoute } from "@tanstack/react-router";
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
import dummy from "../data/dummy.json";

export const Route = createLazyFileRoute("/")({
    component: Index,
});
function Index() {
    // for component state
    const [isReturn, setIsReturn] = useState(false);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [isFromModal, setIsFromModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showPassengerModal, setShowPassengerModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(true);
    const loadersCount = [1, 2, 3, 4];

    //for search value
    const [destination, setDestination] = useState(1);
    const [fromDestination, setFromDestination] = useState("Jakarta");
    const [toDestination, setToDestination] = useState("Inti Bumi");
    const [searchDate, setSearchDate] = useState(new Date());
    const [passenger, setPassenger] = useState({ adult: 1, child: 0, baby: 0 });
    const [classType, setClassType] = useState("Economy");

    const [formData, setFormData] = useState({
        fromDestination,
        toDestination,
        searchDate,
        passenger,
        classType,
    });

    const month = [
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
    const destinationQueryTest = dummy.destination_query;
    const [destinationListTest, setDestinationListTest] = useState(
        dummy.destination_list
    );

    useEffect(() => {
        setFormData({
            fromDestination,
            toDestination,
            searchDate,
            passenger,
            classType,
        });
        const dataCheck = [
            fromDestination,
            toDestination,
            searchDate,
            passenger.adult + passenger.child + passenger.baby,
            classType,
        ];
        setIsFormFilled(true);
        dataCheck.map((item) => {
            !item && setIsFormFilled(false);
        });
    }, [fromDestination, toDestination, searchDate, passenger, classType]);

    const seedLoader = () => {
        setTimeout(() => {
            setDestinationListTest(
                destinationListTest.concat(dummy.destination_list)
            );
        }, 3000);
    };
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
                <div className="w-full max-w-5xl flex justify-between flex-col h-72 -top-16 rounded-xl bg-white border shadow-sm absolute">
                    <div className="h-full flex flex-col px-8 py-6 gap-3">
                        <div className="font-bold text-xl">
                            Pilih Jadwal Penerbangan spesial di{" "}
                            <span className="text-darkblue5">Terbangin!</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            {/* destination */}
                            <div className="flex w-full gap-4 justify-between relative">
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
                            <div className="flex w-full gap-4 justify-between">
                                {/* date */}
                                <div className="flex items-center flex-1 gap-3 relative">
                                    <DateRangeIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        Date
                                    </span>
                                    <div className="flex flex-1 justify-between">
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
                                                    ? `${searchDate.from.getDate()} - ${month[searchDate.from.getMonth()]} - ${searchDate.from.getFullYear()}`
                                                    : `${searchDate.getDate()} - ${month[searchDate.getMonth()]} - ${searchDate.getFullYear()}`}
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
                                                        ? `${searchDate.to.getDate()} - ${month[searchDate.to.getMonth()]} - ${searchDate.to.getFullYear()}`
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
                                <div className="flex items-center flex-1 gap-3">
                                    <AirlineSeatReclineNormalIcon color="disabled" />
                                    <span className="text-gray-500 w-10">
                                        To
                                    </span>
                                    <div className="flex flex-1 justify-between">
                                        {/* passenger */}
                                        <div className="flex flex-1 flex-col pb-1 mx-3 border-b gap-1 relative">
                                            <span className="text-gray-500 w-10">
                                                Passengers
                                            </span>
                                            <button
                                                className="flex-1 text-lg text-start font-semibold"
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
                        className="py-2.5 bg-darkblue4 text-white font-semibold rounded-b-xl disabled:bg-darkblue3"
                        disabled={!isFormFilled}
                    >
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
                    className="flex flex-row gap-8 flex-wrap justify-center"
                    dataLength={destinationListTest.length}
                    next={seedLoader}
                    hasMore={true}
                    loader={loadersCount.map((count) => (
                        <div
                            key={count?.id}
                            className="flex flex-col rounded-xl overflow-hidden border-1 shadow-sm p-3 gap-2 w-52 animate-pulse"
                        >
                            <div className="rounded-md overflow-hidden w-full h-28 bg-darkblue1"></div>
                            <div className="flex flex-col flex-initial gap-2">
                                <div className="w-full h-4 bg-darkblue1"></div>
                                <div className="w-full h-4 bg-darkblue1"></div>
                                <div className="w-full h-4 bg-darkblue1"></div>
                            </div>
                        </div>
                    ))}
                    endMessage={<span>yay</span>}
                >
                    {destinationListTest.map((data) => (
                        <div
                            key={data?.id}
                            className="flex flex-col rounded-xl overflow-hidden border-1 shadow-sm p-3 gap-2 w-52"
                        >
                            <img
                                src={data?.picture}
                                alt=""
                                className="rounded-md overflow-hidden w-full h-28"
                            />
                            <div className="flex flex-col flex-initial">
                                <p className="font-medium">
                                    {data?.from} {"->"} {data?.to}
                                </p>
                                <p className="font-bold text-sm text-darkblue4">
                                    {data?.airline}
                                </p>
                                <p className="text-sm">{data?.date}</p>
                                <p className="">
                                    Mulai dari{" "}
                                    <span className="font-bold text-[#FF0000]">
                                        IDR {data?.price}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}
