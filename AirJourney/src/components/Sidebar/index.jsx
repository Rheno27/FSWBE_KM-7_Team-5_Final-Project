import React from "react";
// Import React Icons
import { FaCube, FaHeart, FaDollarSign } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "70%",
        height: "auto",
        marginLeft: "5rem",
      }}
    >
      <h5 className="fw-bold mb-3">Filter</h5>
      {/* Filter Options */}
      <ul className="list-unstyled">
        {/* Transit */}
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
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaCube /> Transit
            </span>
            <span>&rarr;</span>
          </button>
        </li>
        <hr />
        {/* Fasilitas */}
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
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaHeart /> Fasilitas
            </span>
            <span>&rarr;</span>
          </button>
        </li>
        <hr />
        {/* Harga */}
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
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaDollarSign /> Harga
            </span>
            <span>&rarr;</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
