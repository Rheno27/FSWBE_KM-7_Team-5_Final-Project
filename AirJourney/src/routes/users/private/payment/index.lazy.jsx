import * as React from 'react'
import styled from 'styled-components'
import '../../../../assets/css/styles.css'
import Protected from "../../../../components/Auth/Protected";
import { createLazyFileRoute } from '@tanstack/react-router'
import { Row, Col, Card, Button, Breadcrumb, Container } from 'react-bootstrap'

export const Route = createLazyFileRoute('/users/private/payment/')({
  component: Payment,
//   component: () => (
//     <Protected roles={[1]}>
//         <Payment />
//     </Protected>
// ),
})

const StyledBreadcrumb = styled(Breadcrumb)`
  .breadcrumb-item + .breadcrumb-item::before {
    content: ' > ';
    font-weight: bold;
  }
  .breadcrumb-item a {
    text-decoration: none;
    font-size: 18px; /* Font size for the breadcrumb text */
    font-weight: 600; /* Make it bold */
    color: black;
  }
  .breadcrumb-item a:hover {
    text-decoration: underline;
  }
  /* Disabled breadcrumb (grayed out) */
  .breadcrumb .breadcrumb-item.disabled {
    color: #999; /* Light gray color */
  }
`

function Payment () {
  return (
    <>
      <Container>
        <Row>
          <div className="payment-container">
            <StyledBreadcrumb>
              <Breadcrumb.Item href={`/`}>Isi Data Diri</Breadcrumb.Item>
              <Breadcrumb.Item href={`/`}>Bayar</Breadcrumb.Item>
              <Breadcrumb.Item active disabled>
                Selesai
              </Breadcrumb.Item>
            </StyledBreadcrumb>
            <div className="reminder-box">
              <p>Selesaikan Pembayaran sampai 10 Maret 2023 12:00</p>
            </div>
          </div>
        </Row>
        <Row>
          <Col md={6}>
            <p>Isi Data pembayaran</p>
            Api payment integration from midtrans
          </Col>
          <Col md={6}>
            <p>Booking Code</p>
            <p>Payment Detail</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}
