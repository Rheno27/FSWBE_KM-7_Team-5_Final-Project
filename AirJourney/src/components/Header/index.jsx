import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from "react-redux";
import PropTypes from "prop-types"

const Header = ({ flights = [], onFilteredFlightsChange,fetchFlightsData }) => {
  const isReturn = useSelector((state) => state.searchQuery.isReturn);
  const [activeDayIndex, setActiveDay] = React.useState(null); 
  const [activeArrivalDayIndex, setArrivalActiveDay] = React.useState(null); 
  const [filteredFlights, setFilteredFlights] = React.useState(flights); 
  const [selectedDate, setSelectedDate] = React.useState(null); 
  const [selectedArrivalDate, setSelectedArrivalDate] = React.useState(null); 
  
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const departureDate = new Date(urlParams.get("departureDate")).toLocaleDateString("en-CA") || (flights?.length ? flights[0]?.departureDate : new Date().toLocaleDateString("en-CA"));
  const arrivalDate = useSelector((state) => state.searchQuery.arrivalDate);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getDaysWithDates = () => {
    if (!departureDate) return [];
    const getDateIndex = new Date(departureDate).getDay();
    const dateObj = new Date(departureDate);
    dateObj.setDate(dateObj.getDate() - getDateIndex);
    const daysWithDates = [];
    // Set days with dates
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(dateObj);
      newDate.setDate(dateObj.getDate() + i);
      const dateStr = newDate.toLocaleDateString("en-CA");
      daysWithDates.push({ day: daysOfWeek[i], date: dateStr });
    }
    return daysWithDates;
  };

  const daysWithDates = getDaysWithDates();
  console.log("rendered")
  useEffect(() => {
    if (departureDate && !selectedDate) {
      const dateObj = new Date(departureDate);
      const selectedDateString = dateObj.toLocaleDateString("en-CA");
      setSelectedDate(selectedDateString); 
    }
  }, [departureDate, selectedDate]);

  useEffect(() => {
    if (arrivalDate && !selectedArrivalDate) {
      const dateObj = new Date(arrivalDate);
      const selectedDateString = dateObj.toLocaleDateString("en-CA");
      setSelectedArrivalDate(selectedDateString); 
    }
  }, [arrivalDate, selectedArrivalDate]);

  const handleDateClick = (date) => {
    if (date === selectedDate || date < new Date().toLocaleDateString("en-CA")) return;

    const selectedDayDate = date;
    setSelectedDate(selectedDayDate);

    fetchFlightsData(true,selectedDayDate); //

    const newFilteredFlights = flights.filter((flight) => {
      const flightDate = new Date(flight?.departureDate)?.toLocaleDateString("en-CA");
      return flightDate === selectedDayDate;
    });

    setFilteredFlights(newFilteredFlights); 
    if (onFilteredFlightsChange) {
      onFilteredFlightsChange(newFilteredFlights);
    }
  };

  useEffect(() => {
    if (onFilteredFlightsChange) {
      onFilteredFlightsChange(filteredFlights);
    }
  }, [filteredFlights, onFilteredFlightsChange]);

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
            gridColumn: "9 / 11", 
            transition: "background-color 0.3s ease",
          }}
          onClick={() => navigate({ to: "/" })}
        >
          Ubah Pencarian
        </button>

        {/* Empty columns 10-12 */}
        <div style={{ gridColumn: "11 / 13" }}></div>
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
        {daysWithDates.map((dayObj, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(dayObj.date)} 
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.2",
              textAlign: "center",
              minWidth: "80px",
              padding: "0.5rem 1rem",
              borderRadius: "12px",
              border: "none",
              transition: "all 0.3s ease",
              backgroundColor: dayObj.date === selectedDate ? "#A06ECE" : (isReturn && dayObj.date === selectedArrivalDate ? "#73CA5C" : "#fff"),
              color: dayObj.date === selectedDate ? "white" :( isReturn && dayObj.date === selectedArrivalDate ? "white" : "#343a40"),
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{dayObj.day}</div>
            <small>{dayObj.date}</small> {/* Show the corresponding date */}
          </button>
        ))}
      </div>
    </header>
  );
};

Header.propTypes={
  flights:PropTypes.array,
  onFilteredFlightsChange:PropTypes.any,
  fetchFlightsData:PropTypes.any,
}

export default Header;
