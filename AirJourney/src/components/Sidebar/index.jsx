import React, { useState } from "react";
import { IoCubeOutline } from "react-icons/io5";
import { FaRegHeart, FaDollarSign } from "react-icons/fa";

const Sidebar = () => {
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  // Handle checkbox change for class
  const handleClassChange = (event) => {
    const value = event.target.value;
    setClassFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Handle checkbox change for sortBy
  const handleSortByChange = (event) => {
    const value = event.target.value;
    setSortBy((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Handle radio change for sortOrder
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "60%",
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        // Responsive design for smaller screens
        "@media (max-width: 768px)": {
          width: "100%",
        },
      }}
    >
      <h5 className="fw-bold mb-3">Filter</h5>
      <ul className="list-unstyled">
        {/* Class */}
        <li className="mb-3">
          <button
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              fontSize: "1rem",
              padding: "0.5rem 0",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <IoCubeOutline style={{ fontSize: "1.5rem" }} /> Class
            </span>
          </button>
          <div>
            <label>
              <input
                type="checkbox"
                value="BUSINESS"
                checked={classFilter.includes("BUSINESS")}
                onChange={handleClassChange}
              />
              BUSINESS
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="PREMIUM_ECONOMY"
                checked={classFilter.includes("PREMIUM_ECONOMY")}
                onChange={handleClassChange}
              />
              PREMIUM ECONOMY
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="ECONOMY"
                checked={classFilter.includes("ECONOMY")}
                onChange={handleClassChange}
              />
              ECONOMY
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="FIRST_CLASS"
                checked={classFilter.includes("FIRST_CLASS")}
                onChange={handleClassChange}
              />
              FIRST CLASS
            </label>
          </div>
        </li>
        <hr />
        {/* Sort By */}
        <li className="mb-3">
          <button
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              fontSize: "1rem",
              padding: "0.5rem 0",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaRegHeart style={{ fontSize: "1.5rem" }} /> Sort By
            </span>
          </button>
          <div>
            <label>
              <input
                type="checkbox"
                value="price"
                checked={sortBy.includes("price")}
                onChange={handleSortByChange}
              />
              Price
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="duration"
                checked={sortBy.includes("duration")}
                onChange={handleSortByChange}
              />
              Duration
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="departureDate"
                checked={sortBy.includes("departureDate")}
                onChange={handleSortByChange}
              />
              Departure Date
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="arrivalDate"
                checked={sortBy.includes("arrivalDate")}
                onChange={handleSortByChange}
              />
              Arrival Date
            </label>
          </div>
        </li>
        <hr />
        {/* Sort Order */}
        <li>
          <button
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              fontSize: "1rem",
              padding: "0.5rem 0",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaDollarSign style={{ fontSize: "1.5rem" }} /> Sort Order
            </span>
          </button>
          <div>
            <label>
              <input
                type="radio"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={handleSortOrderChange}
              />
              Ascending
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="desc"
                checked={sortOrder === "desc"}
                onChange={handleSortOrderChange}
              />
              Descending
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
