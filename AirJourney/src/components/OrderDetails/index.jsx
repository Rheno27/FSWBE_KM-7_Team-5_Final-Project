import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { getDetailTransaction } from "../../services/transaction/index";
import { useLocation } from "@tanstack/react-router"
import { useSelector } from "react-redux";
import PassengerList from "./passengerList";

const OrderDetailCard = ({
  id,
  handleCancelTransaction,
  handlePaymentRedirect,
  handleSendTicket,
  isPending
}) => {

  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  // Check if the current page is in the order history page
  const isInOrderHistoryPage =
    location.pathname === "/users/private/order-history";

  const {
    data: transaction,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(
        err.message || "Terjadi kesalahan saat mengambil data transaksi"
      );
    },
  });

  if (token && isLoading) {
    return <p>Memuat detail pesanan...</p>;
  }

  if (token && !transaction) {
    return <p>Tidak ada detail transaksi.</p>;
  }

  if (isError || !transaction) {
    return <p>Gagal memuat detail pesanan. Silakan coba lagi.</p>;
  }

  // Function to count passengers by type
  const countPassengersByType = (passengerArray) => {
    if (!Array.isArray(passengerArray)) {
      return {}; // Return an empty object if the input is invalid
    }

    const passengerType = {
      "ADULT": "Dewasa",
      "CHILD": "Anak",
      "INFANT": "Bayi",
    };

    return passengerArray.reduce((counts, passenger) => {
      const type = passengerType[passenger.type] || passenger.type;
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {}); // Initialize result as an empty object
  };

  const passengerCounts = countPassengersByType(
    transaction?.data?.passenger || []
  );

  const departurePrice = transaction?.data?.departureFlight?.price || 0;
  const returnPrice = transaction?.data?.returnFlight?.price || 0;
  const totalFlightPrice = (transaction?.data?.departureFlight?.price + (transaction?.data?.returnFlight?.price || 0)) || 0;

  const adultDeparturePrice = departurePrice * (passengerCounts.Dewasa || 0);
  const childDeparturePrice = departurePrice * (passengerCounts.Anak || 0);
  const infantDeparturePrice = departurePrice * 0;
  const totalDepartureTax = (adultDeparturePrice + childDeparturePrice + infantDeparturePrice) * 0.1;

  const adultReturnPrice = returnPrice * (passengerCounts.Dewasa || 0);
  const childReturnPrice =returnPrice * (passengerCounts.Anak || 0);
  const infantReturnPrice = returnPrice * 0;
  const totalReturnTax = (adultReturnPrice + childReturnPrice + infantReturnPrice) * 0.1;

  const adultTotalPrice = totalFlightPrice * (passengerCounts.Dewasa || 0);
  const childTotalPrice = totalFlightPrice * (passengerCounts.Anak || 0);
  const infantTotalPrice = totalFlightPrice * 0;
  const totalTax = (adultTotalPrice + childTotalPrice + infantTotalPrice) * 0.1;

  const totalDeparturePrice = adultDeparturePrice + childDeparturePrice + infantDeparturePrice + totalDepartureTax;
  const totalReturnPrice = adultReturnPrice + childReturnPrice + infantReturnPrice + totalReturnTax;
 
  // Calculate total price for the entire transaction
  const totalPrice =
    adultTotalPrice + childTotalPrice + infantTotalPrice + totalTax;

  const paymentStatus = transaction?.data?.payment?.status || "Tidak terlacak";
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Reset time to 00:00:00
  
  const isDeparted = transaction?.data?.departureFlight?.departureDate
  ? new Date(transaction?.data?.departureFlight?.departureDate) < today : false;
  const isReturned = transaction?.data?.returnFlight?.departureDate
  ? new Date(transaction?.data?.returnFlight?.departureDate) < today : false;
  

  const getPaymentStatus = (status) => {
    switch (status.toUpperCase()) {
      case "SUCCESS":
        return "success";
      case "CANCELLED":
        return "secondary";
      case "PENDING":
        return "danger";
      default:
        return "warning";
    }
  };

  const statusBadge = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    textAlign: "center",
    borderRadius: "20px",
    border: "none",
    padding: "5px 10px",
    width: "fit-content",
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Handle null or undefined
  return str
    .split('_') // Split the string into an array by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' '); // Join the words with a space
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not found";
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const TruncatableText = ({ text, maxLength = 10 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => setIsExpanded(!isExpanded);
    const safeText = text || "";

    return (
      <span
        onClick={toggleText}
        style={{ cursor: "pointer", color: "#7126B5", fontWeight: "bold" }}
      >
        {isExpanded ? safeText : `${safeText.slice(0, maxLength)}...`}
      </span>
    );
  };

  return (
    <div style={{ position: "sticky", top: "0" }}>
      <Card
        className="shadow-sm my-2 rounded-3"
      >
        <Card.Body>
          <Row className="justify-content-between mb-2">
          <Col>
          <div className="mb-2"
          style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "black",
          }}
          >Detail Pesanan</div>
          </Col>
          <Col xs="auto">
          {isInOrderHistoryPage && (
            <Alert
            className={`bg-${getPaymentStatus(transaction?.data?.payment?.status || "Tidak terlacak")} text-white mb-0 align-items-end`}
            style={statusBadge}
          >
            {capitalizeFirstLetter(
              transaction?.data?.payment?.status || "Tidak terlacak"
            )}
          </Alert>
          )}
          </Col>
          </Row>
          <h6 className="mb-1">
            Kode Booking :{" "}
            <TruncatableText
              text={transaction?.data?.id || "Tidak ditemukan"}
              maxLength={20}
            />
          </h6>
          <Row>
            <h6
              className="text-center text-muted my-2"
              style={{ fontSize: "0.9rem" }}
            >
              --- Keberangkatan ---
            </h6>
            <Col lg={7} md={7} xs={7}>
              <div
                className="time"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {transaction?.data?.departureFlight?.departureTime}
              </div>
              <div className="departure my-1">
                {formatDate(transaction?.data?.departureFlight?.departureDate)}
              </div>
            </Col>
            <Col lg={5} md={5} xs={5}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#4B1979",
                  textAlign: "right",
                }}
              >
                Keberangkatan
              </div>
            </Col>
            <span style={{ fontSize: "0.95rem" }}>
              {transaction?.data?.departureFlight?.airportFrom?.name}
            </span>
          </Row>
          <hr />
          {/* Flight Details Section */}
          <Row>
            <Col lg={3} className="d-flex align-items-center">
              <img
                src={transaction?.data?.departureFlight?.airline?.image}
                alt="Flight"
                className="w-100 px-0 fluid"
              />
            </Col>
            <Col lg={9}>
              <div className="flight-info">
                <div
                  className="airline"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.departureFlight?.airline?.name} -{" "}
                  {capitalizeFirstLetter(transaction?.data?.departureFlight?.class)}
                </div>
                <div
                  className="flight-number"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.departureFlight?.airline?.code}
                </div>
                <div className="info-box mt-2">
                  <span className="info-title"
                  style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                  }}
                  >Informasi:</span>
                  <ul className="list-unstyled">
                      <li>Bagasi 20 kg</li>
                      <li>Bagasi kabin 7 kg</li>
                      <li>Hiburan di pesawat</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="my-2">
            <Col lg={7} md={7} xs={7}>
              <div
                className="time"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {transaction?.data?.departureFlight?.arrivalTime}
              </div>
              <div className="arrival my-1">
                <div className="date">
                  {formatDate(transaction?.data?.departureFlight?.arrivalDate)}
                </div>
              </div>
            </Col>
            <Col lg={5} md={5} xs={5}>  
              <div
                className="Kedatangan"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#4B1979",
                  textAlign: "right",
                }}
              >
                Kedatangan
              </div>
            </Col>
            <span style={{ fontSize: "0.95rem" }}>
              {transaction?.data?.departureFlight?.airportTo?.name}
            </span>
          </Row>
          <hr />
          <Row className="mt-2 mb-2">
            <Col lg={7} xs={6} className="">
              <div
                className="hargadeparture"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Harga
              </div>
            </Col>
            <Col lg={5} xs={6}>
              <div
                className="hargadeparture"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Rp. {totalDeparturePrice}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {transaction?.data?.returnFlight && (
        <Card
          className="shadow-sm rounded-3 mb-2"
        >
          <Card.Body>
            <Row>
              <h6
                className="text-center text-muted my-2"
                style={{ fontSize: "0.9rem" }}
              >
                --- Kepulangan ---
              </h6>
              <Col lg={7} md={7} xs={7}>
                <div
                  className="time"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.returnFlight?.departureTime}
                </div>
                <div className="departure mt-2 mb-2">
                  <div className="date">
                    {formatDate(
                      transaction?.data?.returnFlight?.departureDate
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={5} md={5} xs={5}>
                <div
                  className="keberangkatan"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#4B1979",
                    textAlign: "right",
                  }}
                >
                  Keberangkatan
                </div>
              </Col>
              <span style={{ fontSize: "0.95rem" }}>
                    {transaction?.data?.returnFlight?.airportFrom?.name}
                  </span>
            </Row>
            <hr />
            {/* Flight Details Section */}
            <Row>
            <Col lg={3} className="d-flex align-items-center">
              <img
                src={transaction?.data?.returnFlight?.airline?.image}
                alt="Flight"
                className="w-100 px-0 fluid"
              />
            </Col>
            <Col lg={9}>
              <div className="flight-info">
                <div
                  className="airline"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.returnFlight?.airline?.name} -{" "}
                  {capitalizeFirstLetter(transaction?.data?.returnFlight?.class)}
                </div>
                <div
                  className="flight-number"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.returnFlight?.airline?.code}
                </div>
                <div className="info-box mt-2">
                  <div className="info-title"
                  style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                  }}
                  >Informasi:</div>
                  <ul className="list-unstyled">
                      <li>Bagasi 20 kg</li>
                      <li>Bagasi kabin 7 kg</li>
                      <li>Hiburan di pesawat</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
            <hr />
            <Row>
              <Col lg={7} md={7} xs={7}>
                <div
                  className="time"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.returnFlight?.arrivalTime}
                </div>
                <div className="arrival mt-2 mb-2">
                  <div className="date">
                    {formatDate(
                      transaction?.data?.returnFlight?.arrivalDate
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={5} md={5} xs={5}>
                <div
                  className="Kedatangan"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#4B1979",
                    textAlign: "right",
                  }}
                >
                  Kedatangan
                </div>
              </Col>
              <span style={{ fontSize: "0.95rem" }}>
                {transaction?.data?.returnFlight?.airportTo?.name}
              </span>
            </Row>
            <hr />
            <Row className="mt-2 mb-2">
              <Col lg={6} xs={6}>
                <div
                  className="hargadeparture"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Harga
                </div>
              </Col>
              <Col lg={6} xs={6}>
                <div
                  className="hargadeparture"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Rp. {totalReturnPrice}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      <Card
        className="p-3 shadow-sm rounded-3 w-100"
      >
        <Form>
          {isInOrderHistoryPage && (
          <div>
            <PassengerList transaction={transaction}/>
            <hr />
          </div>
          )}

          <Row className="my-2">
            <span
                  className="hargadeparture mb-2"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Rincian Harga
                </span>
            <Col xs={7}>
              {Object.entries(passengerCounts).map(([type, count]) => (
                <div key={type}>
                  <span>
                    {count} {capitalizeFirstLetter(type)}
                  </span>
                </div>
              ))}
              Pajak
            </Col>
            <Col xs={5} className="text-end align-self-start">
              <div className="d-flex flex-column">
                {passengerCounts.Dewasa > 0 && (
                  <span>
                    Rp. {new Intl.NumberFormat("id-ID").format(adultTotalPrice)}
                  </span>
                )}
                {passengerCounts.Anak > 0 && (
                  <span>
                    Rp. {new Intl.NumberFormat("id-ID").format(childTotalPrice)}
                  </span>
                )}
                {passengerCounts.Bayi > 0 && (
                  <span>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID").format(infantTotalPrice)}
                  </span>
                )}
                <span>
                  {paymentStatus === "CANCELLED" ? (
                    <span>--</span>
                  ) : (
                    <span>
                      Rp. {new Intl.NumberFormat("id-ID").format(totalTax)}
                    </span>
                  )}
                </span>
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="mt-2 justify-content-between">
            <Col>
              <span
                  className="hargadeparture"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Total Harga:
                </span>
            </Col>
            <Col className="text-end align-self-start">
              {paymentStatus === "CANCELLED" ? (
                <span>--</span>
              ) : (
                <h5 style={{ color: "#7126B5", fontWeight: "bold" }}>
                  Rp. {new Intl.NumberFormat("id-ID").format(totalPrice)}
                </h5>
              )}
            </Col>
          </Row>
          <hr />
          {paymentStatus === "SUCCESS" && !isDeparted && !isReturned && (
            <Button
              type="button"
              onClick={handleSendTicket}
              disabled={isPending}
              style={{
                backgroundColor: "#7126B5",
                border: "none",
                borderRadius: "8px",
                width: "100%",
                padding: "10px 0",
                fontSize: "1.15rem",
                marginTop: "5px",
                opacity: isPending ? 0.5 : 1,
              }}
            >
              {isPending ? "Mengirim..." : "Cetak Tiket"}
            </Button>
          )}

          {isInOrderHistoryPage && paymentStatus === "PENDING" && (
            <Button
              onClick={handlePaymentRedirect}
              type="button"
              style={{
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "8px",
                width: "100%",
                padding: "10px 0",
                fontSize: "1.1rem",
                marginTop: "10px",
              }}
            >
              Lanjut Bayar
            </Button>
          )}

          {paymentStatus === "CANCELLED" && null}
          {!["SUCCESS", "PENDING", "CANCELLED"].includes(paymentStatus) && null}
          {!isInOrderHistoryPage && (
            <Button
              onClick={handleCancelTransaction}
              style={{
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "8px",
                width: "100%",
                padding: "10px 0",
                fontSize: "1.1rem",
                marginTop: "10px",
              }}
            >
              Batalkan Pembayaran
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default OrderDetailCard;
