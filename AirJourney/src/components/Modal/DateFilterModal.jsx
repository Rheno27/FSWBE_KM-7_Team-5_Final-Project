import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import Close from "@mui/icons-material/Close";
import "react-day-picker/dist/style.css";
import "./style.css"; 

const DateFilterModal = ({isOpen, onClose, position, onFilter}) => {
  if (!isOpen) return null;

  // const allTransactions = transactions?.data || [];
  // const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);

  const handleSave = () => {
    if (selectedRange) {
      console.log("Selected Date(s): ", selectedRange);
    }
    onFilter(selectedRange); 
    onClose(); 
  };

  // Handle date selection
  // const handleDateChange = (date) => {
  //   setSelectedRange(date);
  // };

  // const filterTransactions = () => {
  //   if (!selectedDate) {
  //     setFilteredTransactions(allTransactions);
  //     return;
  //   }

  //   const isRange = Array.isArray(selectedDate);
  //   const filtered = allTransactions.filter((transaction) => {
  //     const transactionDate = new Date(transaction.createdAt);

  //     if (isRange) {
  //       const [startDate, endDate] = selectedDate.map((date) => new Date(date));
  //       return transactionDate >= startDate && transactionDate <= endDate;
  //     } else {
  //       const filterDate = new Date(selectedDate);
  //       return transactionDate.toDateString() === filterDate.toDateString();
  //     }
  //   });

  //   setFilteredTransactions(filtered);
  // };

  // Handle save action
  // const handleSave = () => {
  //   if (selectedDate) {
  //     console.log("Selected Date: ", selectedDate);
  //     filterTransactions();
  //   }
  //   onClose(); // Close the modal after saving
  // };

  return (
    <>
      <div className='modal-overlay' onClick={onClose} />
      <div className='custom-modal'style={position}>
        <div className='modal-header'>
          <Close onClick={onClose} className={{cursor: 'pointer'}} />
        </div>
        <div>
          {/* DayPicker for date selection */}
        {/* <DayPicker selected={selectedDate} onDayClick={handleDateChange} /> */}
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
        {/* <div className="mx-4">
          {selectedDate ? (
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          ) : (
            <p>Please select a date</p>
          )}
        </div> */}
          <div className="d-flex justify-content-end">
            <button onClick={handleSave} className='save-button'>Simpan</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateFilterModal;

