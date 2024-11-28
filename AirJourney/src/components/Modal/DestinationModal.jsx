import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const DestinationModal = ({ setShowDestinationModal,setFromDestination,setToDestination,isFromModal }) => {
    return (
        <div className="fixed z-50 w-full h-full inset-0 bg-opacity-50 bg-black flex overflow-hidden items-center">
            <div className="relative w-full max-w-3xl mx-auto h-80 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center border-1 border-gray-400 rounded-lg gap-3 px-3 py-1">
                        <SearchIcon color="disabled" fontSize="large" />
                        <input
                            type="text"
                            name=""
                            id=""
                            className="focus:outline-none w-full"
                            placeholder="Masukkan Kota atau Negara"
                        />
                    </div>
                    <CloseIcon
                        onClick={() => setShowDestinationModal(false)}
                        fontSize="large"
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex flex-col py-4">
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
                        {/*  */}
                        <div className="flex justify-between border-b py-2">
                            <span>{`Djakarta`}</span>
                            <CloseIcon
                                color="disabled"
                                className="cursor-pointer"
                                onClick={() => {}}
                            />
                        </div>
                        <div className="flex justify-between border-b py-2">
                            <span>{`Djakarta`}</span>
                            <CloseIcon
                                color="disabled"
                                className="cursor-pointer"
                                onClick={() => {}}
                            />
                        </div>
                        <div className="flex justify-between border-b py-2">
                            <span>{`Djakarta`}</span>
                            <CloseIcon
                                color="disabled"
                                className="cursor-pointer"
                                onClick={() => {}}
                            />
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    );
};

DestinationModal.propTypes = {
    setShowDestinationModal: PropTypes.any,
    setFromDestination: PropTypes.any,
    setToDestination: PropTypes.any,
    isFromModal: PropTypes.bool,
};
export default DestinationModal;
