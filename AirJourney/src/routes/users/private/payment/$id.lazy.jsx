import { React, useEffect, useState } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/BreadcrumbNav'
import { AlertBox } from '../../../../components/ui/AlertBox'
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from '@tanstack/react-query'
import OrderDetailCard from "../../../../components/OrderDetails";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isWidgetInitialized, setIsWidgetInitialized] = useState(false); 

  const isValidId = (id) => {
    if (!id) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };
  
  const { data: transaction, isSuccess, isError } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(
        err.message || "An error occurred while fetching transaction data"
      );
    },
  });

  console.log("transaction", transaction)

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
      console.log("error cancel", err);
      toast.error("Choose payment method first");
    },
  });

  useEffect(() => {
    if (!token || token.trim() === "") {
      toast.error("Unauthorized, redirecting to homepage", {
        position: "bottom-center", // Toast will appear at the bottom-center
        autoClose: 3000, 
      });
  
      const timer = setTimeout(() => {
        navigate({ to : '/'}); // Redirect to the homepage
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (!isValidId(id)) {
      const timer = setTimeout(() => {
        navigate({ to : '/'}); // Redirect to the homepage
      }, 5000);

      return () => clearTimeout(timer);
    }

    if (id !== transaction?.data?.id) {
      console.log("transaction", transaction);
      toast.error("Transaction ID not found. Redirecting ...", {
        position: "bottom-center", // Toast will appear at the bottom-center
        autoClose: 4000, 
      });
  
      const timer = setTimeout(() => {
        navigate({ to : '/users/private/order-history'}); // Redirect to the homepage
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [id, token, navigate]);

  useEffect(() => {
    if (transaction?.data?.payment?.status === 'CANCELLED') {
      toast.error("Your transaction id has expired. Redirecting ...", {
        position: "bottom-center", // Toast will appear at the bottom-center
        autoClose: 4000, 
      });
  
      const timer = setTimeout(() => {
        navigate({ to : '/users/private/order-history'}); // Redirect to the homepage
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [id, navigate]);

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

      setIsLoading(true);
      
      if (!isWidgetInitialized && !document.getElementById('snap-container').hasChildNodes()) {
        setIsWidgetInitialized(true);

        window.snap?.embed(snapToken, {
          embedId: 'snap-container',
          onSuccess: function (result) {
            // alert('Payment success! Redirecting to success page...');
            setIsLoading(false);
          },
          onPending: function (result) {
            setIsLoading(false);
            alert('Waiting for payment!');
          },
          onError: function (result) {
            setIsLoading(false);
            alert('Payment failed!');
          },
          onClose: function () {
            setIsLoading(false);
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
      console.log("id", id);
      navigate({ to : `/users/private/payment/success?id=${id}`});
    }, 4000);

    return () => clearTimeout(timer);;
    }
  }, [transaction, navigate]);

  const handleCancelTransaction = async () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this transaction?");
  
  if (!confirmCancel) {
    // User declined the action
    toast.info("Transaction cancellation aborted.");
    return;
  }

    try {
    const response = await cancelTransactionMutation();
    console.log("response", response);

    if (response.status) {
      toast.success("Transaction cancelled successfully");
      navigate({ to: `/` });
    } else {
      toast.error("Failed to cancel transaction");
    }
  } catch (error) {
    console.error("Error cancelling transaction:", error);
    toast.error("An error occurred while cancelling the transaction.");
  }
}

  return (
    <div className="payment-page">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
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
            message='Selesaikan pembayaran anda 15 menit setelah memilih metode pembayaran'
          />
        </Col>
      </Row>
      <Container>
         {!token || token.trim() === "" ? (
                  <div className="d-flex flex-column align-items-center mt-5 py-5">
                    <Col
                      xs={12}
                      sm={10}
                      md={7}
                      lg={6}
                      className="text-center my-2 mt-5"
                    >
                      <p style={{ color: "#a06ece", fontWeight: 500 }}>
                        Oops! Kamu belum login! <br />
                        <span className="text-dark my-2">
                          Login untuk bisa mengakses halaman ini
                        </span>
                      </p>
                    </Col>
                  </div>
                ) : !isValidId(id) ? (
                  <p style={{ color: 'red' }}>Invalid ID. Please check your URL. Redirecting ...</p>
                ) : (
                  <Row className="justify-content-center my-4 gap-1">
          <Col lg={6} md={6} className="my-2 justify-content-center">
          {isLoading && <p>Memuat halaman pembayaran...</p>}
              <Card id="snap-container" className="p-3 shadow-sm rounded-3 w-100"></Card>
              {/* <p className='my-5 text-secondary'>Halaman pembayaran tidak muncul? Silahkan refresh halaman</p> */}
          </Col>
          <Col lg={4} md={4}>
          {id ? (
            <OrderDetailCard id={id} handleCancelTransaction={handleCancelTransaction}/>
          ) : (
            <p className="text-danger">Transaction ID is missing</p>
          )}
          </Col>
        </Row>
                )}
        
      </Container>
    </div>
  )
}

export default Payment
