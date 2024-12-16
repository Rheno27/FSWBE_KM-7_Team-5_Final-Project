import { React, useEffect } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import styles from './payment.module.css'
import { useQuery } from '@tanstack/react-query'
import { getDetailTransaction } from '../../../../services/transaction/index.js'

export const Route = createLazyFileRoute('/users/private/payment/$id')({
  component: Payment,
})

function Payment() {
  const { id } = Route.useParams()

  const { data, isSuccess } = useQuery({
    queryKey: ['payment', id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
  })

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isSuccess && data?.data?.payment?.snapToken) {
      const snapToken = data.data.payment.snapToken;
      if (!document.getElementById('snap-container').hasChildNodes()) {
        window.snap.embed(snapToken, {
          embedId: 'snap-container',
          onSuccess: function (result) {
            alert('Payment success!');
          },
          onPending: function (result) {
            alert('Waiting for payment!');
          },
          onError: function (result) {
            alert('Payment failed!');
          },
          onClose: function () {
            alert('You closed the popup without finishing the payment');
          },
        });
      }
    }
  }, [isSuccess, data]);

  return (
    <div className="payment-page">
      <Row className="justify-content-center mt-2 mb-4 py-3 shadow-sm">
        <Col lg={9} md={10}>
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
        <Row className="justify-content-center my-4">
          <Col lg={6} md={6} className="mb-4">
            <div id="snap-container"></div>
          </Col>

          <Col lg={4} md={5}>
            <h6>
              Booking Code:{' '}
              <a href="#" className="booking-code">
                {data?. data?.payment?.id}
              </a>
            </h6>

            <div className="flight-info mt-4">
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
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Payment
