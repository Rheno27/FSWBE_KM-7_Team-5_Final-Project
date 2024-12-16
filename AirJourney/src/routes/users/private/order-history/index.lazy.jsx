import * as React from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Row, Col, Container, Button, Card, Alert, Form } from "react-bootstrap";
import { ArrowBack, FilterAlt, Search, Place } from "@mui/icons-material";
import { useState } from "react";
import DateFilterModal from "../../../../components/Modal/DateFilterModal";
import SearchModal from "../../../../components/Modal/SearchModal";
import data from "../../../../data/dummy.json";

export const Route = createLazyFileRoute("/users/private/order-history/")({
  component: OrderHistory,
});

function OrderHistory() {
  const [payments, setPayments] = useState(data.payment);
  const [transactions, setTransactions] = useState(data.transaction);

  // State for modals visibility
  const [showDateFilterModal, setShowDateFilterModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Handlers to show modals
  const handleDateFilterModalShow = () => setShowDateFilterModal(true);
  const handleSearchModalShow = () => setShowSearchModal(true);

  // Handlers to hide modals
  const handleDateFilterModalClose = () => setShowDateFilterModal(false);
  const handleSearchModalClose = () => setShowSearchModal(false);

  const statusBadge = {
    backgroundColor: "grey",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    color: "white",
    textAlign: "center",
    borderRadius: "20px",
    padding: "5px 10px",
    width: "fit-content",
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter and append the rest
  };  

  return (
    <div>
      <Row
        className="justify-content-center align-items-center mb-3 py-3 mx-auto shadow-sm"
        style={{ padding: '0 15px' }}
      >
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            margin: '10px 0',
            display: 'block',
            textAlign: 'left',
          }}
        >
          Riwayat Pemesanan
        </span>

        {/* Adjust Column Proportions */}
        <Col lg={10} md={10} xs={8} className="d-flex justify-content-start m-0">
          <Button
            as={Link}
            href={`/`}
            style={{
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: '#a06ece',
              borderColor: '#a06ece',
              color: '#ffffff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <span>
              <ArrowBack fontSize="medium" className="me-2 ms-3" />
              Beranda
            </span>
          </Button>
        </Col>

        <Col lg={1} md={1} xs={3} className="d-flex justify-content-center p-0 m-0">
          <Button
            onClick={handleDateFilterModalShow}
            style={{
              padding: '2px 7px',
              borderRadius: '20px',
              backgroundColor: 'white',
              borderColor: '#7126b4',
              color: '#7126b4',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              width: 'fit-content',
            }}
          >
            <span>
              <FilterAlt fontSize="medium" className="me-1" />
              Filter
            </span>
          </Button>
        </Col>

        <Col lg={1} md={1} xs={1} className="d-flex justify-content-end m-0">
          <span onClick={handleSearchModalShow}>
            <Search
              fontSize="large"
              sx={{
                color: '#7126b4',
                cursor: 'pointer',
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
        {transactions.map((transaction) => (
          <Row key={transaction.id} className="mb-3">
            <Col lg={6} md={8}>
            <span><strong>Desember 2024</strong></span>
              <Card className="p-3 shadow-sm rounded-3 mt-2">
                {payments.map((payment) => (
                  <div key={payment.id} className="payment-card">
                    <Alert variant="filled" style={statusBadge}>
                      {capitalizeFirstLetter(payment.status)}
                    </Alert>
                  </div>
                ))}
                <Row className="align-items-center mt-2 fs-8">
                  <Col xs={1} className="ps-2 m-0">
                    <Place color="secondary" />
                  </Col>
                  <Col xs={3} className="p-0 m-0">
                    <span><b>Jakarta</b></span>
                    <br />
                    <span>24 Des 2024</span>
                    <br />
                    <span>12.00</span>
                  </Col>
                  <Col xs={4} className="p-0 m-0 text-center">
                    <span className="pe-3 text-muted">4h 1m</span>
                    <br />
                    <svg width="100%" height="24" viewBox="0 0 160 24">
                      {/* Increased the tail length */}
                      <line
                        x1="0"
                        y1="12"
                        x2="140"
                        y2="12"
                        stroke="#7126b4"
                        strokeWidth="2"
                      />
                      {/* Arrowhead repositioned at the end of the line */}
                      <polygon points="140,12 130,6 130,18" fill="#7126b4" />
                    </svg>
                  </Col>
                  <Col xs={1} className="ps-2 m-0">
                    <Place color="secondary" />
                  </Col>
                  <Col xs={3} className="p-0 m-0">
                    <span><b>Melbourne</b></span>
                    <br />
                    <span>20 Des 2024</span>
                    <br />
                    <span>19.00</span>
                  </Col>
                </Row>
                <hr />
                <Row className="justify-content-between align-items-center fs-8">
                  <Col xs={1}></Col>
                  <Col xs={4} className="p-0 m-0">
                    <span><b>Booking Code :</b></span>
                    <br />
                    <span>{transaction.transaction_code}</span>
                  </Col>
                  <Col xs={4} className="p-0 m-0">
                    <span><b>Class :</b></span>
                    <br />
                    <span>Economy</span>
                  </Col>
                  <Col xs={3} className="p-0 m-0">
                    <span><b>IDR {new Intl.NumberFormat('id-ID').format(transaction.amount)}</b></span>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg={4} md={6}>
              <div className="mt-4">
                {payments.map((payment) => (
                  <Row key={payment.id}>
                    <Col>
                    <strong>Detail Pesanan</strong>
                    </Col>
                    <Col xs='auto' className="text-end align-self-start">
                    <Alert variant="filled" style={statusBadge}>
                      {capitalizeFirstLetter(payment.status)}
                    </Alert>
                    </Col>
                  </Row>
                ))}
                <Form>
                <h6>
                  Booking Code:{" "}
                  <a href="#" className="booking-code">
                    6723y2GHK
                  </a>
                </h6>

                <div className="flight-info mt-4">
                  <Row>
                  <Col>
                    <p>
                      <span><strong>07:00</strong></span> <br />
                      <span>3 Maret 2023</span> <br />
                      <span>Soekarno Hatta - Terminal 1A Domestik</span>
                    </p>
                  </Col>
                  <Col xs='auto' className="text-end align-self-start">
                    <p className="text-muted">Keberangkatan</p>
                  </Col>
                  <hr />
                  </Row>
                  <Row>
                    <Col xs='auto'>
                      <img src="" alt="airline" />
                    </Col>

                    <Col>
                      <strong>Jet Air - Economy</strong> <br />
                      JT - 203 <br />
                      <strong>Informasi:</strong> <br />
                      Penumpang 1 : <br />
                      Penumpang 2 :<br />
                    </Col>
                    <hr  className="mt-2"/>
                  </Row>
                  <Row>
                  <Col>
                    <p>
                      <span><strong>07:00</strong></span> <br />
                      <span>3 Maret 2023</span> <br />
                      <span>Soekarno Hatta - Terminal 1A Domestik</span>
                    </p>
                  </Col>
                  <Col xs='auto' className="text-end align-self-start">
                    <p className="text-muted">Kedatangan</p>
                  </Col>
                  </Row>
                </div>

                <div className="price-details mt-4">
                  <hr />
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
                <Button
            as={Link}
            href={`/`}
            style={{
              padding: '8px',
              borderRadius: '12px',
              backgroundColor: '#a06ece',
              borderColor: '#a06ece',
              color: '#ffffff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            <span>
              Cetak Tiket
            </span>
          </Button>
                </Form>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
