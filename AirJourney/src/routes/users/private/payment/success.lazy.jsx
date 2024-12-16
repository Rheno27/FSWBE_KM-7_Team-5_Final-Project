import React from 'react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import paymentSuccess from '../../../../assets/img/payment-success.png'

export const Route = createLazyFileRoute('/users/private/payment/success')({
  component: PaymentSuccess,
})

function PaymentSuccess() {
  return (
    <div>
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
      <Container className="py-5">
        <div className="d-flex flex-column align-items-center">
          <Col xs={9} sm={8} md={5} lg={4} className="text-center mt-2">
            <img
              src={paymentSuccess}
              alt="payment success"
              className="img-fluid mb-2 mx-auto w-75"
            />
            <p
              style={{ color: '#a06ece', fontWeight: 500 }}
            >
              Selamat! <br />
              <span className="text-dark mt-2">
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
                margin: '15px 0',
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
      </Container>
    </div>
  )
}

export default PaymentSuccess
