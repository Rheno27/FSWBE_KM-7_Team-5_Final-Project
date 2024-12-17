import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";

const DestinationModal = ({
    setShowDestinationModal,
    setFromDestination,
    setToDestination,
    isFromModal,
    setIsFromModal,
    fromDestination,
    toDestination,
    setFromDestinationId,
    setToDestinationId,
}) => {
    const [search, setSearch] = useState(
        isFromModal ? fromDestination : toDestination
    );
    const [destinationHistory, setDestinationHistory] = useState(
        JSON.parse(localStorage.getItem("destination_history")) || []
    );

    const [filteredSearch, setFilteredSearch] = useState([]);

    const { data: airportList, isSuccess } = useQuery({
        queryKey: ["airports"],
        queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/airports`),
    });

    useEffect(() => {
        if (isSuccess) {
            setDestinationHistory([...airportList.data.data]);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccess && destinationHistory && search) {
            setFilteredSearch(
                destinationHistory.filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [destinationHistory, search]);

    useEffect(() => {
        console.log(destinationHistory);
    }, [destinationHistory]);

    const destinationClickHandler = (name, id) => {
        if (isFromModal) {
            setFromDestination(name);
            setFromDestinationId(id);
            setIsFromModal(false);
        } else {
            setToDestination(name);
            setToDestinationId(id);
        }
        setShowDestinationModal(false);
    };

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            setShowDestinationModal(false);
            setIsFromModal(false);
            // localStorage.setItem(
            //     "destination_history",
            //     JSON.stringify([...destinationHistory, search])
            // );
            if (isFromModal) {
                setFromDestination(search);
            } else {
                setToDestination(search);
            }
        }
    };

    return (
        <div className="absolute md:inset-12 z-2 w-full max-w-3xl mx-auto h-80 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-1 items-center border-1 border-gray-400 rounded-lg gap-3 px-3 py-1">
                    <SearchIcon color="disabled" fontSize="large" />
                    <input
                        type="text"
                        name=""
                        id=""
                        value={search}
                        className="focus:outline-none w-full relative"
                        placeholder="Masukkan Kota atau Negara"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={onKeyDownHandler}
                    />
                    {search && (
                        <div className="absolute flex flex-col items-start w-full h-fit p-2 px-4 -inset-x-0 inset-y-20 bg-white border-b-4 border-darkblue5">
                            {filteredSearch.map((item) => (
                                <button
                                    key={item.id}
                                    className="w-full text-start py-2 px-4 border-b text-darkblue4 font-semibold"
                                    onClick={()=>{destinationClickHandler(item.name, item.id)}}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <CloseIcon
                    onClick={() => {
                        setShowDestinationModal(false);
                        setIsFromModal(false);
                    }}
                    fontSize="large"
                    className="cursor-pointer"
                />
            </div>
            <div className="flex flex-col py-4 h-64">
                <div className="flex justify-between">
                    <span className="font-semibold text-lg">
                        Pencarian terkini
                    </span>
                </div>
                <div className="flex flex-col flex-1 gap-3 py-3 overflow-auto">
                    {destinationHistory.map((data) => (
                        <div
                            key={data.id}
                            className="flex justify-between border-b py-2"
                        >
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    destinationClickHandler(data.name, data.id);
                                }}
                            >
                                {data.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

DestinationModal.propTypes = {
    setShowDestinationModal: PropTypes.any,
    setFromDestination: PropTypes.any,
    setToDestination: PropTypes.any,
    setIsFromModal: PropTypes.any,
    isFromModal: PropTypes.bool,
    fromDestination: PropTypes.string,
    toDestination: PropTypes.string,
    setFromDestinationId: PropTypes.any,
    setToDestinationId: PropTypes.any,
};
export default DestinationModal;
