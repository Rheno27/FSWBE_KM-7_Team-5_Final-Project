import React, { useState } from "react";
import FlightClassIcon from '@mui/icons-material/FlightClass';
import SortIcon from '@mui/icons-material/Sort';
import { Accordion, AccordionSummary, AccordionDetails, Typography, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = ({ 
  onClassChange, 
  onSortByChange, 
  onSortOrderChange, 
  onAirlinesChange,
  selectedClass, 
  selectedSortBy, 
  selectedSortOrder,
  selectedAirlines,
  clearFilters
}) => {
  const [expanded, setExpanded] = useState([]); 

  const airlines = [
    { id: '0193c390-358e-7be0-92e8-d8075fa07253', name: 'Garuda Indonesia' },
    { id: '0193c390-3596-7bd2-9a5f-2d728d891d04', name: 'Singapore Airlines' },
    { id: '0193c390-3599-7451-917a-bdfe16ded050', name: 'British Airways' },
    { id: '0193c390-359c-7580-a415-689ce667c01a', name: 'American Airlines' },
    { id: '0193c390-359f-7e42-9cc7-cd2352b4a942', name: 'Qantas' }
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded 
      ? [...expanded, panel]
      : expanded.filter(p => p !== panel)
    );
  };

  const handleClassChange = (event) => {
    const value = event.target.value;
    onClassChange(value === selectedClass ? "" : value); // Toggle the selection
  };

  const handleSortByChange = (event) => {
    const value = event.target.value;
    onSortByChange([value]); // Assuming sortBy is always an array with one element
  };

  const handleSortOrderChange = (event) => {
    onSortOrderChange(event.target.value);
  };

  const handleAirlineChange = (event, airlineId) => {
    if (event.target.checked) {
      onAirlinesChange([airlineId]); // Select only one airline at a time
    } else {
      onAirlinesChange([]); // Unselect all
    }
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
          {["price", "duration", "departureDate", "arrivalDate"].map((sortType) => (
            <div key={sortType}>
              <label style={{ 
                color: selectedSortBy.includes(sortType) ? "black" : "#3C3C3C",  
                backgroundColor: selectedSortBy.includes(sortType) ? "" : "transparent", 
                fontWeight: selectedSortBy.includes(sortType) ? "bold" : "normal",
                padding: "5px", 
                borderRadius: "5px",
                display: "inline-block",
                marginBottom: "5px"
              }}>
                <input type="radio" 
                  value={sortType} 
                  checked={selectedSortBy.includes(sortType)} 
                  onChange={handleSortByChange} 
                  style={{ marginRight: "5px" }}
                />
                {sortType === "price" ? "Price" 
                : sortType === "duration" ? "Duration" 
                : sortType === "departureDate" ? "Departure Date" 
                : sortType === "arrivalDate" ? "Arrival Date" : sortType.replace("_", " ")}
              </label>
              <br />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
  
      <Accordion expanded={expanded.includes('panel3')} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SortIcon /> Sort Order
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {["asc", "desc"].map((orderType) => (
            <div key={orderType}>
              <label style={{ 
                color: selectedSortOrder === orderType ? "black" : "#3C3C3C", 
                backgroundColor: selectedSortOrder === orderType ? "" : "transparent", 
                fontWeight: selectedSortOrder === orderType ? "bold" : "normal",
                padding: "5px", 
                borderRadius: "5px",
                display: "inline-block",
                marginBottom: "5px"
              }}>
                <input type="radio" 
                  value={orderType} 
                  checked={selectedSortOrder === orderType} 
                  onChange={handleSortOrderChange} 
                  style={{ marginRight: "5px" }}
                />
                {orderType === "asc" ? "Lowest to Highest" 
                : orderType === "desc" ? "Highest to Lowest" : orderType.replace("_", " ")}
              </label>
              <br />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
  
      <Accordion expanded={expanded.includes('panel4')} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4d-content" id="panel4d-header">
          <Typography sx={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SortIcon /> Choose by Airlines
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {airlines.map(airline => (
              <FormControlLabel
                key={airline.id}
                control={
                  <input 
                    type="radio" 
                    checked={Array.isArray(selectedAirlines) && selectedAirlines.includes(airline.id)} 
                    onChange={(e) => handleAirlineChange(e, airline.id)} 
                    name="airlineSelect"
                  />
                }
                label={airline.name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
  
      <button onClick={clearFilters} className="sort-clear-button" 
        style={{ width: "100%", marginTop: "20px", textAlign: "center", backgroundColor: "#E5D9F2", color: "black", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer" }}>
        Clear Filters
      </button>
    </div>
  );
};

export default Sidebar;