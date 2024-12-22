import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DestinationModal = ({
    setShowDestinationModal,
    setFromDestination,
    setShowFromDestinationModal,
    setToDestination,
    isFromModal,
    setIsFromModal,
    fromDestination,
    toDestination,
    setFromDestinationId,
    setToDestinationId,
    airportList,
    isSuccess,
}) => {
    const [search, setSearch] = useState("");
    const [destinationHistory, setDestinationHistory] = useState([]);

    const [filteredSearch, setFilteredSearch] = useState([]);

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

    const destinationClickHandler = (name, id) => {
        if (isFromModal) {
            setFromDestination(name);
            setFromDestinationId(id);
            setIsFromModal(false);
            setShowFromDestinationModal(false);
        } else {
            setToDestination(name);
            setToDestinationId(id);
            setShowDestinationModal(false);
        }
    };

    return (
        <div className="absolute z-2 w-full max-w-3xl mx-auto h-fit rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-1 items-center border-1 border-gray-400 rounded-lg gap-3 px-3 py-1">
                    <SearchIcon color="disabled" fontSize="large" />
                    <input
                        type="text"
                        name=""
                        id=""
                        value={search || ""}
                        className="focus:outline-none w-full relative"
                        placeholder="Masukkan Kota atau Negara"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <CloseIcon
                    onClick={() => {
                        setShowDestinationModal(false);
                        setShowFromDestinationModal(false);
                        setIsFromModal(false);
                    }}
                    fontSize="large"
                    className="cursor-pointer"
                />
            </div>
            <div className="flex flex-col py-4 h-fit max-h-96">
                <div className="flex justify-between">
                    <span className="font-semibold text-lg">
                        Pencarian terkini
                    </span>
                </div>
                <div className="flex flex-col flex-1 gap-2 py-3 overflow-auto">
                    {search
                        ? filteredSearch.map((data) => (
                              <div
                                  key={data.id}
                                  className="flex justify-between border-b py-1 text-sm cursor-pointer hover:bg-slate-200 rounded-md px-2"
                                  onClick={() => {
                                    destinationClickHandler(
                                        data.name,
                                        data.id
                                    );
                                }}
                              >
                                  <span>
                                      {data.name}
                                  </span>
                              </div>
                          ))
                        : destinationHistory.map((data) => (
                              <div
                                  key={data.id}
                                  className="flex justify-between border-b py-1 text-sm cursor-pointer hover:bg-slate-200 rounded-md px-2"
                                  onClick={() => {
                                    destinationClickHandler(
                                        data.name,
                                        data.id
                                    );
                                }}
                              >
                                  <span>
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
    setShowFromDestinationModal: PropTypes.any,
    setIsFromModal: PropTypes.any,
    isFromModal: PropTypes.bool,
    fromDestination: PropTypes.string,
    toDestination: PropTypes.string,
    setFromDestinationId: PropTypes.any,
    setToDestinationId: PropTypes.any,
    airportList: PropTypes.any,
    isSuccess: PropTypes.bool,
};
export default DestinationModal;
