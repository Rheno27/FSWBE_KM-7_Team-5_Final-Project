import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import Close from "@mui/icons-material/Close";
import "react-day-picker/dist/style.css";
import "./DateFilterModal.css";
import { Col, Row } from "react-bootstrap";

const DateFilterModal = ({ isOpen, onClose, position, onFilter, onClear }) => {
  if (!isOpen) return null;
  const [selectedRange, setSelectedRange] = useState(null);

  const handleSave = () => {
    if (selectedRange) {
      let fromDate = selectedRange.from;
      let toDate = selectedRange.to || fromDate;
  
      // Adjust 'to' date only if it's a single date selection
      if (!selectedRange.to) {
        toDate = new Date(fromDate);
        toDate.setHours(23, 59, 59, 999); // Set 'to' to the end of the day
      }
  
      // Pass the updated range to the parent component
      onFilter({ from: fromDate, to: toDate });
    }

    onClose();
  };

  const handleClear = () => {
    onClear();
    onClose();
  }

  const handleSelect = (range) => {
    if (range && range.from && !range.to) {
      range.to = range.from; // If no 'to' date, set 'to' to 'from'
    }
    setSelectedRange(range);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="custom-modal" style={position}>
        <div className="d-flex justify-content-between mx-2">
          <Col xs={10}><span><small>Filter berdasarkan tanggal pesanan dibuat</small></span></Col>
          <Col className="text-end"><Close onClick={onClose} className={{ cursor: "pointer" }} /></Col>
        </div>
        <div>
          <DayPicker
            mode="range" // Supports single or range selection
            selected={selectedRange}
            onSelect={handleSelect}
            footer={
              selectedRange && selectedRange.from && selectedRange.to ? (
                <p>
                  From {selectedRange?.from?.toLocaleDateString()} to{" "}
                  {selectedRange?.to?.toLocaleDateString()}
                </p>
              ) : (
                <p>Silahkan pilih rentang tanggal.</p>
              )
            }
          />
          <div className="d-flex justify-content-between mx-2">
          <button onClick={handleClear} className="clear-button">
              Hapus Filter
            </button>
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
