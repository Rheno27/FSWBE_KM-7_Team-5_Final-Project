import { React, useEffect, useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Row, Col, Card, Container } from "react-bootstrap";
import { BreadcrumbNav } from "../../../../components/ui/breadcrumbNav";
import { AlertBox } from "../../../../components/ui/alertBox.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import OrderDetailCard from "../../../../components/OrderDetails";
import {
  getDetailTransaction,
  cancelTransaction,
} from "../../../../services/transaction/index.js";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { navigateWithTimeout } from "../../../../utils/navigationUtils.js";

export const Route = createLazyFileRoute("/users/private/payment/$id")({
  component: Payment,
});

function Payment() {
  const { id } = Route.useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false); // Track if the payment script is loaded
  const [snapInitialized, setSnapInitialized] = useState(false);

  const isValidId = (id) => {
    if (!id) return false;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  useEffect(() => {
    if (!token || token.trim() === "") {
      toast.error("Tidak diizinkan, mengarahkan ke halaman utama", {
        autoClose: 3000,
      });
      navigateWithTimeout(navigate, "/", 3000);
    }
    if (!isValidId(id)) {
      toast.error("ID transaksi tidak valid. Mengarahkan ulang...");
      navigateWithTimeout(navigate, "/", 4000);
    }
  }, [id, token, navigate]);

  const {
    data: transaction,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
    retry: 3, // Retry hingga 3 kali jika gagal
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Penundaan exponential backoff
    onError: (err) =>
      toast.error(
        err.message || "Terjadi kesalahan saat memuat data transaksi"
      ),
  });

  const paymentStatus = transaction?.data?.payment?.status;
  const isExpired =
    new Date(transaction?.data?.payment?.expiredAt) < new Date();
  const transactionNotExist = transaction?.isError || !transaction?.data;
  const PAYMENT_SUCCESS_TOAST = "payment-success";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;

    script.onload = () => setScriptLoaded(true);
    script.onerror = (error) =>
      alert(
        "Oops! Terjadi kesalahan saat memuat form pembayaran. Silahkan coba lagi."
      );

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (
      scriptLoaded &&
      transaction?.data?.payment?.snapToken &&
      !snapInitialized &&
      !isExpired
    ) {
      try {
        const snapToken = transaction.data.payment.snapToken;

        if (
          window.snap &&
          typeof window.snap.embed === "function" &&
          !document.getElementById("snap-container").hasChildNodes()
        ) {
          window.snap?.embed(snapToken, {
            embedId: 'snap-container',
            onSuccess: function (result) {
              // Add your success logic here
            },
            onPending: () => {
              toast.info("Menunggu proses pembayaran!");
            },
            onError: () => alert("Terjadi kesalahan saat pembayaran"),
            onClose: () => {
              if (paymentStatus !== "SUCCESS") {
                alert("Apakah yakin ingin menutup form pembayaran?");
              }
            },
          });

          setSnapInitialized(true);
        }
      } catch (error) {
        alert(
          "Terjadi kesalahan saat memuat form pembayaran. Silahkan coba lagi."
        );
      }
      return () => {
        if (paymentStatus !== "SUCCESS") {
          setSnapInitialized(false);
        }
      };
    }
  }, [
    scriptLoaded,
    transaction,
    snapInitialized,
    isExpired,
    navigate,
    id,
    PAYMENT_SUCCESS_TOAST,
  ]);

  const validateTransaction = async () => {
    if (isLoading) return;

    try {
      if (transactionNotExist) {
        toast.error("Data transaksi tidak ditemukan. Mengembalikan...");
        navigateWithTimeout(navigate, "/users/private/order-history", 4000);
        return;
      }

      if (id !== transaction?.data?.id) {
        toast.error("ID transaksi tidak cocok. Mengembalikan...", {
          autoClose: 3000,
        });
        navigateWithTimeout(navigate, "/users/private/order-history", 3000);
        return;
      }

      if (paymentStatus === "SUCCESS") {
        toast.success("Pembayaran berhasil!");
        navigateWithTimeout(
          navigate,
          `/users/private/payment/success?id=${id}`,
          4000
        );
      }
      if (isExpired) {
        toast.error("Transaksi telah kadaluwarsa. Mengembalikan...", {
          autoClose: 3000,
        });
        navigateWithTimeout(navigate, "/users/private/order-history", 3000);
        return;
      }
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat memvalidasi transaksi. Mengembalikan...",
        {
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    validateTransaction();
  }, [id, transaction, isLoading, isSuccess, paymentStatus, navigate]);

  const { mutate: cancelTransactionMutation } = useMutation({
    mutationFn: () => cancelTransaction(id),
    onSuccess: () => {
      toast.success("Pembatalan transaksi berhasil");
      navigateWithTimeout(navigate, "/users/private/order-history", 4000);
    },
    onError: (err) => {
      toast.warn("Harap pilih metode pembayaran sebelum membatalkan.");
    },
  });

  const handleCancelTransaction = async () => {
    const confirmCancel = window.confirm(
      "Apakah yakin untuk membatalkan transaksi?"
    );
    if (confirmCancel) {
      cancelTransactionMutation();
    } else {
      toast.info("Pembatalan transaksi dibatalkan.");
    }
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
  });

  return (
    <div className="payment-page">
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        closeOnClick
        draggable
      />
      <Row className="justify-content-center mt-2 mb-4 py-3 shadow-sm">
        <Col lg={9} md={10} sm={11} xs={11}>
          <BreadcrumbNav
            items={[
              { label: "Isi Data Diri", path: "/users/private/checkout" },
              { label: "Bayar", path: "./" },
              { label: "Selesai" },
            ]}
          />
          <AlertBox
            type="warning"
            message={`Selesaikan pembayaran anda sebelum ${expiredAt}`}
          />
        </Col>
      </Row>
      <div className="m-3">
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
          <p style={{ color: "red", textAlign: "center" }}>
            ID transaksi tidak valid, mohon cek URL anda.
          </p>
        ) : (
          <Row className="justify-content-center my-4 gap-1">
            <Col lg={6} md={6} className="my-2 justify-content-center">
              <Card
                id="snap-container"
                className="p-3 shadow-sm rounded-3 w-100 mb-2"
              ></Card>
              {isLoading ? (
                <p className="my-2">Memuat form pembayaran...</p>
              ) : transactionNotExist ? (
                <p className="my-2">Detail pembayaran tidak tersedia</p>
              ) : isExpired ? (
                <p className="text-danger my-2">
                  Waktu pembayaran telah habis atau transaksi kadaluwarsa
                </p>
              ) : (
                <p>Halaman pembayaran tidak muncul? Silahkan refresh halaman</p>
              )}
            </Col>
            <Col lg={4} md={4}>
              {id ? (
                <OrderDetailCard
                  id={id}
                  handleCancelTransaction={handleCancelTransaction}
                />
              ) : (
                !transactionNotExist && (
                  <p className="text-danger mx-auto">
                    ID transaksi tidak ditemukan
                  </p>
                )
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

export default Payment;
