import { React, useEffect, useState } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav.jsx'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from '@tanstack/react-query'
import OrderDetailCard from "../../../../components/PaymentDetails";
import { getDetailTransaction, cancelTransaction } from '../../../../services/transaction/index.js'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import Notification from "../../../../components/Notification/dropdown.jsx"; 
import axios from 'axios'

export const Route = createLazyFileRoute('/users/private/payment/$id')({
  component: Payment,
})

function Payment() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || token.trim() === "") {
      toast.error("Unauthorized, redirecting to homepage", {
        position: "bottom-center", // Toast will appear at the bottom-center
        autoClose: 4000, 
      });
  
      const timer = setTimeout(() => {
        navigate({ to : '/'}); // Redirect to the homepage
      }, 4000);

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


  // Fetch existing notifications
  const { data: notificationsList } = useQuery({
    queryKey: ["notifications"], 
    queryFn: async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/notifications`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data || [];
  }});

  const { mutate: cancelTransactionMutation } = useMutation({
    mutationFn: () => cancelTransaction(id),
    onSuccess: () => {
      toast.success("Transaction cancelled successfully", {
        position: "bottom-center",
        autoClose: 2000,
      });
      navigate({ to: `/` });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to cancel transaction");
    },
  });

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); // Capitalize the first letter and append the rest
  };
  
  const [notification, setNotification] = useState(null);
  const expiredAt = new Date(
    transaction?.data?.payment?.expiredAt
  ).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  const isPaymentSuccess = transaction?.data?.payment?.status === 'SUCCESS';
  // post notif bukannya harus admin yk? gk bisa mah pake token user wkwk

  // Create notification on page load
  // useEffect(() => { 
  //   const createNotificationIfNotExist = async () => {
  //     try {
  //       if (id && notificationsList) {
  //         const isNotificationExists = notificationsList.some(
  //           (notif) =>
  //             notif.message.includes(id)
  //         );

  //         if (!isNotificationExists) {
  //           const shortId = id.slice(0, 5);
  //           const notificationPayload = {
  //             title: `Status Pembayaran (${capitalizeFirstLetter(transaction?.data?.payment?.status)})`,
  //             message: `Selesaikan pembayaran Anda sebelum ${expiredAt} untuk transaksi ${shortId}...`,
  //             userId: transaction?.data?.userId, // or another identifier for the user
  //           };

  //           await axios.post(
  //             `${import.meta.env.VITE_API_URL}/notifications/`,
  //             notificationPayload,
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           );

  //           setNotification(notificationPayload); // Set notification for frontend display
  //           // Optional: Automatically remove notification after some time
  //           const timer = setTimeout(() => setNotification(null), 5000);
  //           return () => clearTimeout(timer);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to create notification:", error);
  //     }
  //   };

  //   createNotificationIfNotExist();
  // }, [])

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
        window.snap?.embed(snapToken, {
          embedId: 'snap-container',
          onSuccess: function (result) {
            // alert('Payment success! Redirecting to success page...');
          },
          onPending: function (result) {
            alert('Waiting for payment!');
          },
          onError: function (result) {
            alert('Payment failed!');
          },
          onClose: function () {
            if (!isPaymentSuccess) {
              alert('Are you sure you want to close the payment form?');
            }
          },
        });
      }
    }
  }, [isSuccess, transaction]);
  
  useEffect(() => {
    if (isSuccess && isPaymentSuccess) {
      toast.success('Payment success! Redirecting...');
    const timer = setTimeout(() => {
      navigate({ to : `/users/private/payment/success?id=${id}`});
    }, 4000);

    return () => clearTimeout(timer);;
    }
  }, [transaction, navigate]);

  const handleCancelTransaction = async () => {
    const response = await cancelTransactionMutation();
    if (response.status) {
      toast.success("Transaction cancelled successfully");
      navigate({ to: `/` });
    } else {
        toast.error("Failed to cancel transaction");
    }
}

  return (
    <div className="payment-page">
      <ToastContainer
        position="bottom-center" // Mengatur posisi toast
        autoClose={4000}
        closeOnClic
        draggable
      />
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
            message={`Selesaikan pembayaran anda sebelum ${expiredAt}`}
          />
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-center my-4 gap-1">
          <Col lg={6} md={6} className="my-2">
              <Card id="snap-container" className="p-3 shadow-sm rounded-3 w-100" style={{border: '1px solid #7126B5'}}></Card>
              <p className='my-5 text-secondary'>Halaman pembayaran tidak muncul? Silahkan refresh halaman</p>
          </Col>

          {id ? (
            <OrderDetailCard id={id} handleCancelTransaction={handleCancelTransaction} />
          ) : (
            <p className="text-danger">Transaction ID is missing</p>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Payment
