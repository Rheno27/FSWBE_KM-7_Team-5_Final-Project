import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//saya ingin mengubah semua bahasa inggris menjadi bahasa indonesia
const ClassModal = ({ setShowClassModal, classType, setClassType }) => {
    const classList = [
        { name: "Ekonomi" },
        { name: "Premium Ekonomi" },
        { name: "Bisnis" },
        { name: "Kelas Satu" },
    ];

    return (
        <div className="absolute -inset-x-1/2 md:inset-x-0 md:inset-y-16 z-2 w-fit md:mx-auto h-fit rounded-xl p-4 bg-white">
            <div className="flex justify-end mb-4">
                <CloseIcon
                    className="cursor-pointer"
                    onClick={() => setShowClassModal(false)}
                />
            </div>
            <div className="flex flex-col text-nowrap gap-2">
                {classList.map((item) => {
                    return (
                        <button
                            key={item.name}
                            className={`flex items-center justify-between border-b rounded-lg py-2 px-4 ${classType == item.name ? "bg-darkblue5 text-white" : ""}`}
                            onClick={() => setClassType(item.name)}
                        >
                            <div className="flex flex-col text-left w-36 sm:w-52">
                                <span className="font-bold">{item.name}</span>
                            </div>
                            {classType == item.name && (
                                <CheckCircleIcon
                                    color="success"
                                    sx={{ color: "#73CA5C" }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

ClassModal.propTypes = {
    setShowClassModal: PropTypes.any,
    classType: PropTypes.string,
    setClassType: PropTypes.any,
};
export default ClassModal;
