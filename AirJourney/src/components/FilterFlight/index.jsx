import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import "./sorting.css";

const sortOptions = [
  { label: "Harga - Termurah" },
  { label: "Durasi - Terpendek" },
  { label: "Keberangkatan - Paling Awal" },
  { label: "Keberangkatan - Paling Akhir" },
  { label: "Kedatangan - Paling Awal"},
  { label: "Kedatangan - Paling Akhir"},
];

const SortingButton = ({ selectedSort, onSortChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleSortOptionClick = (option) => {
    const isSelected = selectedSort.some((sort) => sort.value === option.value);
    
    if (isSelected) {
      // Remove the option from selectedSort
      onSortChange(selectedSort.filter((sort) => sort.value !== option.value));
    } else {
      // Add the option to selectedSort
      onSortChange([...selectedSort, option]);
    }
  };

  const handleApplySorting = () => {
    setIsDropdownVisible(false);
  };

  return (
    <div className="sorting-button">
      <button
        className="sort-main-button"
        onClick={toggleDropdown}
        onBlur={() => setIsDropdownVisible(false)}
      >
        {selectedSort.length > 0
          ? selectedSort.map((sort) => sort.label).join(", ")
          : "Sort by"}{" "}
        <span className="caret-icon"><FaSort /></span>
      </button>

      {/* Sorting Options Dropdown */}
      {isDropdownVisible && (
        <div className="sort-dropdown">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`sort-option ${
                selectedSort.some((sort) => sort.value === option.value)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleSortOptionClick(option)}
            >
              <span>
                <strong>{option.label.split(" - ")[0]}</strong> - {option.label.split(" - ")[1]}
              </span>
            </div>
          ))}

          <button className="sort-apply-button" onClick={handleApplySorting}>
            Pilih
          </button>
        </div>
      )}
    </div>
  );
};

const FlightList = () => {
  // Ensure selectedSort is always an array
  const [selectedSort, setSelectedSort] = useState([]);

  const onSortChange = (newSort) => {
    // Ensure newSort is an array before updating the state
    if (Array.isArray(newSort)) {
      setSelectedSort(newSort);
    }
  };

  return (
    <div>
      <SortingButton selectedSort={selectedSort} onSortChange={onSortChange} />
      {/* Render the sorted flight list */}
      <div className="flight-list">
        {selectedSort.length > 0 && (
          <div className="applied-sort">
            <h6>
                Sorted by:
            </h6>
            <ul>
              {selectedSort.map((sort) => (
                <li key={sort.value}>{sort.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightList;