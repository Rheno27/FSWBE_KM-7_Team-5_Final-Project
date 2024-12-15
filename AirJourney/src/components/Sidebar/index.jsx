import React, { useState } from "react";
import FlightClassIcon from '@mui/icons-material/FlightClass';
import SortIcon from '@mui/icons-material/Sort';


const Sidebar = ({ applyFilters}) => {
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isSortOrderChecked,setIsSortOrderChecked] = useState(false);

  const handleClassChange = (event) => {
    const value = event.target.value;
    setClassFilter(value)
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
    applyFilters({ classFilter, sortBy, sortOrder });
  };

  const clearFilters = () => {
    setClassFilter([]);
    setSortBy([]);
    setSortOrder("");
    applyFilters({}); 
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "60%", height: "auto", marginLeft: "auto", marginRight: "auto" }}>
      <h5 className="fw-bold mb-3">Filter</h5>
      <ul className="list-unstyled">
        {/* Class Filter */}
        <li className="mb-3">
          <button style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent", border: "none", width: "100%", textAlign: "left", fontSize: "1rem", padding: "0.5rem 0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FlightClassIcon style={{ fontSize: "1.5rem" }} /> Class
            </span>
          </button>
          <div>
            <label>
              <input type="checkbox" value="BUSINESS" checked={classFilter.includes("BUSINESS")} onChange={handleClassChange} />
              BUSINESS
            </label>
            <br />
            <label>
              <input type="checkbox" value="PREMIUM_ECONOMY" checked={classFilter.includes("PREMIUM_ECONOMY")} onChange={handleClassChange} />
              PREMIUM ECONOMY
            </label>
            <br />
            <label>
              <input type="checkbox" value="ECONOMY" checked={classFilter === "ECONOMY"} onChange={handleClassChange} />
              ECONOMY
            </label>
            <br />
            <label>
              <input type="checkbox" value="FIRST_CLASS" checked={classFilter.includes("FIRST_CLASS")} onChange={handleClassChange} />
              FIRST CLASS
            </label>
          </div>
        </li>
        <hr />
        {/* Sort By Filter */}
        <li className="mb-3">
          <button style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent", border: "none", width: "100%", textAlign: "left", fontSize: "1rem", padding: "0.5rem 0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <SortIcon style={{ fontSize: "1.5rem" }} /> Sort By
            </span>
          </button>
          <div>
            <label>
              <input type="checkbox" value="price" checked={sortBy.includes("price")} onChange={handleSortByChange} />
              Price
            </label>
            <br />
            <label>
              <input type="checkbox" value="duration" checked={sortBy.includes("duration")} onChange={handleSortByChange} />
              Duration
            </label>
            <br />
            <label>
              <input type="checkbox" value="departureDate" checked={sortBy.includes("departureDate")} onChange={handleSortByChange} />
              Departure Date
            </label>
            <br />
            <label>
              <input type="checkbox" value="arrivalDate" checked={sortBy.includes("arrivalDate")} onChange={handleSortByChange} />
              Arrival Date
            </label>
          </div>
        </li>
        <hr />
        {/* Sort Order */}
        <li>
          <button style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent", border: "none", width: "100%", textAlign: "left", fontSize: "1rem", padding: "0.5rem 0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <SortIcon style={{ fontSize: "1.5rem" }} /> Sort Order
            </span>
          </button>
          <div>
            <label>
              <input type="radio" value="asc" checked={sortOrder === "asc"} onChange={handleSortOrderChange} />
              Low
            </label>
            <br />
            <label>
              <input type="radio" value="desc" checked={sortOrder === "desc"} onChange={handleSortOrderChange} />
              High
            </label>
          </div>
        </li>
        <button onClick={handleApplyFilters} className="sort-apply-button" style={{ width: "100%", alignItems: "center", textAlign: "center" }} disabled={!isSortOrderChecked}>Apply Filters</button>
        <button onClick={() => { setClassFilter([]); setSortBy([]); setSortOrder("asc"); clearFilters({}); }} className="sort-apply-button" style={{ width: "100%", marginTop: "1rem", textAlign: "center" }}>Clear Filters</button>
      </ul>
    </div>
  );
};

export default Sidebar;
