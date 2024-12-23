import React, { useState, useEffect } from "react";
import FlightClassIcon from '@mui/icons-material/FlightClass';
import SortIcon from '@mui/icons-material/Sort';
import FlightIcon from '@mui/icons-material/Flight';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Accordion, AccordionSummary, AccordionDetails, Typography, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../index.css"

const Sidebar = ({ 
  applyFilters, 
  onClassChange, 
  onSortByChange, 
  onSortOrderChange, 
  onAirlinesChange,
  selectedClass, 
  selectedSortBy, 
  selectedSortOrder,
  selectedAirlines
}) => {
  const [expanded, setExpanded] = useState([]);
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/airlines`)
      .then(response => response.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          setAirlines(data.data);
        } else if (Array.isArray(data)) {
          setAirlines(data);
        } else {
        }
      })
      .catch(error => console.error('Error fetching airlines:', error));
  }, []); 

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded 
      ? [...expanded, panel]
      : expanded.filter(p => p !== panel)
    );
  };

  const handleClassChange = (event) => {
    if (event.target.checked) {
      const value = event.target.value;
      onClassChange(value === selectedClass ? "" : value);
      return;
    }
    onClassChange(null); 
  };

  const handleSortByChange = (event) => {
    const value = event.target.value;
    onSortByChange([value]); 
  };

  const handleSortOrderChange = (event) => {
    onSortOrderChange(event.target.value);
  };

  const handleAirlineChange = (event, airlineId) => {
      onAirlinesChange(airlineId, event.target.checked); 
  };

  const handleApplyFilters = () => {
    applyFilters({ 
      classFilter: selectedClass, 
      sortBy: selectedSortBy, 
      sortOrder: selectedSortOrder, 
      airlines: selectedAirlines || ""
    });
  };

    const clearFilters = () => {
    onClassChange("");
    onSortByChange([]);
    onSortOrderChange("");
    onAirlinesChange("", false); 
    applyFilters({ classFilter: "", sortBy: [], sortOrder: "", airlines: "" }); 
  };

  const isClassSelected = (className) => selectedClass === className;
  return (
    <div style={{ backgroundColor: "#F5EFFF", padding: "1rem", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "70%", height: "auto", marginLeft: "auto", marginRight: "2rem" }}>
      <h5 className="fw-bold mb-3" style={{ fontSize: "1.5rem" }}>Filter</h5>
      <Accordion expanded={expanded.includes('panel1')} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FlightClassIcon /> Class
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {['BUSINESS', 'PREMIUM_ECONOMY', 'ECONOMY', 'FIRST_CLASS'].map((classType) => (
            <div key={classType}>
              <label style={{ 
                color: isClassSelected(classType) ? "black" : "#3C3C3C",
                backgroundColor: isClassSelected(classType) ? "" : "transparent", 
                fontWeight: isClassSelected(classType) ? "bold" : "normal",
                padding: "5px", 
                borderRadius: "5px",
                display: "inline-block",
                marginBottom: "5px"
              }}>
                <input type="checkbox" 
                  value={classType} 
                  checked={isClassSelected(classType)} 
                  onChange={handleClassChange} 
                  style={{ marginRight: "5px" }}
                />
                {classType === "BUSINESS" ? "Business" 
                : classType === "PREMIUM_ECONOMY" ? "Premium Economy" 
                : classType === "ECONOMY" ? "Economy" 
                : classType === "FIRST_CLASS" ? "First Class" : classType.replace("_", " ")}
              </label>
              <br />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded.includes('panel2')} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SortIcon /> Sort By
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {["price", "duration", "departureDate", "arrivalDate"].map((classType) => (
            <div key={classType}>
              <label style={{ 
                color: selectedSortBy.includes(classType) ? "black" : "#3C3C3C",  
                backgroundColor: selectedSortBy.includes(classType) ? "" : "transparent", 
                fontWeight: selectedSortBy.includes(classType) ? "bold" : "normal",
                padding: "5px", 
                borderRadius: "5px",
                display: "inline-block",
                marginBottom: "5px"
              }}>
                <input type="radio" 
                  value={classType} 
                  checked={selectedSortBy.includes(classType)} 
                  onChange={handleSortByChange} 
                  style={{ marginRight: "5px" }}
                />
                {classType === "price" ? "Price" 
                : classType === "duration" ? "Duration" 
                : classType === "departureDate" ? "Departure Date" 
                : classType === "arrivalDate" ? "Arrival Date" : classType.replace("_", " ")}
              </label>
              <br />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded.includes('panel3')} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SwapVertIcon style={{fontSize: "1.8rem" }} /> Sort Order
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {["asc", "desc"].map((classType) => (
            <div key={classType}>
              <label style={{ 
                color: selectedSortOrder === classType ? "black" : "#3C3C3C", 
                backgroundColor: selectedSortOrder === classType ? "" : "transparent", 
                fontWeight: selectedSortOrder === classType ? "bold" : "normal",
                padding: "5px", 
                borderRadius: "5px",
                display: "inline-block",
                marginBottom: "5px"
              }}>
                <input type="radio" 
                  value={classType} 
                  checked={selectedSortOrder === classType} 
                  onChange={handleSortOrderChange} 
                  style={{ marginRight: "5px" }}
                />
                {classType === "asc" ? "Lowest to Highest" 
                : classType === "desc" ? "Highest to Lowest" : classType.replace("_", " ")}
              </label>
              <br />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded.includes('panel4')} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4d-content" id="panel4d-header">
          <Typography sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FlightIcon style={{ transform: "rotate(50deg)" }} /> Choose by Airlines
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup style={{padding:"0px 10px"}}>
            {airlines.map(airline => (
              <FormControlLabel
                key={airline.id}
                control={
                  <input 
                    type="radio" 
                    checked={selectedAirlines === airline.id} 
                    onChange={(e) => handleAirlineChange(e, airline.id)} 
                    name="airlineSelect"
                    style={{ marginRight: "5px" }}
                  />
                }
                label={airline.name}
                style={{marginBottom:"5px"}}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      
      <button onClick={handleApplyFilters} className="sort-apply-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={(selectedSortBy.length > 0 ? (!selectedSortOrder) : false) || (selectedSortOrder ? (selectedSortBy.length == 0):false) }
        style={{ width: "100%", marginTop: "20px", alignItems: "center", textAlign: "center", backgroundColor: "#CDC1FF", color: "black", border: "none", borderRadius: "5px", padding: "10px 20px" }}>
        Apply Filters
      </button>
      <button onClick={clearFilters} className="sort-apply-button" 
        style={{ width: "100%", marginTop: "10px", textAlign: "center", backgroundColor: "#E5D9F2", color: "black", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer" }}>
        Clear Filters
      </button>
    </div>
  );
};

export default Sidebar;