import React from "react";
import "./style.css";
import { Accordion, Button, Row, Col, Container } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import logo from "../../assets/img/Thumbnail.png";
import koper from "../../assets/img/koper.png";
import noDataImage from "../../assets/img/notfound.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setFlightIdRedux,
  setReturnFlightIdRedux,
} from "../../redux/slices/searchQuery";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import _, { initial } from "lodash";

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

const FlightList = ({
  filteredFlights,
  isFromSelected,
  setIsFromSelected,
  setSelectedFlightId,
  selectedFlightId,
  fetchFlightsData,
  hasMore,
}) => {
  const dispatch = useDispatch();
  const returnDate =
    useSelector((state) => state.searchQuery.arrivalDate) || new Date();
  const navigate = useNavigate();
  const isReturn = useSelector((state) => state.searchQuery.isReturn);

  const clickHandler = (flightId) => {
    if (isReturn && !isFromSelected) {
      setIsFromSelected(true);
      setSelectedFlightId(flightId);
      fetchFlightsData(true, returnDate, true);
      return;
    } else {
      if (isReturn && isFromSelected) {
        dispatch(setReturnFlightIdRedux(flightId));
        dispatch(setFlightIdRedux(selectedFlightId));
      } else {
        dispatch(setFlightIdRedux(flightId));
      }
      navigate({ to: `/users/private/checkout` });
    }
  };

  // No Flights Data
  if (!Array.isArray(filteredFlights) || filteredFlights.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center no-data-container text-center">
        <img
          src={noDataImage}
          alt="No Flights Found"
          className="no-data-image img-fluid"
          style={{ maxWidth: "400px", height: "auto", marginBottom: "20px" }}
        />
        <h5 className="font-bold">Maaf pencarian anda tidak ditemukan</h5>
        <p style={{ color: "#7126B5" }}>Coba cari perjalanan lainnya!</p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      className="p-2"
      dataLength={filteredFlights.length}
      next={() => {
          fetchFlightsData(false, null, false, true);
      }}
      hasMore={hasMore}
    >
      {filteredFlights.map((flight, index) => {
        const { airline, airportFrom, airportTo } = flight;
        return (
          <Accordion className="flight-list" key={index}>
            <Accordion.Item
              eventKey={index.toString()}
              key={index}
              className="flight-card px-3 py-2"
            >
              <Card.Header>
                <Row className="align-items-center">
                  <Col xs={8} sm={8} className="d-flex align-items-center">
                    <img
                      src={logo}
                      alt="Airline Logo"
                      className="flight-logo img-fluid"
                      style={{ maxWidth: "50px" }}
                    />
                    <h6
                      className="mb-0 fw-bold text-truncate"
                      style={{ marginLeft: "10px" }}
                    >
                      {airline?.name ?? "Unknown Airline"} -{" "}
                      {flight.class ?? "Economy"}
                    </h6>
                  </Col>
                  <Col xs={4} sm={4} className="text-end">
                    <CustomToggle eventKey={index.toString()} />
                  </Col>
                </Row>

                <Row className="mt-3 align-items-center">
                  <Col xs={12} md={9}>
                    <Row>
                      <Col xs={2} className="text-center">
                        <h6 className="fw-bold mb-0">
                          {flight.departureTime ?? "00:00"}
                        </h6>
                        <small>{airportFrom?.code ?? "JKT"}</small>
                      </Col>
                      <Col xs={7} className="text-center">
                        <small className="text-muted">
                          {flight.duration ?? "N/A"} minutes
                        </small>
                        <hr className="m-1" />
                        <small>{flight.description ?? "Direct"}</small>
                      </Col>
                      <Col xs={2} className="text-center">
                        <h6 className="fw-bold mb-0">
                          {flight.arrivalTime ?? "00:00"}
                        </h6>
                        <small>{airportTo?.code ?? "MLB"}</small>
                      </Col>
                      <Col xs={1} className="text-center">
                        <img
                          src={koper}
                          alt="Koper Logo"
                          className="img-fluid"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
                    <h6
                      className="fw-bold text-purple mb-2"
                      style={{ color: "#7126B5" }}
                    >
                      {flight.price ? (
                        <>
                          <span>IDR </span>
                          <span>{flight.price.toLocaleString("id-ID")}</span>
                        </>
                      ) : (
                        "Price Unavailable"
                      )}
                    </h6>
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        className="button-select"
                        onClick={() => {
                          clickHandler(flight.id);
                        }}
                      >
                        Pilih
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <div>
                <Accordion.Collapse
                  className="flight-details"
                  eventKey={index.toString()}
                >
                  <Container>
                    <h6 className="text-purple mb-3 fw-bold">
                      Detail Penerbangan
                    </h6>
                    <Row className="align-items-start mb-4">
                      <Col>
                        <h6 className="fw-bold mb-0">
                          {flight.departureTime ?? "00:00"}
                        </h6>
                        <small>
                          {new Date(flight.departureDate).toLocaleDateString(
                            "en-CA"
                          ) ?? "N/A"}
                        </small>
                        <br />
                        <small>
                          {airportFrom?.name ?? "Unknown Origin"} - Terminal{" "}
                          {flight.terminal ?? "N/A"}
                        </small>
                      </Col>
                      <Col xs="auto" className="text-end">
                        <small className="text-purple fw-bold">
                          Keberangkatan
                        </small>
                      </Col>
                    </Row>
                    <hr />
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
                          {airline?.name ?? "Jet Air"} -{" "}
                          {flight.class ?? "Economy"}
                        </h6>
                        <small>{flight.flight_number ?? "JT-203"}</small>
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
                        <h6 className="fw-bold mb-0">
                          {flight.arrivalTime ?? "00:00"}
                        </h6>
                        <small>
                          {new Date(flight.arrivalDate).toLocaleDateString(
                            "en-CA"
                          ) ?? "N/A"}
                        </small>
                        <br />
                        <small>
                          {airportTo?.name ?? "Unknown Destination"}
                        </small>
                      </Col>
                      <Col xs="auto" className="text-end">
                        <small className="text-purple fw-bold">
                          Kedatangan
                        </small>
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Collapse>
              </div>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </InfiniteScroll>
  );
};

FlightList.propTypes = {
  filteredFlights: PropTypes.any,
  isFromSelected: PropTypes.bool,
  setIsFromSelected: PropTypes.any,
  selectedFlightId: PropTypes.any,
  setSelectedFlightId: PropTypes.any,
  fetchFlightsData: PropTypes.any,
  hasMore: PropTypes.bool,
};
CustomToggle.propTypes = {
  eventKey: PropTypes.any,
};

export default FlightList;
