import React, { useState } from "react";
import "./sorting.css"; 

const sortOptions = [
  { label: "Harga - Termurah", value: "price_asc" },
  { label: "Durasi - Terpendek", value: "duration_shortest" },
  { label: "Keberangkatan - Paling Awal", value: "departure_earliest" },
  { label: "Keberangkatan - Paling Akhir", value: "departure_latest" },
  { label: "Kedatangan - Paling Awal", value: "arrival_earliest" },
  { label: "Kedatangan - Paling Akhir", value: "arrival_latest" },
];

const SortingButton = ({ selectedSort, onSortChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleApplySorting = () => {
    // Trigger sorting action when button is clicked
    setIsDropdownVisible(false); // Close dropdown after applying
  };

  return (
    <div className="sorting-button">
      {/* Main Button to toggle dropdown */}
      <button
        className="sort-main-button"
        onClick={toggleDropdown}
        onBlur={() => setIsDropdownVisible(false)} // Hide dropdown when focus is lost
      >
        {selectedSort} <span className="caret-icon">▼</span>
      </button>

      {/* Sorting Options Dropdown */}
      {isDropdownVisible && (
        <div className="sort-dropdown">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`sort-option ${option.label === selectedSort ? "selected" : ""}`}
              onClick={() => {
                onSortChange(option);
                setIsDropdownVisible(false); // Close dropdown after selecting an option
              }}
            >
              {option.label}
            </div>
          ))}
          
          <button
            className="sort-apply-button"
            onClick={handleApplySorting}
          >
            Pilih
          </button>
        </div>
      )}
    </div>
  );
};

export default SortingButton;
