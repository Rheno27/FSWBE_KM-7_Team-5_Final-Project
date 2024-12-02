import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

const DateModal = ({
    setShowDateModal,
    isReturn,
    searchDate,
    setSearchDate,
}) => {
    const [date, setDate] = useState(searchDate);
    useEffect(() => {
        console.log(date);
    }, [date]);
    return (
        <div className="absolute inset-16 z-2 w-fit mx-auto h-96 rounded-xl p-4 bg-white">
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
                    required
                />
                {/* <Calendar selected={date} onSelect={setDate} mode="range" /> */}
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
