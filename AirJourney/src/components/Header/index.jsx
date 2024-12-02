import React from "react";

const Header = () => {
  // Days of the week and corresponding dates
  const days = [
    { name: "Selasa", date: "01/03/2023" },
    { name: "Rabu", date: "02/03/2023" },
    { name: "Kamis", date: "03/03/2023" },
    { name: "Jumat", date: "04/03/2023" },
    { name: "Sabtu", date: "05/03/2023" },
    { name: "Minggu", date: "06/03/2023" },
    { name: "Senin", date: "07/03/2023" },
    { name: "Selasa", date: "01/03/2023" },
  ];

  // Active day index
  const activeDayIndex = 2; // "Kamis"

  // Inline styles
  const containerStyle = {
    padding: "1rem",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const dateSelectorStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    fontSize: "0.9rem",
    lineHeight: "1.2",
    textAlign: "center",
    minWidth: "80px",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "none",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#A06ECE",
    color: "white",
    fontWeight: "bold",
  };

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f8f9fa",
    color: "#343a40",
  };

  const modifyButtonStyle = {
    backgroundColor: "#73CA5C",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "0.7rem 1.5rem",
    fontWeight: "bold",
  };

  const backButtonStyle = {
    backgroundColor: "#A06ECE",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "0.7rem 1.5rem",
    fontWeight: "bold",
  };

  return (
    <header style={containerStyle}>
      {/* Row 1: Back Button and Search Button */}
      <div style={rowStyle}>
        {/* Back Button */}
        <button style={{ ...backButtonStyle, width: "70%", display: "flex", alignItems: "center", marginLeft: "9rem" }}>
          JKT → MLB • 2 Penumpang • Economy
        </button>

        {/* Search Button */}
        <button style={{...modifyButtonStyle, width: "30%",marginLeft:"1rem", marginRight:"9rem"}}>Ubah Pencarian</button>
      </div>

      {/* Row 2: Date Selector */}
      <div style={dateSelectorStyle}>
        {days.map((day, index) => (
          <button
            key={index}
            style={index === activeDayIndex ? activeButtonStyle : inactiveButtonStyle}
          >
            <div style={{ fontWeight: "bold" }}>{day.name}</div>
            <small>{day.date}</small>
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
