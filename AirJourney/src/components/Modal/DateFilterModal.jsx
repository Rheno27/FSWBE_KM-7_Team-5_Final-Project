import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import CloseIcon from "@mui/icons-material/Close";
import "react-day-picker/dist/style.css";
import "./dateModal.css"; 

const DateFilterModal = ({isOpen, onClose, position}) => {
  if (!isOpen) return null;

  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle save action
  const handleSave = () => {
    if (selectedDate) {
      console.log("Selected Date: ", selectedDate);
      // You can handle the date or filter logic here
    }
    onClose(); // Close the modal after saving
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="custom-modal" style={position}>
        <div className="modal-header">
          <button onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="modal-body">
          {/* DayPicker for date selection */}
        <DayPicker selected={selectedDate} onDayClick={handleDateChange} />
        <div className="mt-3">
          {selectedDate ? (
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          ) : (
            <p>Please select a date</p>
          )}
        </div>
          <button onClick={handleSave} className="save-button justify-content-end">Simpan</button>
        </div>
      </div>
    </>
  );
};

export default DateFilterModal;

