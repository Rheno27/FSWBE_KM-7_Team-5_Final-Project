import React from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Header = () => {
  const [activeDayIndex, setActiveDay] = React.useState(2); 

  const days = [
    { name: "Selasa", date: "01/03/2023" },
    { name: "Rabu", date: "02/03/2023" },
    { name: "Kamis", date: "03/03/2023" },
    { name: "Jumat", date: "04/03/2023" },
    { name: "Sabtu", date: "05/03/2023" },
    { name: "Minggu", date: "06/03/2023" },
    { name: "Senin", date: "07/03/2023" },
    { name: "Selasa", date: "08/03/2023" },
  ];

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      {/* Row 1: Back Button and Search Button */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "1rem", 
          alignItems: "center",
        }}
      >
        {/* Empty columns 1-2 */}
        <div style={{ gridColumn: "1 / 3" }}></div>

        {/* Back Button (columns 3-6) */}
        <button
          style={{
            backgroundColor: "#A06ECE",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "0.7rem 1.5rem",
            fontWeight: "bold",
            gridColumn: "3 / 9", 
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "1rem", 
          }}
        >
          <ArrowBackIcon style={{ marginRight: "10px" }} />
          JKT <ArrowForwardIosIcon style={{ fontSize: "14px", marginTop: "6px", marginLeft: "5px" }} /> MLB • 2 Penumpang • Economy
        </button>

        {/* Search Button (columns 7-9) */}
        <button
          style={{
            backgroundColor: "#73CA5C",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "0.7rem 1.5rem",
            fontWeight: "bold",
            gridColumn: "9 / 11", // This takes up columns 7 to 9
            transition: "background-color 0.3s ease",
          }}
        >
          Ubah Pencarian
        </button>

        {/* Empty columns 10-12 */}
        <div style={{ gridColumn: "11 / 13" }}></div>
      </div>

      {/* Row 2: Date Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.2",
              textAlign: "center",
              minWidth: "80px",
              padding: "0.5rem 1rem",
              borderRadius: "12px",
              border: "none",
              transition: "all 0.3s ease",
              backgroundColor: index === activeDayIndex ? "#A06ECE" : "#fff",
              color: index === activeDayIndex ? "white" : "#343a40",
              cursor: "pointer",
            }}
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
