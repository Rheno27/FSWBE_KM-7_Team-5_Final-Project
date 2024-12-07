import React, { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import FlightList from "../../../components/FlightList";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import SoldOutImage from "../../../assets/img/soldout.png";
import SortingButton from "../../../components/FilterFlight/index";
import data from "../../../data/dummy.json";

export const Route = createLazyFileRoute("/users/public/detailPenerbangan")({
  component: Index,
});

function Index() {
  const [selectedSort, setSelectedSort] = useState("Harga - Termurah");

  const handleSortChange = (option) => {
    setSelectedSort(option.label);
    // Implement your sorting logic here
  };

  const isSoldOut = data.flight.length > 0 && data.flight.every((flight) => flight.availableSeats === 0);

  return (
    <div>
      <h5
  className="fw-bold row justify-content-center"
  style={{
    marginTop: "40px", 
    fontFamily: "Poppins",
  }}
>
  <div className="col-12 col-md-9 text-start">
    Pilih Penerbangan
  </div>
</h5>
      <Header />

      {/* Sold Out */}
      {isSoldOut ? (
        <div className="text-center">
          <img
            src={SoldOutImage}
            alt="Tickets Sold Out"
            style={{ maxWidth: "400px", height: "auto" }}
          />
          <h3 style={{ fontFamily: "Poppins", color: "#555" }}>Tickets Sold Out</h3>
        </div>
      ) : (
        <div className="container mt-4">
          {/* Sorting Button aligned to the right */}
          <div className="row mb-3">
            <div className="col-12 d-flex justify-content-end">
              <SortingButton
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Sidebar and Flight List container */}
          <div className="row d-flex justify-content-center">
            {/* Sidebar (on top for mobile) */}
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <Sidebar />
            </div>

            {/* Flight List */}
            <div className="col-12 col-md-8">
              <FlightList flights={data.flight} airlines={data.airlane} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
