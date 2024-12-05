import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import "./payment.css"; 
import { BreadcrumbNav, ReminderBox } from "../../../../components/ProgresBar/custom.jsx";

export const Route = createLazyFileRoute('/users/private/payment/')({
    component: Payment,
});

function Payment() {
  return (
    <div className="payment-page">
      <Row className="justify-content-center mt-4">
        <Col lg={9} md={10}>
            <BreadcrumbNav
                items={[
                    { label: "Isi Data Diri", path: "/users/private/checkout" },
                    { label: "Bayar", path: "users/private/payment" },
                    { label: "Selesai"},
                ]}
            />
            <ReminderBox type="error" message="Selesaikan Pembayaran sampai 10 Maret 2023 12:00" />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={6} md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>Isi Data Pembayaran</h5>
              <div className="payment-method">
                <Form.Select className="mb-3">
                  <option>Gopay</option>
                </Form.Select>
                <Form.Select className="mb-3">
                  <option>Virtual Account</option>
                </Form.Select>
                <Form.Select className="mb-3">
                  <option>Credit Card</option>
                </Form.Select>
              </div>

              <img
                src="https://via.placeholder.com/200x40" // Replace with real image if needed
                alt="Credit Card Logos"
                className="d-block mb-3"
              />

              <Form>
                <Form.Group controlId="cardNumber" className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" placeholder="4480 0000 0000 0000" />
                </Form.Group>

                <Form.Group controlId="cardHolderName" className="mb-3">
                  <Form.Label>Card Holder Name</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="cvv" className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control type="text" placeholder="000" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="expiryDate" className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control type="text" placeholder="07/24" />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" className="w-100">
                  Bayar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Booking Code: <a href="#" className="booking-code">6723y2GHK</a></h6>

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
                  2 Adults <span className="float-end">IDR 9.550.000</span> <br />
                  1 Baby <span className="float-end">IDR 0</span> <br />
                  Tax <span className="float-end">IDR 300.000</span>
                </p>
                <hr />
                <h5>
                  Total <span className="float-end">IDR 9.850.000</span>
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
