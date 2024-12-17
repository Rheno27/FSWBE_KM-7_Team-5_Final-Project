import { React, useEffect, useState } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import { toast } from "react-toastify";
import { useQuery } from '@tanstack/react-query'
import { OrderDetailCard } from "../../../../components/PaymentDetails/index.jsx";
import { getDetailTransaction } from '../../../../services/transaction/index.js'

export const Route = createLazyFileRoute('/users/private/payment/$id')({
  component: Payment,
})

function Payment() {
  const { id } = Route.useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') ;

  useEffect(() => {
    if (!token || token.trim() === "") {
      toast.error("Unauthorized, redirecting to homepage", {
        position: "bottom-center", // Toast will appear at the bottom-center
        autoClose: 4000, // Toast auto-closes after 6 seconds
      });
  
      // Delay the navigation for 6 seconds (same as toast duration)
      const timer = setTimeout(() => {
        navigate({ to : '/'}); // Redirect to the homepage
      }, 4000);
  
      // Cleanup timer when component unmounts or re-renders
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);
  
  const { data: transaction, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(
        err.message || "An error occurred while fetching transaction data"
      );
    },
  });

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
    if (isSuccess && transaction?.data?.payment?.snapToken) {
      const snapToken = transaction.data.payment.snapToken;
      
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
  }, [isSuccess, transaction]);

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

          <Col lg={4} md={5} className="mt-4">
            {id ? (
              <OrderDetailCard id={id} />
            ) : (
              <p className="text-danger">Transaction ID is missing</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Payment
