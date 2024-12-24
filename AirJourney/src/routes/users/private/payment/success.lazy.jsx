import React, { useEffect } from 'react'
import { createLazyFileRoute, Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import paymentSuccess from '../../../../assets/img/payment-success.png'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const Route = createLazyFileRoute('/users/private/payment/success')({
  component: PaymentSuccess,
})

function PaymentSuccess({ transaction }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const token = localStorage.getItem('token');

  const INVALID_ID_TOAST = "invalid-id";

  const isValidId = (id) => {
    if (!id) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

    useEffect(() => {
      const isInSuccessPage = window.location.pathname.includes('/payment/success');
      if (!token || token.trim() === "") {
        toast.error("Unauthorized, redirecting to homepage", {
          position: "bottom-center", // Toast will appear at the bottom-center
          autoClose: 3000, 
        });
    
        const timer = setTimeout(() => {
          navigate({ to : '/'}); // Redirect to the homepage
        }, 5000);
  
        return () => clearTimeout(timer);
      }
  
      if (isInSuccessPage && !isValidId(id)) {
        if (!toast.isActive(INVALID_ID_TOAST)) { // Check if the toast is already active
          toast.error("ID transaksi invalid. Mengembalikan...",{
            position: "bottom-center", // Toast will appear at the bottom-center
            autoClose: 3000, 
            toastId: INVALID_ID_TOAST
          });
        }
        const timer = setTimeout(() => {
          navigate({ to : '/'}); // Redirect to the homepage
        }, 5000);
  
        return () => clearTimeout(timer);
      }

      const now = new Date(); // Get the current date and time
      const expiredAt = transaction?.data?.payment?.expiredAt 
        ? new Date(transaction.data.payment.expiredAt) 
        : null;

      if (expiredAt && expiredAt <= now) {
        // The expiredAt date has passed
        toast.error("Transaksi sudah kadaluarsa. Mengembalikan...", {
          position: "bottom-center",
          autoClose: 3000,
        });

        const timer = setTimeout(() => {
          navigate({ to: '/users/private/order-history' });
        }, 3000);

        return () => clearTimeout(timer);
      }
  
    }, [id, token, navigate, transaction]);

  // Mutation for sending request link through email
  const { mutate: sendTicket, isPending } = useMutation({
    mutationFn: async (email) =>
      await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions/${id}/ticket`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),

    onSuccess: () => {
      toast.success("Tiket berhasil diterbitkan! Mohon cek email anda", {
        autoClose: 4000,
        position: "bottom-center",
      });
    },

    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error("Email atau ID transaksi invalid.", {
          autoClose: 4000,
          position: "bottom-center",
        });
      } else {
        toast.error("An unexpected error occured", {
          position: "bottom-center", // Toast will appear at the bottom-center
          autoClose: 4000, 
        });
      }
    },
  });

  const handleSendTicket = async () => {
    const response = sendTicket();
  };

  return (
    <div>
      <Row className="justify-content-center mt-2 mb-4 py-3 shadow-sm">
        <Col lg={9} md={10} sm={10} xs={10}>
          <BreadcrumbNav
            items={[
              { label: 'Isi Data Diri', path: '/users/private/checkout' },
              { label: 'Bayar', path: '/users/private/payment/$id' },
              { label: 'Selesai', path: './' },
            ]}
          />
          <AlertBox
            type="success"
            message="Terima kasih atas pembayaran transaksi anda"
          />
        </Col>
      </Row>
      <Container className="py-4">
        <div className="d-flex flex-column align-items-center">
          <Col xs={12} sm={10} md={5} lg={5} className="text-center">
            <img
              src={paymentSuccess}
              alt="payment success"
              className="img-fluid mb-2 mx-auto w-50"
            />
            <p style={{ color: '#a06ece', fontWeight: 500 }}>
              Selamat!<br />
              <span className="text-dark mt-2">
                Transaksi pembayaran tiket anda berhasil
              </span>
            </p>
          </Col>
          <Col xs={10} sm={8} md={5} lg={4}>
            <Button
              type="button"
              onClick={handleSendTicket}
              disabled={isPending}
              style={{
                backgroundColor: '#7126B5',
                borderRadius: '14px',
                border: 'none',
                color: 'white',
                boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                width: '100%',
                padding: '10px 0',
                margin: '10px 0',
              }}
            >
             {isPending ? "Mengirim..." : "Terbitkan tiket"}
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
