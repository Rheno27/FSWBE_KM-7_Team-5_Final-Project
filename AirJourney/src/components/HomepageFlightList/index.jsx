import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";
import HomepageFlightClick from "../HomepageFlightClick";

const HomepageFlightList = () => {
    const [isHasMore, setIsHasMore] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const loadersCount = [1, 2, 3, 4];
    const [cursorId, setCursorId] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    //for search value
    const [destination, setDestination] = useState("ALL");

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

    const seedLoader = (destinationQuery, isDestinationChanged) => {
        setIsHasMore(true);
        const params = {};

        if (destination != "ALL") {
            params.continent = destinationQuery || destination;
        }
        if (isDestinationChanged) {
            setDestinationList([]);
        } else if (destinationList.length > 0) {
            params.cursorId = cursorId;
        }

        axios
            .get(`${import.meta.env.VITE_API_URL}/flights`, { params })
            .then((res) => {
                const newFlights = res.data.data.filter((flight) => {
                    return !destinationList.find((existingFlight) => existingFlight.id === flight.id);
                });
                isDestinationChanged
                    ? setDestinationList(res.data.data)
                    : setDestinationList([
                          ...destinationList,
                          ...newFlights,
                      ]);
                setCursorId(res.data.meta.cursorId);
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
        <div className="w-full max-w-5xl flex flex-col px-8 pt-96 mt-16 gap-4 sm:mt-0 sm:pt-24 lg:pt-0 lg:mt-0">
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
                loader={loadersCount.map((count, index) => (
                    <div
                        key={index}
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
                            className="flex flex-col rounded-xl overflow-hidden border-1 shadow-sm p-3 gap-2 w-72 sm:w-52 cursor-pointer"
                            onClick={() => {
                                setIsShowModal(true);
                                setSelectedFlight(data);
                            }}
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
            {isShowModal && (
                <div className="fixed z-0 w-full h-full inset-0 flex overflow-hidden items-center justify-center">
                    <HomepageFlightClick setIsShowModal={setIsShowModal} selectedFlight={selectedFlight} />
                    <div
                        className="fixed z-1 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center"
                        onClick={() => setIsShowModal(false)}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default HomepageFlightList;
