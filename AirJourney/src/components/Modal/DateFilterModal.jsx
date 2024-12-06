import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { DayPicker } from "react-day-picker";  // Import DayPicker
import "react-day-picker/dist/style.css";  // Import default styles for DayPicker

function DateFilterModal({ show, onHide }) {
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
    onHide(); // Close the modal after saving
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter By Date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* DayPicker for date selection */}
        <DayPicker selected={selectedDate} onDayClick={handleDateChange} />
        <div className="mt-3">
          {selectedDate ? (
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          ) : (
            <p>Please select a date</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DateFilterModal;
