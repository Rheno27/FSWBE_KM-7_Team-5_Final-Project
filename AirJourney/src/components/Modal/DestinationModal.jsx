import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import dummy from "../../data/dummy.json";
import { useEffect, useState } from "react";

const DestinationModal = ({
    setShowDestinationModal,
    setFromDestination,
    setToDestination,
    isFromModal,
    setIsFromModal,
}) => {
    const [search, setSearch] = useState("");
    const destinationList = dummy.destination_query;
    useEffect(() => {
        if (isFromModal) {
            setFromDestination(search);
        } else {
            setToDestination(search);
        }
    }, [search, isFromModal, setFromDestination, setToDestination]);
    const destinationClickHandler = (name) => {
        if (isFromModal) {
            setFromDestination(name);
            setIsFromModal(false);
        } else {
            setToDestination(name);
        }
        setShowDestinationModal(false);
    };
    return (
        <div className="absolute inset-12 z-2 w-full max-w-3xl mx-auto h-80 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-1 items-center border-1 border-gray-400 rounded-lg gap-3 px-3 py-1">
                    <SearchIcon color="disabled" fontSize="large" />
                    <input
                        type="text"
                        name=""
                        id=""
                        className="focus:outline-none w-full"
                        placeholder="Masukkan Kota atau Negara"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setShowDestinationModal(false);
                                setIsFromModal(false);
                            }
                        }}
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
                        onClick={() => {}}
                    >
                        Hapus
                    </span>
                </div>
                <div className="flex flex-col flex-1 gap-3 py-3 overflow-auto">
                    {destinationList.map((data) => (
                        <div
                            key={data.id}
                            className="flex justify-between border-b py-2"
                        >
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    destinationClickHandler(data.name);
                                }}
                            >
                                {data.name}
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
};
export default DestinationModal;
