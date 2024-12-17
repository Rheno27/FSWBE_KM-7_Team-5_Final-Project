import React from "react";
import { IoCubeOutline } from "react-icons/io5";
import { FaRegHeart, FaDollarSign } from "react-icons/fa"; 

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
        // Responsive design for small screens
        "@media (max-width: 768px)": {
          width: "100%",
          marginLeft: "0",
        },
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
              <IoCubeOutline style={{ fontSize: "1.5rem" }} /> Transit
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
              <FaRegHeart style={{ fontSize: "1.5rem" }} /> Fasilitas
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
              <FaDollarSign style={{ fontSize: "1.5rem" }}/> Harga
            </span>
            <span>&rarr;</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
