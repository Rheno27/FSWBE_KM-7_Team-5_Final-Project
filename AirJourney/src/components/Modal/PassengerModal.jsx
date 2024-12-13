import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import ManIcon from "@mui/icons-material/Man";
import GirlIcon from '@mui/icons-material/Girl';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

const PassengerModal = ({ setShowPassengerModal, passenger, setPassenger }) => {
    const [adult, setAdult] = useState(passenger?.adult || 0);
    const [child, setChild] = useState(passenger?.child || 0);
    const [infant, setInfant] = useState(passenger?.infant || 0);

    useEffect(() => {
        setPassenger({ adult, child, infant });
    }, [adult, child, infant]);
    
    return (
        <div className="absolute -inset-x-1/2 md:inset-x-0 md:inset-y-16 z-2 w-fit md:mx-auto h-fit rounded-xl p-4 bg-white">
            <div className="flex justify-end mb-4">
                <CloseIcon
                    className="cursor-pointer"
                    onClick={() => setShowPassengerModal(false)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col phone:flex-row gap-2 md:gap-20 border-b pb-2 justify-between">
                    <div className="flex gap-2">
                        <ManIcon />
                        <div className="flex flex-col text-nowrap">
                            <span className="font-bold">Dewasa</span>
                            <span className="text-slate-500">
                                (12 tahun keatas)
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-1 h-fit w-fit">
                        <button
                            className="border-1 border-darkblue4 p-2 rounded-lg"
                            onClick={() => adult > 0 && setAdult(adult - 1)}
                        >
                            <RemoveIcon
                                fontSize="medium"
                                sx={{ color: "#4B1979" }}
                            />
                        </button>
                        <div className="border-1 border-darkblue2 rounded-lg w-14 flex items-center justify-center text-lg">
                            {adult}
                        </div>
                        <button
                            className="border-1 border-darkblue4 p-2 rounded-lg"
                            onClick={() => setAdult(adult + 1)}
                        >
                            <AddIcon
                                fontSize="medium"
                                sx={{ color: "#4B1979" }}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col phone:flex-row gap-2 md:gap-20 border-b pb-2 justify-between">
                    <div className="flex gap-2">
                        <GirlIcon />
                        <div className="flex flex-col text-nowrap">
                            <span className="font-bold">Anak</span>
                            <span className="text-slate-500">
                                (2 - 11 tahun)
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-1 h-fit w-fit">
                        <button
                            className="border-1 border-darkblue4 p-2 rounded-lg"
                            onClick={() => child > 0 && setChild(child - 1)}
                        >
                            <RemoveIcon
                                fontSize="medium"
                                sx={{ color: "#4B1979" }}
                            />
                        </button>
                        <div className="border-1 border-darkblue2 rounded-lg w-14 flex items-center justify-center text-lg">
                            {child}
                        </div>
                        <button
                            className="border-1 border-darkblue4 p-2 rounded-lg"
                            onClick={() => setChild(child + 1)}
                        >
                            <AddIcon
                                fontSize="medium"
                                sx={{ color: "#4B1979" }}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 flex-col phone:flex-row md:gap-20 border-b pb-2 justify-between">
                    <div className="flex gap-2">
                        <ChildFriendlyIcon />
                        <div className="flex flex-col text-nowrap">
                            <span className="font-bold">Bayi</span>
                            <span className="text-slate-500">
                                (dibawah 2 tahun)
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-1 h-fit w-fit">
                        <button
                            className="border-1 border-darkblue4 p-2 rounded-lg"
                            onClick={() => infant > 0 && setInfant(infant - 1)}
                        >
                            <RemoveIcon
                                fontSize="medium"
                                sx={{ color: "#4B1979" }}
                            />
                        </button>
                        <div className="border-1 border-darkblue2 rounded-lg w-14 flex items-center justify-center text-lg">
                            {infant}
                        </div>
                        <button
                            className="border-1 border-darkblue4 p-2 rounded-lg"
                            onClick={() => setInfant(infant + 1)}
                        >
                            <AddIcon
                                fontSize="medium"
                                sx={{ color: "#4B1979" }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PassengerModal.propTypes = {
    setShowPassengerModal: PropTypes.any,
    setPassenger: PropTypes.any,
    passenger: PropTypes.object,
};
export default PassengerModal;
