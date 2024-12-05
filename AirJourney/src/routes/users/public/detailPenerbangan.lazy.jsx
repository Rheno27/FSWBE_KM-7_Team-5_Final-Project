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
        className="fw-bold"
        style={{ marginTop: "40px", marginLeft: "9rem", fontFamily: "Poppins" }}
      >
        Detail Penerbangan
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
        <div className="row mt-4">
          {/* Sorting Button */}
          <div className="col-12 d-flex justify-content-end mb-3">
            <SortingButton
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Sidebar and Flight List */}
          <div className="col-md-3" style={{ top: "10px" }}>
            <Sidebar />
          </div>

          <div className="col-md-9">
            <FlightList flights={data.flight} airlines={data.airlane} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
