import React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'

export const Route = createLazyFileRoute('/users/private/payment/')({
  component: Payment,
})

// const isAvailable = transactions?.data.length > 0;
 
function Payment() {
  return (
    <div>
      <Row className="justify-content-center mt-2 mb-4 p-3 shadow-sm">
        <Col lg={10} md={10} sm={12}>
          <BreadcrumbNav
            items={[
              { label: 'Isi Data Diri', path: '/users/private/checkout' },
              { label: 'Bayar', path: './' },
              { label: 'Selesai' },
            ]}
          />
          <AlertBox
            type="warning"
            message="Selesaikan Pembayaran sampai 10 Maret 2023 12:00 AM"
          />
        </Col>
      </Row>
      <Container>
        {/* {isAvailable ? ( */}
          <>
            <Row className="justify-content-center my-5">
              <Col lg={6} md={6} className="mb-4">
                <Card.Body>
                  <h4>Isi Data Pembayaran</h4>
                  <div className="my-3">
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
              </Col>

              <Col lg={4} md={5}>
                <h6>
                  Booking Code:{' '}
                  <a href="#">
                    6723y2GHK
                  </a>
                </h6>

                <div className="mt-4">
                  <Row>
                    <Col xs={8}>
                      <div>
                        <span>
                          <strong>07:00</strong>
                        </span>
                        <br />
                        <span>3 Maret 2023</span>
                      </div>
                    </Col>
                    <Col xs={4} className="text-end align-self-start">
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

                <div className="mt-4">
                  <p>
                    2 Adults <span>IDR 9.550.000</span> <br />
                    1 Baby <span>IDR 0</span> <br />
                    Tax <span>IDR 300.000</span>
                  </p>
                  <hr />
                  <h5>
                    Total <span>IDR 9.850.000</span>
                  </h5>
                </div>
              </Col>
            </Row>
          </>
        {/* ) : ( */}
          {/* <>
            <Row className="justify-content-center mt-2 mb-4 py-3 shadow-sm">
              <Col lg={9} md={10}>
                <BreadcrumbNav
                  items={[
                    { label: 'Isi Data Diri', path: '/users/private/checkout' },
                    { label: 'Bayar', path: '/users/private/checkout/payment' },
                    { label: 'Selesai', path: './' },
                  ]}
                />
                <AlertBox
                  type="success"
                  message="Terima kasih atas pembayaran transaksi anda"
                />
              </Col>
            </Row>
            <div className="d-flex flex-column align-items-center">
              <Col xs={9} sm={8} md={5} lg={4} className="text-center my-2">
                <img
                  src={notFound}
                  alt="No order history found"
                  className="img-fluid mb-2 w-75 mx-auto"
                />
                <p
                  style={{ color: '#a06ece', fontWeight: 500 }}
                >
                  Selamat! <br />
                  <span className="text-dark my-2">
                    Transaksi pembayaran tiket anda berhasil
                  </span>
                </p>
              </Col>
              <Col xs={10} sm={8} md={5} lg={4}>
                <Button
                  as={Link}
                  href={`/`}
                  style={{
                    backgroundColor: '#7126B5',
                    borderRadius: '14px',
                    border: 'none',
                    color: 'white',
                    boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    padding: '10px 0',
                  }}
                >
                  Terbitkan Tiket
                </Button>
                <Button
                  as={Link}
                  href={`/`}
                  style={{
                    backgroundColor: '#d0b7e6',
                    borderRadius: '14px',
                    border: 'none',
                    color: 'white',
                    boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    padding: '10px 0',
                  }}
                >
                  Cari Penerbangan Lain
                </Button>
              </Col>
            </div>
          </> */}
        {/* )} */}
      </Container>
    </div>
  )
}

export default Payment
