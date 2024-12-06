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

function CustomToggle({ eventKey }) {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setIsAccordionOpen((prevState) => !prevState)
  );

  return (
    <button
      type="button"
      className="border-0 bg-white"
      onClick={decoratedOnClick}
    >
      {isAccordionOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          className="no-data-image img-fluid"
        />
      </div>
    );
  }

  return (
    <Accordion className="flight-list">
      {flights.map((flight, index) => {
        const airline = airlines?.find((airline) => airline.id === flight.airline_id) ?? {};
        const originAirport = airports?.find((airport) => airport.id === flight.airport_id_from) ?? {};
        const destinationAirport = airports?.find((airport) => airport.id === flight.airport_id_to) ?? {};

        return (
          <Accordion.Item eventKey={index.toString()} key={index} className="flight-card px-3 py-2">
            <Card.Header>
              <Row className="align-items-center">
                <Col xs={8} sm={8} className="d-flex align-items-center">
                  <img
                    src={logo}
                    alt="Airline Logo"
                    className="flight-logo img-fluid"
                    style={{ maxWidth: "50px" }}
                  />
                  <h6 className="mb-0 fw-bold text-truncate" style={{ marginLeft: "10px" }}>
                    {airline.name ?? "Unknown Airline"} - {flight?.class ?? "Economy"}
                  </h6>
                </Col>
                <Col xs={4} sm={4} className="text-end">
                  <CustomToggle eventKey={index.toString()} />
                </Col>
              </Row>

              <Row className="mt-3 align-items-center">
                <Col xs={12} md={9}>
                  <Row>
                    <Col xs={4} className="text-center">
                      <h6 className="fw-bold mb-0">{flight?.departure_time ?? "00:00"}</h6>
                      <small>{originAirport.code ?? "JKT"}</small>
                    </Col>
                    <Col xs={3} className="text-center">
                      <small className="text-muted">{flight?.duration ?? "N/A"}</small>
                      <hr className="m-1" />
                      <small>{flight?.description ?? "Direct"}</small>
                    </Col>
                    <Col xs={4} className="text-center">
                      <h6 className="fw-bold mb-0">{flight?.arrival_time ?? "00:00"}</h6>
                      <small>{destinationAirport.code ?? "MLB"}</small>
                    </Col>
                    <Col xs={1} className="text-center">
                      <img src={koper} alt="Koper Logo" className="img-fluid"/>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
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
                  <div className="d-grid">
                    <Button variant="primary" className="button-select">
                      Pilih
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <div >
              <Accordion.Collapse className="flight-details" eventKey={index.toString()}>
                <Container>
                  <h6 className="text-purple mb-3 fw-bold">Detail Penerbangan</h6>
                  <Row className="align-items-start mb-4">
                    <Col>
                      <h6 className="fw-bold mb-0">{flight?.departure_time ?? "00:00"}</h6>
                      <small>{flight?.date ?? "N/A"}</small>
                      <br />
                      <small>{originAirport.name ?? "Unknown Origin"} - Terminal {flight?.terminal ?? "N/A"}</small>
                    </Col>
                    <Col xs="auto" className="text-end">
                      <small className="text-purple fw-bold">Keberangkatan</small>
                    </Col>
                  </Row>
                  <hr />
                  {/* Informasi Section */}
                  <Row className="align-items-center mb-4">
                    <Col xs="auto" className="text-start">
                      <img
                        src={logo} 
                        alt="Informasi Icon"
                        className="informasi-icon img-fluid"
                        style={{ maxWidth: "40px" }}
                      />
                    </Col>
                    <Col>
                      <h6 className="fw-bold mb-1">
                        {airline.name ?? "Jet Air"} - {flight?.class ?? "Economy"}
                      </h6>
                      <small>{flight?.flight_number ?? "JT-203"}</small>
                      <p className="mb-0 mt-2">
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

                  <hr />
                  <Row className="align-items-start">
                    <Col>
                      <h6 className="fw-bold mb-0">{flight?.arrival_time ?? "00:00"}</h6>
                      <small>{flight?.date ?? "N/A"}</small>
                      <br />
                      <small>{destinationAirport.name ?? "Unknown Destination"}</small>
                    </Col>
                    <Col xs="auto" className="text-end">
                      <small className="text-purple fw-bold">Kedatangan</small>
                    </Col>
                  </Row>
                </Container>
              </Accordion.Collapse>
            </div>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};


export default FlightList;
