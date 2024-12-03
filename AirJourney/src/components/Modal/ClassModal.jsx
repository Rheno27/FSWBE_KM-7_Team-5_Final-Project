import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ClassModal = ({ setShowClassModal, classType, setClassType }) => {
    const classList = [
        { name: "Economy", price: "IDR 4.950.000" },
        { name: "Premium Economy", price: "IDR 7.550.000" },
        { name: "Business", price: "IDR 29.220.000" },
        { name: "First", price: "IDR 87.620.000" },
    ];

    return (
        <div className="absolute inset-y-16 z-2 w-80 mx-auto h-fit rounded-xl p-4 bg-white">
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
                            <div className="flex flex-col text-left">
                                <span className="font-bold">{item.name}</span>
                                <span
                                    className={
                                        classType == item.name
                                            ? "text-white"
                                            : "text-darkblue4"
                                    }
                                >
                                    {item.price}
                                </span>
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
