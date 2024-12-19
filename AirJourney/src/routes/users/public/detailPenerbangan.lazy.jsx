
import { useState, useCallback, useEffect, useRef } from "react";
import {
  createLazyFileRoute,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { debounce } from "lodash";
import FlightList from "../../../components/FlightList";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import loadingImage from "../../../assets/img/search-loading.png";
import loadingImage2 from "../../../assets/img/search-loading2.png";
import { SelectedFlight } from "../../../components/SelectedFlight";
import { useSelector } from "react-redux";
import {useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Route = createLazyFileRoute("/users/public/detailPenerbangan")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search).toString() || "");
  const { isReturn, arrivalDate } = useSelector((state) => state.searchQuery);
  const loadingImg = [loadingImage, loadingImage2];

  const fetchFlights = useCallback(async (params) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/flights?${params}`);
    console.log("response:",response.data);
    return response.data;
  }, []);

  useQuery({
    queryKey: ["flights", location.search, currentPage], 
    queryFn: async () => {
      try {
        return await fetchFlightsData(false, false, false, true);
      } catch (error) {
        console.error("Query error:", error);
        return []; 
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

const fetchFlightsData = useCallback(
  async (
    resetList = false,
    newDate = null,
    fromSelected,
    unchangedFilter,
    filter = {}
  ) => {
    setLoading(true);
    setError("");

    if (resetList) {
       setCurrentPage(1); 
    }
    
    try {
      const baseParams = new URLSearchParams(location.search);
      baseParams.set("page", currentPage.toString());
        
      if (!unchangedFilter) {
        if (filter.classFilter && filter.classFilter.length > 0) baseParams.set("class", filter.classFilter[0]);
        if (filter.sortBy && filter.sortBy.length > 0) baseParams.set("sortBy", filter.sortBy[0]);
        if (filter.sortOrder) baseParams.set("sortOrder", filter.sortOrder);
        if (filter.airlines && filter.airlines.length > 0) {
          baseParams.set("airlineIds", filter.airlines.join(","));
        } else {
          baseParams.delete("airlineIds");
        }
      }
    
      if (resetList) {
        if (newDate) baseParams.set("departureDate", newDate);
        if (fromSelected) {
          const from = baseParams.get("airportIdFrom");
          const to = baseParams.get("airportIdTo");
          baseParams.set("airportIdFrom", to);
          baseParams.set("airportIdTo", from);
        }
        window.history.pushState({}, '', `/users/public/detailPenerbangan?${baseParams.toString()}`);
      }
    
      const flightsResponse = await fetchFlights(baseParams.toString());
        
      // Update totalPage if provided in the meta of the response
      if (flightsResponse.meta) {
        setTotalPage(flightsResponse.meta.totalPage || 0);
      }
  
      let updatedFlights = Array.isArray(flightsResponse.data) ? flightsResponse.data : [];
    
      // Apply airline filter after fetch
      if (filter.airlines && filter.airlines.length > 0) {
        updatedFlights = updatedFlights.filter(flight => 
          filter.airlines.includes(flight.airline?.id)
        );
      }
    
      // Filter for return flights if necessary
      let filteredFlightsList = updatedFlights;
      if (isReturn && !isFromSelected) {
        const returnDate = new Date(arrivalDate);
        filteredFlightsList = updatedFlights.filter(
          (flight) => new Date(flight.arrivalDate) < returnDate
        );
      }
    
      console.log("Updated Flights:", updatedFlights); 
      console.log("Filtered Flights:", filteredFlightsList); 
    
      setFlights(updatedFlights);
      setFilteredFlights(filteredFlightsList);
      setIsSoldOut(updatedFlights.every((flight) => flight._count.seat === 0));
      return updatedFlights;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching flights:", err);
      return [];
    } finally {
      setLoading(false);
    }
  },
  [location.search, currentPage, fetchFlights, isReturn, isFromSelected, classFilter, arrivalDate]
);

  // const handleSortChange = useCallback((option) => {
  //   const sortedFlights = [...filteredFlights].sort((a, b) => {
  //     if (option.label === "Harga - Termurah") {
  //       return a.price - b.price;
  //     } else if (option.label === "Harga - Termahal") {
  //       return b.price - a.price;
  //     }
  //     return 0;
  //   });

  //   setFilteredFlights(sortedFlights);

  //   // Update the API sorting params
  //   const params = new URLSearchParams(location.search);
  //   params.set("sortBy", "price");
  //   params.set("sortOrder", option.label === "Harga - Termurah" ? "asc" : "desc");

  //   fetchFlightsData(true);
  //   navigate(`/users/public/detailPenerbangan?${params.toString()}`);
  // }, [filteredFlights, location, navigate, fetchFlightsData]);

// Pagination handlers
const handleNextPage = useCallback(() => {
  if (currentPage < totalPage) { 
    setCurrentPage(prevPage => prevPage + 1);
    fetchFlightsData(false);
  }
}, [currentPage, totalPage, fetchFlightsData]);
  
const handlePreviousPage = useCallback(() => {
  if (currentPage > 1) {
    setCurrentPage(prevPage => prevPage - 1);
    fetchFlightsData(false);
  }
}, [currentPage, fetchFlightsData]);
  
// Filter handlers
const handleClassChange = useCallback(
  (newClass) => {
    setClassFilter(newClass);
    const newParams = new URLSearchParams(location.search);
    newParams.delete('class');  // Clear existing class if any
    if (newClass) {
      newParams.set("class", newClass);
    }
    navigate({
      to: `/users/public/detailPenerbangan?${newParams.toString()}`,
    });
    fetchFlightsData(true, null, false, false, { classFilter: newClass ? [newClass] : [] });
  },
  [location.search, navigate, fetchFlightsData]
);
  
const handleSortByChange = useCallback(
  (newSortBy) => {
    const updatedSortOrder = sortOrder || "asc"; // Default to 'asc' if not already set
    setSortBy(newSortBy);
    setSortOrder(updatedSortOrder);
  
    const newParams = new URLSearchParams(location.search);
    newParams.set("sortBy", newSortBy);
    newParams.set("sortOrder", updatedSortOrder);
  
    navigate({
      to: `/users/public/detailPenerbangan?${newParams.toString()}`,
    });
  
    fetchFlightsData(true, null, false, false, { sortBy: [newSortBy], sortOrder: updatedSortOrder });
  },
  [location.search, navigate, fetchFlightsData, sortOrder]
);
  
const handleSortOrderChange = useCallback(
  (newSortOrder) => {
    if (!sortBy || sortBy.length === 0) return; // Ensure 'sortBy' is set before updating 'sortOrder'
  
    setSortOrder(newSortOrder);
  
    const newParams = new URLSearchParams(location.search);
    newParams.set("sortBy", sortBy[0]);
    newParams.set("sortOrder", newSortOrder);
  
    navigate({
      to: `/users/public/detailPenerbangan?${newParams.toString()}`,
    });
  
    fetchFlightsData(true, null, false, false, { sortBy: [sortBy[0]], sortOrder: newSortOrder });
  },
  [location.search, navigate, fetchFlightsData, sortBy]
);  
  
const handleAirlinesChange = useCallback(
  (newAirlines) => {
    setSelectedAirlines(newAirlines);
    const newParams = new URLSearchParams(location.search);
    if (newAirlines.length > 0) {
      newParams.set("airlineIds", newAirlines.join(","));
    } else {
      newParams.delete("airlineIds");
    }
    navigate({
      to: `/users/public/detailPenerbangan?${newParams.toString()}`,
    });
    fetchFlightsData(true, null, false, false, { airlines: newAirlines });
  },
  [location.search, navigate, fetchFlightsData]
);

const handleClearFilters = useCallback(() => {
  setClassFilter([]);
  setSortBy([]); 
  setSortOrder(""); 
  setSelectedAirlines([]); 
  navigate({
    to: `/users/public/detailPenerbangan`,
  });
  fetchFlightsData(true);
}, [navigate, fetchFlightsData]);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  if (selectedAirlines.length > 0) {
    params.set("airlineIds", selectedAirlines.join(","));
  } else {
    params.delete("airlineIds");
  }
  setSearchParams(params.toString());
}, [selectedAirlines, location.search]);

// useEffect(() => {
//   fetchFlightsData(true); // Fetch when currentPage changes
// }, [currentPage, fetchFlightsData]);

  // useEffect(() => {
  //   fetchFlightsData(true);
  // }, [classFilter, sortBy, sortOrder]);

  // useEffect(() => {
  //   const soldOut = flights.length > 0 && flights.every((flight) => flight?.seats === 0);
  //   setIsSoldOut(soldOut);
  // }, [flights]);

  if (error && flights.length === 0) {
    return <div>{error}</div>;
  }

  // if (!loading && flights.length === 0 && !hasMore) {
  //   return (
  //     <div className="text-center">
  //       <img
  //         src={SoldOutImage}
  //         alt="Tickets Sold Out"
  //         style={{ maxWidth: "400px", height: "auto", "margin-bottom":"20px" }}
  //       />
  //       <h5 style={{ fontFamily: "Poppins", color: "#000000" }}>
  //         Maaf, Tiket terjual habis!
  //       </h5>
  //       <h5 style={{ fontFamily: "Poppins", color: "#7126B5" }}>
  //         Coba cari perjalanan lainnya!
  //       </h5>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h5
        className="fw-bold row justify-content-center"
        style={{
          fontSize: "clamp(20px, 5vw, 24px)",
          fontFamily: "Poppins",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        <div className="col-12 col-md-9 text-start">Pilih Penerbangan</div>
      </h5>
      <Header
        flights={flights}
        onFilteredFlightsChange={setFilteredFlights}
        fetchFlightsData={fetchFlightsData}
        isFromSelected={isFromSelected}
        loading={loading}
      />
      <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-12 order-1 order-md-2">
                <nav aria-label="Page navigation " className="mt-4">
                  <ul className="pagination justify-content-end justify-content-md-end">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a className="page-link" onClick={handlePreviousPage}>Previous</a>
                    </li>
                    <li className={`page-item ${currentPage >= totalPage ? 'disabled' : ''}`}>
                      <a className="page-link" onClick={handleNextPage}>Next</a>
                    </li>
                  </ul>
                </nav>
                </div>
            </div>
      </div>
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-end"></div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-4 mb-4 mb-md-0 order-2 order-md-1">
            {isFromSelected && (
              <SelectedFlight
                selectedFlightId={selectedFlightId}
                setSelectedFlightId={setSelectedFlightId}
                setIsFromSelected={setIsFromSelected}
                fetchFlightsData={fetchFlightsData}
              />
            )}
            <Sidebar
              onClassChange={handleClassChange}
              onSortByChange={handleSortByChange}
              onSortOrderChange={handleSortOrderChange}
              onAirlinesChange={handleAirlinesChange}
              selectedClass={classFilter}
              selectedSortBy={sortBy}
              selectedSortOrder={sortOrder}
              clearFilters={handleClearFilters}
            />
          </div>
  
          <div className="col-12 col-md-8 order-1 order-md-2">
            {loading && flights.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h5 className="text-center mb-4">
                  Mencari Penerbangan Terbaik ...
                </h5>
                <img
                  src={loadingImg[Math.floor(Math.random() * loadingImg.length)]}
                  alt="loading..."
                  style={{ maxWidth: "400px", height: "auto" }}
                />
              </div>
            ) : (
              <>
                <FlightList
                  key={JSON.stringify({ classFilter, sortBy, sortOrder })}
                  filteredFlights={filteredFlights}
                  isFromSelected={isFromSelected}
                  setIsFromSelected={setIsFromSelected}
                  setSelectedFlightId={setSelectedFlightId}
                  selectedFlightId={selectedFlightId}
                  fetchFlightsData={fetchFlightsData}
                />
                {loading && (
                  <div className="text-center mt-3">
                    <span>Loading...</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}