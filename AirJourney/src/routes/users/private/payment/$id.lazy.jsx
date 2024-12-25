import { React, useEffect, useState } from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Row, Col, Card } from 'react-bootstrap'
import { BreadcrumbNav } from '../../../../components/ui/breadcrumbNav'
import { AlertBox } from '../../../../components/ui/alertBox.jsx'
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from '@tanstack/react-query'
import OrderDetailCard from "../../../../components/OrderDetails";
import { getDetailTransaction, cancelTransaction } from '../../../../services/transaction/index.js'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

export const Route = createLazyFileRoute('/users/private/payment/$id')({
  component: Payment,
})

function Payment() {
  const { id } = Route.useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false); // Track if the script is loaded
  const [snapInitialized, setSnapInitialized] = useState(false); 

  const isValidId = (id) => {
    if (!id) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  useEffect(() => {
    if (!token || token.trim() === "") {
      toast.error("Tidak diizinkan, mengarahkan ke halaman utama", {
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

  }, [id, token, navigate]);
  
  const { data: transaction, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(
        err.message || "An error occurred while fetching transaction data"
      );
    },
  });


  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); // Capitalize the first letter and append the rest
  };
  
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true); // Script is loaded successfully
      console.log('Snap.js script loaded');
    };

    script.onerror = (error) => {
      console.error('Snap.js script failed to load', error);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && isSuccess && transaction?.data?.payment?.snapToken && !snapInitialized) {
      const snapToken = transaction.data.payment.snapToken;
      
      if (!document.getElementById('snap-container').hasChildNodes()) {

        try {
          window.snap?.embed(snapToken, {
            embedId: 'snap-container',
            onSuccess: function (result) {
              console.log('Payment Success:', result);
              // Add your success logic here
            },
            onPending: function (result) {
              console.log('Payment Pending:', result);
              alert('Menunggu proses pembayaran!');
            },
            onError: function (result) {
              console.error('Payment Error:', result);
              alert('Pembayaran tidak berhasil!');
            },
            onClose: function () {
              if (!isPaymentSuccess) {
                alert('Apakah yakin ingin menutup form pembayaran?');
              }
            },
          });

          setSnapInitialized(true); // Mark Snap as initialized
        } catch (error) {
          console.error('Error during snap embed:', error);
        }
      }
      // Cleanup logic for reusing Snap UI when closing or reopening the modal
    return () => {
      // Reset the snap initialization flag
      setSnapInitialized(false);
    };
    }
  }, [scriptLoaded, isSuccess, transaction, isPaymentSuccess]);

  useEffect(() => {
    // Function to validate the transaction ID
    const validateTransaction = async () => {
      // Prevent unnecessary execution while loading
      if (isLoading) return;
  
      try {
        // Handle backend errors (e.g., ID not found or invalid)
        if (transaction?.isError || !transaction?.data) {
          toast.error("Data transaksi tidak ditemukan atau tidak valid. Mengembalikan...", {
            position: "bottom-center",
            autoClose: 3000,
          });
  
          const timer = setTimeout(() => {
            navigate({ to: '/users/private/order-history' });
          }, 3000);
  
          return () => clearTimeout(timer);
        }
  
        // Check if the ID in the URL matches the data fetched from the backend
        if (id !== transaction?.data?.id) {
          toast.error("ID transaksi tidak cocok. Mengembalikan...", {
            position: "bottom-center",
            autoClose: 3000,
          });
  
          const timer = setTimeout(() => {
            navigate({ to: '/users/private/order-history' });
          }, 3000);
  
          return () => clearTimeout(timer);
        }
  
        // Check if the payment has expired
        const now = new Date();
        const expiredAt = new Date(transaction?.data?.payment?.expiredAt);
        if (now > expiredAt) {
          toast.error("Transaksi telah kedaluwarsa. Mengembalikan...", {
            position: "bottom-center",
            autoClose: 3000,
          });
  
          const timer = setTimeout(() => {
            navigate({ to: '/users/private/order-history' });
          }, 3000);
  
          return () => clearTimeout(timer);
        }
  
        // If payment succeeded, redirect to success page
        if (isSuccess && isPaymentSuccess) {
          toast.success("Pembayaran berhasil!", {
            position: "bottom-center",
            autoClose: 5000,
          });
  
          const timer = setTimeout(() => {
            navigate({ to: `/users/private/payment/success?id=${id}` });
          }, 5000);
  
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error validating transaction:", error);
        toast.error("Terjadi kesalahan saat memvalidasi transaksi. Mengembalikan...", {
          position: "bottom-center",
          autoClose: 3000,
        });
  
        const timer = setTimeout(() => {
          navigate({ to: '/users/private/order-history' });
        }, 3000);
  
        return () => clearTimeout(timer);
      }
    };
  
    // Call the validation function
    validateTransaction();
  }, [id, transaction, isLoading, isSuccess, isPaymentSuccess, navigate]);  

  const { mutate: cancelTransactionMutation } = useMutation({
    mutationFn: () => cancelTransaction(id),
    onSuccess: () => {
      toast.success("Pembatalan transaksi berhasil", {
        position: "bottom-center",
        autoClose: 5000,
      });
      const timer = setTimeout(() => {
        navigate({ to : '/users/private/order-history'}); // Redirect to the homepage
      }, 5000);

      return () => clearTimeout(timer);
    },
    onError: (err) => {
      toast.warn("Harap pilih metode pembayaran sebelum membatalkan.");
    },
  });

  const handleCancelTransaction = async () => {
    const confirmCancel = window.confirm("Apakah yakin untuk membatalkan transaksi?");
  
    if (confirmCancel) {
      cancelTransactionMutation(); 
      // try {
      //   const response = await cancelTransactionMutation();
      //   if (response.status) {
      //     toast.success("Pembatalan transaksi berhasil");
      //     navigate({ to: `/users/private/order-history` });
      //   } else {
      //     toast.error("Gagal membatalkan transaksi");
      //   }
      // } catch (error) {
      //   toast.error("An error occurred while cancelling the transaction.");
      // }
    } else {
      // User declined the action
      toast.info("Pembatalan transaksi dibatalkan.");
    }
  };
  

  return (
    <div className="payment-page">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        draggable
      />
      <Row className="justify-content-center mt-2 mb-4 py-3 shadow-sm">
        <Col lg={9} md={10} sm={11} xs={11}>
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
      <div className='m-3'>
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
              <p style={{ color: 'red' }}>ID Invalid. Mohon cek URL anda. Mengarahkan ulang ...</p>
            ) : (
              <Row className="justify-content-center my-4 gap-1">
                <Col lg={6} md={6} className="my-2 justify-content-center">
                    <Card id="snap-container" className="p-3 shadow-sm rounded-3 w-100"></Card>
                    {isLoading && <p className='my-2'>Memuat form pembayaran...</p>}
                    <p>Halaman pembayaran tidak muncul? silahkan refresh halaman</p>
                </Col>
                <Col lg={4} md={4}>
                {id ? (
                  <OrderDetailCard id={id} handleCancelTransaction={handleCancelTransaction}/>
                ) : (
                  <p className="text-danger">ID transaksi tidak ditemukan</p>
                )}
                </Col>
              </Row>
            )}
      </div>
    </div>
  )
}

export default Payment
