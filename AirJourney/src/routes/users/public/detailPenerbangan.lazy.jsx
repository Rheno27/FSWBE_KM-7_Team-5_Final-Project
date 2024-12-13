import { useState, useEffect, useRef, useCallback } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import FlightList from "../../../components/FlightList";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import SoldOutImage from "../../../assets/img/soldout.png";
import loadingImage from "../../../assets/img/search-loading.png";
import SortingButton from "../../../components/FilterFlight/index";
import { SelectedFlight } from "../../../components/SelectedFlight";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/users/public/detailPenerbangan")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Harga - Termurah");
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const loaderRef = useRef(null);

  const {isReturn, arrivalDate} = useSelector(state=>state.searchQuery);
  const fetchFlightsData = useCallback(async (resetList = false, newDate = null, fromSelected) => {
    if (loading) return;
    if (resetList) {
      setHasMore(true);
    } else if (!hasMore) return;

    setLoading(true);
    setError("");
    try {
      // Params
      const params = new URLSearchParams(window.location.search);
      if (resetList) {
        params.delete('cursorId');
        if (newDate) params.set('departureDate', newDate);
        if (fromSelected){
          const from = params.get('airportIdFrom');
          const to = params.get('airportIdTo');
          console.log("tes",from,to)
          params.set('airportIdFrom', to);
          params.set('airportIdTo', from);
        } 
        navigate({
          to: `/users/public/detailPenerbangan?${params.toString()}`,
        });
      } else if (cursorId) {
        params.set('cursorId', cursorId);
      }

      // Fetch
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flights?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch flights data.");
      }

      const result = await response.json();
      const newFlights = Array.isArray(result) 
        ? result 
        : Array.isArray(result.data) 
          ? result.data 
          : [];

      const allFlights = resetList 
        ? newFlights 
        : [...flights, ...newFlights];
      
      const uniqueFlightsMap = new Map(
        allFlights.map((flight) => [flight.id, flight])
      );
      const uniqueFlights = Array.from(uniqueFlightsMap.values());
      // Update state
      if(isReturn && !isFromSelected) { 
        const returnDate = new Date(arrivalDate);
        const filterFlightsArrive = uniqueFlights.filter((flight) => new Date(flight.arrivalDate) < returnDate);
        
        setFlights(filterFlightsArrive);
        setFilteredFlights(filterFlightsArrive);
      }
      else{
        setFlights(uniqueFlights);
        setFilteredFlights(uniqueFlights);
      }
      setCursorId(
        newFlights.length > 0 ? newFlights[newFlights.length - 1].id : null
      );
      setHasMore(newFlights.length > 0);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, cursorId, flights, isReturn, isFromSelected, navigate, arrivalDate]);

  const handleSortChange = useCallback((option) => {
    setSelectedSort(option.label);
    
    const sortedFlights = [...filteredFlights].sort((a, b) => {
      switch(option.label) {
        case "Harga - Termurah":
          return a.price - b.price;
        case "Harga - Termahal":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredFlights(sortedFlights);
  }, [filteredFlights]);

  const checkIfLoadMore = useCallback(() => {
    if (loaderRef.current) {
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && !loading && hasMore) {
        fetchFlightsData();
      }
    }
  }, [loading, hasMore, fetchFlightsData]);

  //initiate
  useEffect(() => {
    fetchFlightsData();
  }, []);

  // useEffect(() => {
  //   const soldOut = flights.length > 0 && flights.every((flight) => flight?.seats === 0);
  //   setIsSoldOut(soldOut);
  // }, [flights]);

  // Add scroll event listener
  useEffect(() => {
    const onScroll = () => {
      checkIfLoadMore();
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [checkIfLoadMore]);

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
          marginTop: "40px",
          fontFamily: "Poppins",
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

      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-end">
            <SortingButton
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-4 mb-4 mb-md-0 gap-5">
            <Sidebar />
            {isFromSelected && (
              <SelectedFlight
                selectedFlightId={selectedFlightId}
                setSelectedFlightId={setSelectedFlightId}
                setIsFromSelected={setIsFromSelected}
                fetchFlightsData={fetchFlightsData}
              />
            )}
          </div>

          <div className="col-12 col-md-8">
            {loading && flights.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <h5 className="text-center mb-4">
                  Mencari Penerbangan Terbaik ...
                </h5>
                <img
                  src={loadingImage}
                  alt="loading..."
                  style={{ maxWidth: "400px", height: "auto" }}
                />
              </div>
            ) : (
              <>
                <FlightList
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
                <div ref={loaderRef} style={{ height: "1px" }}></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}