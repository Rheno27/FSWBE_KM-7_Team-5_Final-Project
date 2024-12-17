import React, { useState } from "react";
import FlightClassIcon from '@mui/icons-material/FlightClass';
import SortIcon from '@mui/icons-material/Sort';

const Sidebar = ({ applyFilters }) => {
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isSortOrderChecked, setIsSortOrderChecked] = useState(false);

  const handleClassChange = (event) => {
    const value = event.target.value;
    setClassFilter(value === classFilter ? "" : value); // Toggle selection
  };

  const handleSortByChange = (event) => {
    const value = event.target.value;
    setSortBy([value]); 
  };

  const handleSortOrderChange = (event) => {
    setIsSortOrderChecked(true);
    setSortOrder(event.target.value);
  };

  const handleApplyFilters = () => {
    applyFilters({ classFilter: classFilter ? [classFilter] : [], sortBy, sortOrder });
  };

  const clearFilters = () => {
    setClassFilter([]);
    setSortBy([]);
    setSortOrder("");
    applyFilters({ classFilter: [], sortBy: [], sortOrder: "" }); 
  };

  const isClassSelected = (className) => classFilter === className;

  return (
    <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "60%", height: "auto", marginLeft: "auto", marginRight: "auto" }}>
      <h5 className="fw-bold mb-3" style={{ fontSize: "1.5rem" }}>Filter</h5>
      <ul className="list-unstyled">
        {/* Class Filter */}
        <li className="mb-3">
            <span className="fw-bold" style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <FlightClassIcon style={{ fontSize: "1.5rem" }} /> Class
            </span>
          <div>
          {['BUSINESS', 'PREMIUM_ECONOMY', 'ECONOMY', 'FIRST_CLASS'].map((classType) => (
              <div key={classType}>
                <label style={{ 
                  color: isClassSelected(classType) ? "black" : "#3C3C3C",
                  backgroundColor: isClassSelected(classType) ? "" : "transparent", 
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
          </div>
        </li>
        <hr />
        {/* Sort By Filter */}
        <li className="mb-3">
            <span className="fw-bold" style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <SortIcon style={{ fontSize: "1.5rem" }} /> Sort By
            </span>
          <div>
          {["price", "duration", "departureDate", "arrivalDate"].map((classType) => (
              <div key={classType}>
                <label style={{ 
                  color: sortBy.includes(classType) ? "black" : "#3C3C3C",  
                  backgroundColor: sortBy.includes(classType) ? "" : "transparent", 
                  padding: "5px", 
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "5px"
                }}>
                  <input type="radio" 
                    value={classType} 
                    checked={sortBy.includes(classType)} 
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
          </div>
        </li>
        <hr />
        {/* Sort Order */}
        <li>
            <span className="fw-bold" style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <SortIcon style={{ fontSize: "1.5rem" }} /> Sort Order
            </span>
          <div>
          {["asc", "desc"].map((classType) => (
              <div key={classType}>
                <label style={{ 
                  color: sortOrder === classType ? "black" : "#3C3C3C", 
                  backgroundColor: sortOrder === classType ? "" : "transparent", 
                  padding: "5px", 
                  borderRadius: "5px",
                  display: "inline-block",
                  marginBottom: "5px"
                }}>
                  <input type="radio" 
                    value={classType} 
                    checked={sortOrder === classType} 
                    onChange={handleSortOrderChange} 
                    style={{ marginRight: "5px" }}
                  />
                  {classType === "asc" ? "Lowest to Highest" 
                  : classType === "desc" ? "Highest to Lowest" : classType.replace("_", " ")}
                </label>
                <br />
              </div>
            ))}
          </div>
        </li>
        <button onClick={handleApplyFilters} className="sort-apply-button" 
        style={{ width: "100%",marginTop: "20px", alignItems: "center", textAlign: "center",backgroundColor: "#7126b5", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer" }} disabled={!isSortOrderChecked}>
          Apply Filters</button>
        <button onClick={() => { setClassFilter([]); setSortBy([]); setSortOrder("asc"); clearFilters({}); }} className="sort-apply-button" 
        style={{ width: "100%", marginTop: "10px", textAlign: "center", backgroundColor: "#7126b5", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer" }}>
          Clear Filters</button>
      </ul>
    </div>
  );
};

export default Sidebar;