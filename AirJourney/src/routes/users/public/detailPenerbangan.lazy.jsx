import React, { useState, useEffect, useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import FlightList from "../../../components/FlightList";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import SoldOutImage from "../../../assets/img/soldout.png";
import loadingImage from "../../../assets/img/search-loading.png"
import SortingButton from "../../../components/FilterFlight/index";

export const Route = createLazyFileRoute("/users/public/detailPenerbangan")({
  component: Index,
});

function Index() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Harga - Termurah");
  const [isSoldOut, setIsSoldOut] = useState(false);
  const loaderRef = useRef(null); 

  const fetchFlightsData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError("");
    try {
      const params = window.location.search ? new URLSearchParams(window.location.search) : new URLSearchParams();
      if (cursorId) params.append("cursorId", cursorId);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flights?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch flights data.");
      }
      const result = await response.json();

      console.log("API Response:", result);

      const newFlights = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
        ? result.data
        : [];

      const allFlights = [...flights, ...newFlights];
      const uniqueFlightsMap = new Map(allFlights.map((flight) => [flight.id, flight]));
      const uniqueFlights = Array.from(uniqueFlightsMap.values());

      // Update state
      setFlights(uniqueFlights);
      setFilteredFlights(uniqueFlights);
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
  };

  // Handle sorting of flights
  const handleSortChange = (option) => {
    setSelectedSort(option.label);
    let sortedFlights = [...filteredFlights];
    if (option.label === "Harga - Termurah") {
      sortedFlights.sort((a, b) => a.price - b.price);
    } else if (option.label === "Harga - Termahal") {
      sortedFlights.sort((a, b) => b.price - a.price);
    }
    setFilteredFlights(sortedFlights);
  };

  const handleFilteredFlightsChange = (newFilteredFlights) => {
    setFilteredFlights(newFilteredFlights);
  };

  useEffect(() => {
    fetchFlightsData();
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      const soldOut = flights.every((flight) => flight.availableSeats === 0);
      setIsSoldOut(soldOut);
    }
  }, [flights]);

  const checkIfLoadMore = () => {
    if (loaderRef.current) {
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && !loading && hasMore) {
        setLoading(true);
        fetchFlightsData(); 
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const onScroll = () => {
      checkIfLoadMore();
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, hasMore]);

  if (loading && flights.length === 0) {
    return <div className="d-flex flex-column align-items-center justify-content-center">
      <h5 className="text-center mb-4">Mencari Penerbangan Terbaik ...</h5>
      <img src={loadingImage} alt="loading..." style={{ maxWidth: "400px", height: "auto" }} />
    </div>;
  }

  if (error && flights.length === 0) {
    return <div>{error}</div>;
  }

  if (!loading && flights.length === 0 && !hasMore) {
    return (
      <div className="text-center d-flex flex-column align-items-center">
        <img
          src={SoldOutImage}
          alt="Tickets Sold Out"
          style={{ maxWidth: "400px", height: "auto", marginBottom:"20px" }}
        />
        <h5 style={{ fontFamily: "Poppins", color: "#000000" }}>
          Maaf, Tiket terjual habis!
        </h5>
        <h5 style={{ fontFamily: "Poppins", color: "#7126B5" }}>
          Coba cari perjalanan lainnya!
        </h5>
      </div>
    );
  }

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
        onFilteredFlightsChange={handleFilteredFlightsChange}
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
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <Sidebar />
          </div>
          
          <div className="col-12 col-md-8">
            <FlightList filteredFlights={filteredFlights} />
            {loading && (
              <div className="text-center mt-3">
                <span>Loading...</span>
              </div>
            )}
            <div ref={loaderRef} style={{ height: "1px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;