import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import dummy from "../../data/dummy.json";

const DateModal = ({
    setShowDateModal,
    setFromDestination,
    setToDestination,
    isFromModal,
    setIsFromModal,
}) => {
    const destinationList = dummy.destination_query;
    const destinationClickHandler = (name) => {
        if (isFromModal) {
            setFromDestination(name);
            setIsFromModal(false);
        } else {
            setToDestination(name);
        }
        setShowDateModal(false);
    };
    return (
            <div className="absolute inset-16 z-2 w-full max-w-3xl mx-auto h-80 rounded-xl p-4 bg-white">
                <CloseIcon className="cursor-pointer" onClick={() => setShowDateModal(false)}/>
            </div>
    );
};

DateModal.propTypes = {
    setShowDateModal: PropTypes.any,
    setFromDestination: PropTypes.any,
    setToDestination: PropTypes.any,
    setIsFromModal: PropTypes.any,
    isFromModal: PropTypes.bool,
};
export default DateModal;
