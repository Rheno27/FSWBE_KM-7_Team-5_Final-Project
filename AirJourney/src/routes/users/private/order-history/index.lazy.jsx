import * as React from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Row, Col, Container, Button, Card, Alert, Form } from "react-bootstrap";
import { Place } from "@mui/icons-material";
import { useState } from "react";
import { HeaderNav } from "../../../../components/ui/headerNav";
import data from "../../../../data/dummy.json";
 
export const Route = createLazyFileRoute("/users/private/order-history/")({
  component: OrderHistory,
});

function OrderHistory() {
  const [payments, setPayments] = useState(data.payment);
  const [transactions, setTransactions] = useState(data.transaction);

  const statusBadge = {
    backgroundColor: "grey",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    color: "white",
    textAlign: "center",
    borderRadius: "20px",
    padding: "4px 10px",
    width: "fit-content",
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter and append the rest
  };  
 
  return (
    <div>
      <HeaderNav />
      <Container>
        {transactions.map((transaction) => (
          <Row key={transaction.id} className="justify-content-center gap-3 my-4">
            <Col lg={6} md={6}>
            <span><strong>Desember 2024</strong></span>
              <Card className="p-3 shadow-sm rounded-3 mt-2 w-100">
                {payments.map((payment) => (
                  <div key={payment.id}>
                    <Alert variant="filled" style={statusBadge}>
                      {capitalizeFirstLetter(payment.status)}
                    </Alert>
                  </div>
                ))}
                <Row className="align-items-center fs-8">
                  <Col xs={1} className="m-0">
                    <Place color="secondary" />
                  </Col>
                  <Col xs={3} className="p-0 m-0">
                    <span><b>Jakarta</b></span>
                    <br />
                    <span>24 Des 2024</span>
                    <br />
                    <span>12.00</span>
                  </Col>
                  <Col xs={4} className="p-0 m-0 text-center px-2">
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
                  <Col xs={1} className="m-0">
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
            <Col lg={4} md={5} className="mt-4">
              <Card className="p-3 shadow-sm rounded-3 mt-1 w-100">
              <Form>
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
                <h6>
                  Booking Code:{' '}
                  <a href="#" className="booking-code mb-2">
                    6723y2GHK
                  </a>
                </h6>
                <div className="flight-info">
                  <Row>
                    <Col xs={7}>
                      <div>
                        <span>
                          <strong>07:00</strong>
                        </span>
                        <br />
                        <span>3 Maret 2023</span>
                      </div>
                    </Col>
                    <Col xs={5} className="text-end align-self-start">
                      <p className="text-muted">Keberangkatan</p>
                    </Col>
                    <span>Soekarno Hatta - Terminal 1A Domestik</span>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={2}>
                      <img src="" alt="airline-logo" />
                    </Col>
                    <Col xs={10}>
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
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={8}>
                      <div>
                        <span>
                          <strong>11:00</strong>
                        </span>
                        <br />
                        <span>3 Maret 2023</span>
                      </div>
                    </Col>
                    <Col xs={4} className="text-end align-self-start">
                      <p className="text-muted">Kedatangan</p>
                    </Col>
                    <span>Melbourne International Airport</span>
                  </Row>
                  <hr />
                </div>

                <div className="price-details mt-4">
                  <p>
                    2 Adults <span className="float-end">IDR 9.550.000</span> <br />
                    1 Baby <span className="float-end">IDR 0</span> <br />
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
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}