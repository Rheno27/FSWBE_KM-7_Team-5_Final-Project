import React from "react";
import "./FlightList.css";
import { Accordion, Button, Row, Col, Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import logo from "../../assets/img/Thumbnail.png";
import koper from "../../assets/img/koper.png";
import noDataImage from "../../assets/img/notfound.png"; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function CustomToggle({ children, eventKey }) {
  const [isAccordionOpen,setIsAccordionOpen] = React.useState(false);
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    isAccordionOpen ? setIsAccordionOpen(false) : setIsAccordionOpen(true)
  );

  return (
    <button
      type="button"
      className="border-0 bg-white"
      onClick={decoratedOnClick}
    >
      
      {isAccordionOpen ? (
                      <KeyboardArrowUpIcon />):(
                      <KeyboardArrowDownIcon />)}
    </button>
  );
}

const FlightList = ({ flights = [], airlines = [], airports = [] }) => {
  if (flights.length === 0) {
    return (
      <div className="no-data-container text-center">
        <img
          src={noDataImage}
          alt="No Flights Found"
          className="no-data-image"
          style={{ width: "320px", marginBottom: "20px" }}
        />
      </div>
    );
  }

  return (
    <Accordion className="flight-list">
      {flights.map((flight, index) => {
        const airline = airlines?.find((airline) => airline.id === flight.airline_id) || {};
        const originAirport = airports?.find((airport) => airport.id === flight.airport_id_from) || {};
        const destinationAirport = airports?.find((airport) => airport.id === flight.airport_id_to) || {};
        return (
          <Accordion.Item eventKey={index} key={index} className="flight-card px-3 py-2">
            {/* Flight Summary */}
            <Card.Header>
              <div className="w-100">
                {/* Logo and Airline Info */}
                <Row className="mb-3">
                  <Col sm={8} className="d-flex align-items-center">
                    <img
                      src={logo}
                      alt="Airline Logo"
                      className="flight-logo"
                    />
                    <h6 className="mb-0 fw-bold" style={{ fontSize: "16px", marginLeft: "10px" }}>
                      {airline.name || "Unknown Airline"} - {flight?.class || "Economy"}
                    </h6>
                  </Col>
                  <Col sm={4} className="d-flex align-items-center justify-content-end">
                    <CustomToggle eventKey="0" />
                  </Col>
                </Row>

                {/* Flight Timing on the Left, Price on the Right */}
                <Row className="mb-3">
                  {/* Flight Timing Section (Left) */}
                  <Col sm={9}>
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
                        <Col className="d-flex justify-content-start">
                          <img
                            src={koper}
                            alt="koper"
                            className="flight-baggage-icon"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  {/* Price Section (Right) */}
                  <Col sm={3} className="d-flex flex-column align-items-end">
                    <h6 className="fw-bold text-purple mb-2" style={{ color: "#7126B5", fontSize: "20px" }}>
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
            </Card.Header>

            {/* Flight Details */}
            <Accordion.Collapse className="flight-details" eventKey="0">
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
                    <small className="text-purple fw-bold">Keberangkatan</small>
                  </Col>
                </Row>
                <hr className="my-2" />

                {/* Informasi */}
                <Row className="align-items-center mb-4">
                  <Col xs={12} className="ms-5">
                    <h6 className="fw-bold mb-1">
                      {airline.name || "Jet Air"} - {flight?.class || "Economy"}
                    </h6>
                    <small>{flight?.flight_number || "JT-203"}</small>
                  </Col>

                  {/* Logo */}
                  <Col xs="auto" className="d-flex justify-content-center align-items-center ms-auto">
                    <img
                      src={logo}
                      alt="logo"
                      className="flight-logo-small"
                    />
                  </Col>

                  {/* Informasi Text */}
                  <Col>
                    <p className="mb-0">
                      <strong>Informasi:</strong>
                      <br />
                      Baggage 20 kg
                      <br />
                      Cabin baggage 7 kg
                      <br />
                      In-Flight Entertainment
                    </p>
                  </Col>
                </Row>
                <hr className="my-2" />

                {/* Kedatangan */}
                <Row className="align-items-start">
                  <Col>
                    <h6 className="fw-bold mb-0">{flight?.arrival_time || "00:00"}</h6>
                    <small>{flight?.date || "N/A"}</small>
                    <br />
                    <small>{destinationAirport.name || "Unknown Destination"}</small>
                  </Col>
                  <Col xs="auto" className="text-end">
                    <small className="text-purple fw-bold">Kedatangan</small>
                  </Col>
                </Row>
              </Container>
            </Accordion.Collapse>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default FlightList;
