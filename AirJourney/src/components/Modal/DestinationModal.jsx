import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const DestinationModal = ({
    setShowDestinationModal,
    setFromDestination,
    setToDestination,
    isFromModal,
    setIsFromModal,
    fromDestination,
    toDestination,
}) => {
    const [search, setSearch] = useState(
        isFromModal ? fromDestination : toDestination
    );
    const [destinationHistory, setDestinationHistory] = useState(
        JSON.parse(localStorage.getItem("destination_history")) || []
    );
    /*
    const {
        data: airportList,
        isSuccess,
        isPending,
    } = useQuery({
        queryKey: "airports",
        queryFn: () => {
            axios.get(`${import.meta.env.VITE_API_URL}/airports`);
        },
    });
    */
    const destinationClickHandler = (name) => {
        if (isFromModal) {
            setFromDestination(name);
            setIsFromModal(false);
        } else {
            setToDestination(name);
        }
        setShowDestinationModal(false);
    };

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            setShowDestinationModal(false);
            setIsFromModal(false);
            localStorage.setItem(
                "destination_history",
                JSON.stringify([...destinationHistory, search])
            );
            if (isFromModal) {
                setFromDestination(search);
            } else {
                setToDestination(search);
            }
        }
    };

    const deleteHandler = () => {
        localStorage.removeItem("destination_history");
        setDestinationHistory([]);
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
                        className="focus:outline-none w-full"
                        placeholder="Masukkan Kota atau Negara"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={onKeyDownHandler}
                    />
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
                    <span
                        className="font-semibold text-base text-red-500 cursor-pointer active:text-red-700"
                        onClick={deleteHandler}
                    >
                        Hapus
                    </span>
                </div>
                <div className="flex flex-col flex-1 gap-3 py-3 overflow-auto">
                    {destinationHistory.map((data) => (
                        <div
                            key={data}
                            className="flex justify-between border-b py-2"
                        >
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    destinationClickHandler(data);
                                }}
                            >
                                {data}
                            </span>
                            <CloseIcon
                                color="disabled"
                                className="cursor-pointer"
                                onClick={() => {}}
                            />
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
};
export default DestinationModal;
