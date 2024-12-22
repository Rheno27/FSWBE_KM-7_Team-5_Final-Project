import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import Close from "@mui/icons-material/Close";
import "react-day-picker/dist/style.css";
import "./style.css";

const DateFilterModal = ({ isOpen, onClose, position, onFilter }) => {
  if (!isOpen) return null;
  const [selectedRange, setSelectedRange] = useState(null);

  const handleSave = () => {
    if (selectedRange) {
      console.log("Selected Date(s): ", selectedRange);
      onFilter(selectedRange);
    }
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="custom-modal" style={position}>
        <div className="modal-header">
          <Close onClick={onClose} className={{ cursor: "pointer" }} />
        </div>
        <div>
          <DayPicker
            mode="range" // Supports single or range selection
            selected={selectedRange}
            onSelect={setSelectedRange}
            footer={
              selectedRange && selectedRange.from && selectedRange.to ? (
                <p>
                  From {selectedRange?.from?.toLocaleDateString()} to{" "}
                  {selectedRange?.to?.toLocaleDateString()}
                </p>
              ) : (
                <p>Please pick a date range.</p>
              )
            }
          />
          <div className="d-flex justify-content-end">
            <button onClick={handleSave} className="save-button">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateFilterModal;
