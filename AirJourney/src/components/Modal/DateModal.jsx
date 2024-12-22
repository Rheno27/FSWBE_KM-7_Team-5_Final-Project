import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Calendar } from "@/components/ui/calendar";
import {useState } from "react";

const DateModal = ({
    setShowDateModal,
    isReturn,
    searchDate,
    setSearchDate,
}) => {
    const [date, setDate] = useState(searchDate);
    return (
        <div className="absolute -inset-x-8 md:inset-16 z-2 w-fit md:mx-auto h-fit rounded-xl p-4 bg-white">
            <div className="flex justify-between">
                <span>Pilih Tanggal</span>
                <CloseIcon
                    className="cursor-pointer"
                    onClick={() => setShowDateModal(false)}
                />
            </div>
            <div className="flex">
                <Calendar
                    selected={date}
                    onSelect={(value) => {
                        if (isReturn && !value) {
                            return;
                        }
                        setDate(value);
                        setSearchDate(value);
                    }}
                    mode={isReturn ? "range" : "single"}
                    disabled={{ before: new Date() }}
                    required
                />
            </div>
        </div>
    );
};

DateModal.propTypes = {
    setShowDateModal: PropTypes.any,
    isReturn: PropTypes.bool,
    searchDate: PropTypes.any,
    setSearchDate: PropTypes.any,
};
export default DateModal;
