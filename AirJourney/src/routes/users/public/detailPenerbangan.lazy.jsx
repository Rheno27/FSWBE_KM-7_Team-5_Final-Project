import { useState, useRef, useCallback } from "react";
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
//import SortingButton from "../../../components/FilterFlight/index";
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
  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const loaderRef = useRef(null);
  const [searchParams] = useState(
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
    return response.data.data;
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
          if (filter.classFilter.length === 0 && filter.sortBy.length === 0 && !filter.sortOrder) {
            ["class", "sortBy", "sortOrder"].forEach((param) =>
              params.delete(param)
            );
          }
        }

        if (resetList) {
          params.delete("cursorId");
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
        } else if (cursorId) {
          params.set("cursorId", cursorId);
        }
        console.log(params.toString(), "parans");
        const result = await fetchFlights(params.toString());
        const newFlights = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];
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

        console.log("New flights count:", updatedFlights.length);
        setFlights(updatedFlights);
        setFilteredFlights(updatedFlights);

        setCursorId(
          newFlights.length > 0 ? newFlights[newFlights.length - 1].id : null
        );
        setHasMore(newFlights.length > 0);

        setIsSoldOut(
          updatedFlights.every((flight) => flight._count.seat === 0)
        );
      } catch (err) {
        setError(err.message);
        console.error("Error fetching flights:", err);
      } finally {
        setLoading(false);
      }
    },
    [location.search, cursorId, fetchFlights, flights, isReturn, isFromSelected, classFilter, sortBy, sortOrder, navigate, arrivalDate]
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

  // Filter handlers
  const handleClassChange = useCallback(
    (newClass) => {
      setClassFilter(newClass)
      const params = new URLSearchParams(location.search);
      params.set("class", newClass);
      navigate({
        to: `/users/public/detailPenerbangan?${params.toString()}`,
      });
    },
    [location, navigate]
  );

  const handleSortByChange = useCallback(
    (newSortBy) => {
      setSortBy(newSortBy);
      const params = new URLSearchParams(location.search);
      params.set("sortBy", newSortBy.join(","));
      navigate({ to: `/users/public/detailPenerbangan?${params.toString()}` });
    },
    [location, navigate]
  );

  const handleSortOrderChange = useCallback(
    (newSortOrder) => {
      setSortOrder(newSortOrder);
      const params = new URLSearchParams(location.search);
      params.set("sortOrder", newSortOrder);
      navigate({ to: `/users/public/detailPenerbangan?${params.toString()}` });
    },
    [location, navigate]
  );

  const applyFilters = useCallback(
    debounce((filters) => {
      setClassFilter(filters.classFilter || []);
      setSortBy(filters.sortBy || []);
      setSortOrder(filters.sortOrder || "");
      console.log(filters)
      fetchFlightsData(true,null,false,false,filters);
    }, 300),
    [setClassFilter, setSortBy, setSortOrder, fetchFlightsData]
  );

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
          fontSize: "24px",
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

      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-end"></div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-4 mb-4 mb-md-0 gap-5">
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
              selectedClass={classFilter}
              selectedSortBy={sortBy}
              selectedSortOrder={sortOrder}
              applyFilters={applyFilters}
            />
          </div>

          <div className="col-12 col-md-8">
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
