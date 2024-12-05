import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { Search, ArrowLeft } from '@mui/icons-material';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/users/private/order-history/')({
    component: OrderHistory,
});

function OrderHistory() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleDetailClick = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  const bookings = [
    // ... your booking data from API or mock data
  ];

  return (
    <div>
      <div className="header">
        <h2>Riwayat Pemesanan</h2>
        <div className="search-bar">
          <Search />
          <input type="text" placeholder="Cari pemesanan" />
        </div>
        <ArrowLeft onClick={() => navigate(-1)} />
      </div>

      <div className="booking-list">
        {bookings.map((booking) => (
          <Card key={booking.bookingCode}>
            <Card.Body>
              <Card.Title>{booking.date}</Card.Title>
              <Row>
                <Col>
                  <p>{booking.departureCity}</p>
                  <p>{booking.departureDate}</p>
                  <p>{booking.departureTime}</p>
                </Col>
                <Col>
                  <p>{booking.duration}</p>
                </Col>
                <Col>
                  <p>{booking.arrivalCity}</p>
                  <p>{booking.arrivalDate}</p>
                  <p>{booking.arrivalTime}</p>
                </Col>
              </Row>
              <div className="booking-info">
                <p>Booking Code: {booking.bookingCode}</p>
                <p>Class: {booking.class}</p>
                <p>Price: {booking.price}</p>
                <p>Status: {booking.status}</p>
              </div>
              <div className="actions">
                <Button variant="primary" onClick={() => handleDetailClick(booking)}>Detail</Button>
                <Button variant="secondary">Cetak Tiket</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showDetailModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ... detail modal content based on selectedBooking */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">Cetak Tiket</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderHistory;