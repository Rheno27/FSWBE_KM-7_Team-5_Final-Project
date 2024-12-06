import React from 'react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import paymentSuccess from '../../../../assets/img/empty-illust.png'

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
        <Row className="justify-content-center">
          <Col xs="auto">
            {' '}
            {/* Shrink the column wisth to fit the content */}
            <img
              src={paymentSuccess}
              alt="Payment Success"
              className="img-fluid mb-3 ms-5"
            />
            <p
              style={{ color: '#a06ece', textAlign: 'center', fontWeight: 500 }}
            >
              Selamat! <br />
              <span className="text-dark my-2">
                Transaksi pembayaran tiket anda berhasil
              </span>
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={10} sm={8} md={5} lg={4} className="text-center">
            <Button
              as={Link}
              href={`#`}
              style={{
                backgroundColor: '#7126B5',
                borderRadius: '14px',
                color: 'white',
                boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                padding: '10px 0',
              }}
            >
              Terbitkan Tiket
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={10} sm={8} md={5} lg={4} className="text-center">
            <Button
              as={Link}
              href={`#`}
              style={{
                backgroundColor: '#d0b7e6',
                borderRadius: '14px',
                color: 'white',
                boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                padding: '10px 0',
              }}
            >
              Cari Penerbangan Lain
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PaymentSuccess
