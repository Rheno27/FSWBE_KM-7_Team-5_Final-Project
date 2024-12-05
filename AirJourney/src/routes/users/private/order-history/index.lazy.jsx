import * as React from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import { ArrowBack, FilterAlt, Search, Place, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import DateFilterModal from "../../../../components/Modal/DateFilterModal";
import SearchModal from "../../../../components/Modal/SearchModal";
// import dummy from "../data/dummy.json";

export const Route = createLazyFileRoute("/users/private/order-history/")({
  component: OrderHistory,
});

function OrderHistory() {
  // State for modals visibility
  const [showDateFilterModal, setShowDateFilterModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Handlers to show modals
  const handleDateFilterModalShow = () => setShowDateFilterModal(true);
  const handleSearchModalShow = () => setShowSearchModal(true);

  // Handlers to hide modals
  const handleDateFilterModalClose = () => setShowDateFilterModal(false);
  const handleSearchModalClose = () => setShowSearchModal(false);
  return (
    <div>
      <Row
        className="justify-content-center align-items-center mt-2 mb-4 shadow-sm"
        style={{ padding: "1rem 10rem" }}
      >
        <span
          style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "10px 0" }}
        >
          Riwayat Pemesanan
        </span>
        <Col lg={9} md={9} sm={5}>
          <Button
            as={Link}
            href={`/`}
            style={{
              padding: "8px",
              borderRadius: "12px",
              backgroundColor: "#a06ece",
              borderColor: "#a06ece",
              color: "#ffffff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
              textAlign: "left",
            }}
          >
            <span>
              <ArrowBack fontSize="medium" className="me-3 ms-3" />
              Beranda
            </span>
          </Button>
        </Col>
        <Col lg={2} md={2} sm={4}>
          <Button
            onClick={handleDateFilterModalShow}
            style={{
              padding: "2px",
              borderRadius: "20px",
              backgroundColor: "white",
              borderColor: "#7126b4",
              color: "#7126b4",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            <span>
              <FilterAlt fontSize="medium" className="me-3" />
              Filter
            </span>
          </Button>
        </Col>
        <Col lg={1} md={1} sm={3}>
          <span onClick={handleSearchModalShow}>
            <Search
              fontSize="large"
              sx={{
                color: "#7126b4",
                cursor: "pointer",
              }}
            />
          </span>
        </Col>
        {/* Date Filter Modal */}
        <DateFilterModal
          show={showDateFilterModal}
          onHide={handleDateFilterModalClose}
        />

        {/* Search Modal */}
        <SearchModal show={showSearchModal} onHide={handleSearchModalClose} />
      </Row>
      <Container>
        <Row>
          <Col lg={6} md={8}>
              <Card>
                <span style={{width:'fit-content', padding: '2px 4px', backgroundColor: 'red', borderRadius: '15px'}}>Payment.status</span>
                <Row>
                    <Col>
                        <Place color="secondary"/>
                    </Col>
                    <Col>
                        <span>Origin</span><br />
                        <span>Flight.departure_date</span><br />
                        <span>Flight.departure_time</span>
                    </Col>
                    <Col>
                    <svg width="100%" height="24" viewBox="0 0 100 24">
                        <line 
                            x1="0" 
                            y1="12" 
                            x2="80" 
                            y2="12" 
                            stroke="#7126b4" 
                            strokeWidth="2"
                        />
                        <polygon 
                            points="80,12 70,6 70,18" 
                            fill="#7126b4"
                        />
                    </svg>
                    </Col>
                    <Col>
                        <Place color="secondary"/>
                    </Col>
                    <Col>
                        <span>Origin</span><br />
                        <span>Flight.departure_date</span><br />
                        <span>Flight.departure_time</span>
                    </Col>
                </Row>
              </Card>
          </Col>
          <Col lg={4} md={6}>
            <div>
              <h6>
                Booking Code:{" "}
                <a href="#" className="booking-code">
                  6723y2GHK
                </a>
              </h6>

              <div className="flight-info mt-4">
                <p>
                  <strong>07:00</strong> <br />
                  3 Maret 2023 <br />
                  Soekarno Hatta - Terminal 1A Domestik
                </p>
                <p className="text-muted">Keberangkatan</p>

                <p>
                  <strong>Jet Air - Economy</strong> <br />
                  JT - 203
                </p>

                <p>
                  <strong>Informasi:</strong> <br />
                  Baggage 20 kg <br />
                  Cabin baggage 7 kg <br />
                  In-Flight Entertainment
                </p>

                <p>
                  <strong>11:00</strong> <br />
                  3 Maret 2023 <br />
                  Melbourne International Airport
                </p>
                <p className="text-muted">Kedatangan</p>
              </div>

              <div className="price-details mt-4">
                <p>
                  2 Adults <span className="float-end">IDR 9.550.000</span>{" "}
                  <br />1 Baby <span className="float-end">IDR 0</span> <br />
                  Tax <span className="float-end">IDR 300.000</span>
                </p>
                <hr />
                <h5>
                  Total <span className="float-end">IDR 9.850.000</span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
