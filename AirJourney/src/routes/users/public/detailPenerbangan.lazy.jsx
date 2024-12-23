import { useState, useRef, useCallback, useEffect } from "react";
import {
  createLazyFileRoute,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { debounce } from "lodash";
import FlightList from "../../../components/FlightList";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
//import SoldOutImage from "../../../assets/img/soldout.png";
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
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const loaderRef = useRef(null);
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search).toString() || ""
  );
  const { isReturn, arrivalDate } = useSelector((state) => state.searchQuery);
  const loadingImg = [loadingImage, loadingImage2];

  const fetchFlights = useCallback(async (params) => {
    const response = await axios
      .get(`${import.meta.env.VITE_API_URL}/flights?${params}`)
      .catch((err) => {
        throw new Error(err);
      });
    return response.data;
  }, []);

  useQuery({
    queryKey: ["flights", searchParams],
    queryFn: () => fetchFlightsData(false, false, false, true)
  });
  
  const fetchFlightsData = useCallback(
    async (
      resetList = false,
      newDate = null,
      fromSelected,
      unchangedFilter,
      filter
    ) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams(location.search);
        if (!unchangedFilter) {
          if (filter.classFilter.length > 0)
            params.set("class", filter.classFilter);
          if (filter.sortBy.length > 0) params.set("sortBy", filter.sortBy[0]);
          if (filter.sortOrder) params.set("sortOrder", filter.sortOrder);
          if (filter.airlines) params.set("airlineIds", filter.airlines); 
          if (filter.classFilter.length === 0 && filter.sortBy.length === 0 && !filter.sortOrder && !filter.airlines) {
            ["class", "sortBy", "sortOrder", "airlineIds"].forEach((param) =>
              params.delete(param)
            );
          }
        }

        if (resetList) {
          params.delete("page");
          if (newDate) params.set("departureDate", newDate);
          if (fromSelected) {
            const from = params.get("airportIdFrom");
            const to = params.get("airportIdTo");
            params.set("airportIdFrom", to);
            params.set("airportIdTo", from);
          }
          navigate({
            to: `/users/public/detailPenerbangan?${params.toString()}`,
          });
        } else if (page) {
          params.set("page", page);
        }

        const result = await fetchFlights(params.toString());
        const newFlights = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];
        if (result.meta && result.meta.totalData !== undefined) {
            setTotalData(result.meta.totalData);
        } else {
          setTotalData(newFlights.length);
        }    
        let updatedFlights = resetList
          ? newFlights
          : [...flights, ...newFlights];
        const uniqueFlightsMap = new Map(
          updatedFlights.map((flight) => [flight.id, flight])
        );
        updatedFlights = Array.from(uniqueFlightsMap.values());

        // Filter for return flights if necessary
        let filteredFlightsList = updatedFlights;
        if (isReturn && !isFromSelected) {
          const returnDate = new Date(arrivalDate);
          filteredFlightsList = updatedFlights.filter(
            (flight) => new Date(flight.arrivalDate) < returnDate
          );
        }
        setFilteredFlights(filteredFlightsList);
        setFlights(updatedFlights);
        setFilteredFlights(updatedFlights);

        setPage(
          result.meta.page + 1 || null
        );
        setHasMore(result.meta.page < result.meta.totalPage);

        setIsSoldOut(
          updatedFlights.every((flight) => flight._count.seat === 0)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [location.search, page, fetchFlights, flights, isReturn, isFromSelected, navigate, arrivalDate]
  );


  // Filter handlers
const handleClassChange = useCallback(
  (newClass) => {
    setClassFilter(newClass)
    // const newParams = new URLSearchParams(location.search);
    // newParams.set("class", newClass);
  },
  []
);

  const handleSortByChange = useCallback(
    (newSortBy) => {
      setSortBy(newSortBy);
      // const newParams = new URLSearchParams(location.search);
      // newParams.set("sortBy", newSortBy);
    },
    []
  );

  const handleSortOrderChange = useCallback(
    (newSortOrder) => {
      setSortOrder(newSortOrder);
      // const newParams = new URLSearchParams(location.search);
      // newParams.set("sortOrder", newSortOrder);
    },
    []
  );

  const handleAirlinesChange = useCallback(
    (newAirlines, isChecked) => {
      if (isChecked) {
        setSelectedAirlines(newAirlines);
      } else {
        setSelectedAirlines("");
      }
    },
    []
  );
    
const applyFilters = useCallback(
    debounce((filters) => {
      setClassFilter(filters.classFilter || []);
      setSortBy(filters.sortBy || []);
      setSortOrder(filters.sortOrder || "");
      setSelectedAirlines(filters.airlines || []);

        const baseParams = new URLSearchParams(location.search);
        if (filters.classFilter.length > 0)
            baseParams.set("class", filters.classFilter);
        if (filters.sortBy.length > 0)
            baseParams.set("sortBy", filters.sortBy[0]);
        if (filters.sortOrder) baseParams.set("sortOrder", filters.sortOrder);
        if (filters.airlines) baseParams.set("airlineIds", filters.airlines);
          navigate({
        to: `/users/public/detailPenerbangan?${baseParams.toString()}`,
        });

        fetchFlightsData(true, null, false, false, filters);
    }, 300),
  [setClassFilter, setSortBy, setSortOrder, setSelectedAirlines, fetchFlightsData, location, navigate]
);

// useEffect(() => {
//   const params = new URLSearchParams(location.search);
//   if (selectedAirlines.length > 0) {
//     params.set("airlineIds", selectedAirlines.join(","));
//   } else {
//     params.delete("airlineIds");
//   }
//   setSearchParams(params.toString());
// }, [selectedAirlines]);

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
        totalData={totalData}
      />

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
              selectedAirlines={selectedAirlines}
              applyFilters={applyFilters}
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
                  hasMore={hasMore}
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