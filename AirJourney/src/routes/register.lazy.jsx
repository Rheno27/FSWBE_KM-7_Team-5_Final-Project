import React, { useState } from "react";
import data from "../data/dummy.json";

function FlightDetails({ flight, airline }) {
  return (
    <div className="flight-details p-3" style={{ backgroundColor: "#F8F9FA" }}>
      <h6 className="fw-bold mb-3">Detail Penerbangan</h6>
      <div className="d-flex justify-content-between">
        <div>
          <p className="mb-1 text-muted">Keberangkatan</p>
          <p className="mb-0">{flight.departure_time}</p>
          <p className="text-muted small">
            {flight.date} - {flight.departure_airport}
          </p>
        </div>
        <div>
          <p className="mb-1 text-muted">Kedatangan</p>
          <p className="mb-0">{flight.arrival_time}</p>
          <p className="text-muted small">{flight.arrival_airport}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-1">{airline.name} - {flight.class}</p>
        <p className="small text-muted">
          Baggage: {flight.baggage}, Cabin baggage: {flight.cabin_baggage}, In-Flight Entertainment
        </p>
      </div>
    </div>
  );
}

function FlightCard({ flight, airline }) {
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const toggleDetails = () => setDetailsOpen(!isDetailsOpen);

  return (
    <div
      className="flight-card mb-4 p-3"
      style={{
        border: "2px solid #E3E3E3",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Airline Information */}
        <div className="d-flex align-items-center">
          <img
            src={airline.image}
            alt={airline.name}
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <div>
            <p className="m-0 fw-bold">
              {airline.name} - {flight.class}
            </p>
            <p className="text-muted small mb-0">{flight.departure_airport} → {flight.arrival_airport}</p>
            <p className="text-muted small">Direct</p>
          </div>
        </div>
        {/* Price & Select Button */}
        <div className="text-end">
          <h5 className="text-danger fw-bold mb-3">
            IDR {flight.price.toLocaleString()}
          </h5>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#7126B5", border: "none" }}
          >
            Pilih
          </button>
        </div>
      </div>

      {/* Flight Info */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <h5 className="fw-bold">{flight.departure_time}</h5>
          <p className="text-muted small">{flight.departure_airport}</p>
        </div>
        <div className="text-center">
          <p className="mb-0 text-muted">{flight.duration}</p>
          <p className="text-muted small">Direct</p>
        </div>
        <div>
          <h5 className="fw-bold">{flight.arrival_time}</h5>
          <p className="text-muted small">{flight.arrival_airport}</p>
        </div>
      </div>

      {/* Toggle Details */}
      <div
        className="text-end mt-2"
        style={{ cursor: "pointer", color: "#7126B5" }}
        onClick={toggleDetails}
      >
        {isDetailsOpen ? "Tutup Detail" : "Lihat Detail"}
      </div>

      {/* Details Section */}
      {isDetailsOpen && <FlightDetails flight={flight} airline={airline} />}
    </div>
  );
}

function Index() {
  const { flight, airlane } = data;

  return (
    <div className="container my-4">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3">
          <div className="p-3 rounded bg-light">
            <h6 className="fw-bold mb-3">Filter</h6>
            <button className="btn btn-outline-secondary w-100 mb-2">
              Transit
            </button>
            <button className="btn btn-outline-secondary w-100 mb-2">
              Fasilitas
            </button>
            <button className="btn btn-outline-secondary w-100">
              Harga
            </button>
          </div>
        </aside>

        {/* Flight List */}
        <div className="col-md-9">
          {flight.map((flight) => {
            const airline = airlane.find((airline) => airline.id === flight.airline_id);
            return <FlightCard key={flight.id} flight={flight} airline={airline} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Index;
