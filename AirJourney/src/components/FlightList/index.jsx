import React from "react";
import "./FlightList.css";
import { Accordion, Button, Row, Col, Container } from "react-bootstrap";
import logo from "../../assets/img/Thumbnail.png";
import koper from "../../assets/img/koper.png";

const FlightList = ({ flights = [], airlines = [], airports = [] }) => {
  return (
    <Accordion className="flight-list">
      {flights.map((flight, index) => {
        const airline = airlines?.find((airline) => airline.id === flight.airline_id) || {};
        const originAirport = airports?.find((airport) => airport.id === flight.airport_id_from) || {};
        const destinationAirport = airports?.find((airport) => airport.id === flight.airport_id_to) || {};

        return (
          <Accordion.Item eventKey={index} key={index} className="flight-card">
            {/* Flight Summary */}
            <Accordion.Header>
              <div className="w-100">
                {/* Logo and Airline Info */}
                <Row className="mb-3">
                  <Col sm={8} className="d-flex align-items-center">
                    <img
                      src={logo}
                      alt="Airline Logo"
                      style={{ width: "30px", height: "30px", marginRight: "10px" }}
                    />
                    <h6 className="mb-0 fw-bold" style={{ fontSize: "16px" }}>
                      {airline.name || "Unknown Airline"} - {flight?.class || "Economy"}
                    </h6>
                  </Col>
                </Row>

                {/* Flight Timing on the Left, Price on the Right */}
                <Row className="mb-3">
                  {/* Flight Timing Section (Left) */}
                  <Col sm={9} >
                    <div className="flight-timing">
                      <Row className="d-flex justify-content-between align-items-center">
                        <Col className="text-center">
                          <h6 className="fw-bold mb-0">{flight?.departure_time || "00:00"}</h6>
                          <small>{originAirport.code || "JKT"}</small>
                        </Col>
                        <Col className="text-center">
                          <small className="text-muted">{flight?.duration || "N/A"}</small>
                          <hr className="m-1" />
                          <small>{flight?.description || "Direct"}</small>
                        </Col>
                        <Col className="text-center">
                          <h6 className="fw-bold mb-0">{flight?.arrival_time || "00:00"}</h6>
                          <small>{destinationAirport.code || "MLB"}</small>
                        </Col>
                        <Col>
                        <img
                    src={koper}
                    alt="koper"
                    style={{ width: "30px", height: "30px", marginRight: "10px" }}
                  />
                        </Col>
                      </Row>
                        
                    </div>
                  </Col>
                  {/* Price Section (Right) */}
                  <Col sm={3} className="d-flex flex-column align-items-end">
                    <h6 className="fw-bold text-purple mb-2" style={{ color: "#7126B5" }}>
                      {flight?.price ? (
                        <>
                          <span>IDR </span>
                          <span>{flight.price.toLocaleString("id-ID")}</span>
                        </>
                      ) : (
                        "Price Unavailable"
                      )}
                    </h6>
                    {/* Button below Price */}
                    <Button variant="primary" className="button-select">
                      Pilih
                    </Button>
                  </Col>
                </Row>
              </div>
            </Accordion.Header>

{/* Flight Details */}
<Accordion.Body className="flight-details">
  <Container>
    {/* Section Title */}
    <h6 className="text-purple mb-3">Detail Penerbangan</h6>

    {/* Keberangkatan */}
    <Row className="align-items-start mb-4">
      <Col>
        <h6 className="fw-bold mb-0">{flight?.departure_time || "00:00"}</h6>
        <small>{flight?.date || "N/A"}</small>
        <br />
        <small>
          {originAirport.name || "Unknown Origin"} - Terminal {flight?.terminal || "N/A"}
        </small>
      </Col>
      <Col xs="auto" className="text-end">
        <small className="text-purple">Keberangkatan</small>
      </Col>
    </Row>
    <hr className="my-2"/>

    {/* Airline and Flight Information */}
    <Row className="mb-4">
      <Col>
        <h6 className="fw-bold mb-0">
          {airline.name || "Jet Air"} - {flight?.class || "Economy"}
        </h6>
        <small>{flight?.flight_number || "JT-203"}</small>
      </Col>
    </Row>

    {/* Informasi */}
    <Row className="align-items-center mb-4">
      <Col>
        <p className="mb-2">
          <strong>
            <img
            src={logo}
            alt="logo"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />Informasi:</strong>
          <br />
          Baggage 20 kg
          <br />
          Cabin baggage 7 kg
          <br />
          In-Flight Entertainment
        </p>
      </Col>
    </Row>
    <hr className="my-2 "/>

    {/* Kedatangan */}
    <Row className="align-items-start">
      <Col>
        <h6 className="fw-bold mb-0">{flight?.arrival_time || "00:00"}</h6>
        <small>{flight?.date || "N/A"}</small>
        <br />
        <small>{destinationAirport.name || "Unknown Destination"}</small>
      </Col>
      <Col xs="auto" className="text-end">
        <small className="text-purple">Kedatangan</small>
      </Col>
    </Row>
  </Container>
</Accordion.Body>

          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default FlightList;
