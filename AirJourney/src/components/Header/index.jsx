import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import PropTypes from "prop-types"

const Header = ({ flights = [], onFilteredFlightsChange,fetchFlightsData,isFromSelected,loading,totalData}) => {
  //const [filteredFlights, setFilteredFlights] = React.useState(flights); 
  const [selectedDate, setSelectedDate] = React.useState(null); 
  const [selectedArrivalDate, setSelectedArrivalDate] = React.useState(null); 
  
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const isReturn = useSelector(state=>state.searchQuery.isReturn);
  const departureDate = urlParams.get("departureDate") ? new Date(urlParams.get("departureDate")).toLocaleDateString("en-CA") : (flights?.length ? flights[0]?.departureDate : new Date().toLocaleDateString("en-CA"));
  const departureDateFrom = useSelector(state=>state.searchQuery.departureDate);
  const arrivalDate = useSelector(state=>state.searchQuery.arrivalDate);
  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
      const dateStr = newDate.toISOString().split("T")[0];
      daysWithDates.push({ day: daysOfWeek[i], date: dateStr });
    }
    return daysWithDates;
  };

  const daysWithDates = getDaysWithDates();
  useEffect(() => {
    if(isFromSelected){
      const selectedDateString = departureDateFrom.split("T")[0];
      setSelectedDate(selectedDateString);
      return;
    }
    if (departureDate && !selectedDate && !isFromSelected) {
      const selectedDateString = departureDate.split("T")[0];
      setSelectedDate(selectedDateString);
    }
  }, [departureDate, selectedDate, departureDateFrom, isFromSelected]);

  useEffect(() => {
    if(isFromSelected){
      const selectedDateString = departureDate.split("T")[0]; 
      setSelectedArrivalDate(selectedDateString);
      return;
    }
    if (arrivalDate && !selectedArrivalDate) {
      const selectedDateString = arrivalDate.split("T")[0];
      setSelectedArrivalDate(selectedDateString);
    }
  }, [arrivalDate, selectedArrivalDate, departureDate, isFromSelected]);

  const handleDateClick = (date) => {
    let selectedDayDate = null;
    if(isFromSelected){
      if (date === selectedArrivalDate || date < selectedDate) return;
      selectedDayDate = date;
      setSelectedArrivalDate(date);
      fetchFlightsData(true,selectedDayDate, false, true); 
    }
    else{
      if (date === selectedDate || date < new Date().toISOString().split("T")[0]) return;

      selectedDayDate = date;
      setSelectedDate(selectedDayDate);
      fetchFlightsData(true,selectedDayDate, false ,true); 
    }

    // const newFilteredFlights = flights.filter((flight) => {
    //   const flightDate = new Date(flight?.departureDate)?.toLocaleDateString("en-CA");
    //   return flightDate === selectedDayDate;
    // });

    // setFilteredFlights(newFilteredFlights); 
    // if (onFilteredFlightsChange) {
    //   onFilteredFlightsChange(newFilteredFlights);
    // }
  };

  // useEffect(() => {
  //   if (onFilteredFlightsChange) {
  //     onFilteredFlightsChange(filteredFlights);
  //   }
  // }, [filteredFlights, onFilteredFlightsChange]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      style={{
        padding: isMobile ? "0.5rem" : "1rem",
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
          gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* Empty columns for spacing, only on larger screens */}
        {!isMobile && <div style={{ gridColumn: "1 / 3" }}></div>}

        {/* Back Button */}
        <button
          style={{
            backgroundColor: "#A06ECE",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: isMobile ? "0.5rem 1rem" : "0.7rem 1.5rem",
            fontWeight: "bold",
            gridColumn: isMobile ? "1 / -1" : "3 / 9", 
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: isMobile ? "0.9rem" : "1rem", 
          }}
        >           
        <AirplaneTicketIcon/> {totalData || 0} Penerbangan Ditemukan 
        </button>
        {/* Search Button */}
        <button
          style={{
            backgroundColor: "#73CA5C",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: isMobile ? "0.5rem 1rem" : "0.7rem 1.5rem",
            fontWeight: "bold",
            gridColumn: isMobile ? "1 / -1" : "9 / 11", 
            transition: "background-color 0.3s ease",
          }}
          onClick={() => navigate({ to: "/" })}
        >
          Ubah Pencarian
        </button>

        {/* Empty columns for spacing, only on larger screens */}
        {!isMobile && <div style={{ gridColumn: "11 / 13" }}></div>}
      </div>

      {/* Row 2: Date Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {daysWithDates.map((dayObj, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(dayObj.date)} 
            disabled={loading}
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
              opacity: loading ? 0.5 : 1
            }}
          >
            <div style={{ fontWeight: "bold" }}>{dayObj.day}</div>
            <small>{dayObj.date}</small>
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
  isFromSelected:PropTypes.bool,
  loading:PropTypes.bool,
  totalData: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Header;
