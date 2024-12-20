import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Alert, Form } from "react-bootstrap";
import { useState } from "react";
import { getDetailTransaction } from "../../services/transaction/index";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import Thumbnail from "../../assets/img/Thumbnail.png";

export const OrderDetailCard = ({ id, handleCancelTransaction, handlePaymentRedirect, handleSendTicket }) => {
  const location = useLocation();

  // Check if the current page is the order history page
  const isOrderHistoryPage = location.pathname === "/users/private/order-history";

  useEffect(() => {
    console.log("OrderDetailCard received ID:", id);
    console.log("expiredAt", transaction?.data?.payment?.expiredAt);
  }, [id]);

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
        err.message || "An error occurred while fetching transaction data"
      );
    },
  });

  console.log("expiredAt", transaction?.data?.payment?.expiredAt);
  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (isError || !transaction) {
    return <p>Error loading order details. Please try again.</p>;
  }

  // Function to count passengers by type
  const countPassengersByType = (passengerArray) => {
    if (!Array.isArray(passengerArray)) {
      console.error("Passenger data is not an array:", passengerArray);
      return {}; // Return an empty object if the input is invalid
    }
    return passengerArray.reduce((counts, passenger) => {
      const type = passenger.type; // Extract type (e.g., ADULT, CHILD)
      // Increment count and accumulate totalPrice for each type
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {}); // Initialize result as an empty object
  };

  const passengerCounts = countPassengersByType(
    transaction?.data?.passenger || []
  );

  const flightPrice =
    transaction?.data?.departureFlight?.price +
      (transaction?.data?.returnFlight?.price || 0) || 0;
  
  const departurePrice = transaction?.data?.departureFlight?.price || 0;
  const returnPrice = transaction?.data?.returnFlight?.price || 0;

  console.log("transaction", transaction?.data?.departureFlight?.price);
  const adultTotalPrice = flightPrice * (passengerCounts.ADULT || 0);
  const childTotalPrice = flightPrice * (passengerCounts.CHILD || 0);
  const infantTotalPrice = flightPrice * 0;
  const totalTax = (adultTotalPrice + childTotalPrice + infantTotalPrice) * 0.1;

  // Calculate total price for the entire transaction
  const totalPrice =
    adultTotalPrice + childTotalPrice + infantTotalPrice + totalTax;

  // useEffect(() => {
  //   setTotalPrice(totalPrice);
  // }, [totalPrice, setTotalPrice]);

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
    if (!str) return str; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); // Capitalize the first letter and append the rest
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

    // Fallback for undefined or null text
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

  function getPaymentStatus(status) {
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
  }

  const paymentStatus = transaction?.data?.payment?.status || "untracked";

  return (
    <div>
      <Card className="shadow-sm my-2 rounded-3"
      style={{ border: "1px solid #7126B5" }}>
        <Card.Body>
          <h6>
            Booking Code :{" "}
            <TruncatableText
              text={transaction?.data?.id || "Not found"}
              maxLength={15}
            />
          </h6>
          <Row>
            <h6
              className="text-center text-muted my-2"
              style={{ fontSize: "0.9rem" }}
            >
              --- Departure Flight ---
            </h6>
            <Col lg={7}>
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
                {formatDate(
                    transaction?.data?.departureFlight?.departureDate
                  )}
              </div>
            </Col>
            <Col lg={5}>
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
            <span style={{ color: "#7126B5", fontSize: "0.95rem" }}>
                  {transaction?.data?.departureFlight?.airportFrom?.name}
                </span>
          </Row>
          <hr />
          {/* Flight Details Section */}
          <Row>
            <Col lg={3}>
              <img
                src={transaction?.data?.departureFlight?.airline?.image}
                alt="Flight"
                className="w-100 px-0"
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
                  {transaction?.data?.departureFlight?.class}
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
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={7}>
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
                  {formatDate(
                    transaction?.data?.departureFlight?.arrivalDate
                  )}
                </div>
              </div>
            </Col>
            <Col lg={5}>
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
            <span style={{ color: "#7126B5", fontSize: "0.95rem" }}>
                  {transaction?.data?.departureFlight?.airportTo?.name}
                </span>
          </Row>
          <hr />
          <Row className="mt-2 mb-2">
            <Col lg={8} className="">
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
            <Col lg={4}>
              <div
                className="hargadeparture"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Rp {departurePrice}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {transaction?.data?.returnFlight && (
      <Card className="shadow-sm rounded-3 mb-2"
      style={{ border: "1px solid #7126B5" }}>
        <Card.Body>
          <Row>
            <h6
              className="text-center text-muted my-1"
              style={{ fontSize: "0.9rem" }}
            >
              --- Return Flight ---
            </h6>
            <Col lg={7}>
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
                    transaction?.data?.departureFlight?.departureDate
                  )}
                </div>
                <span style={{ color: "#7126B5", fontSize: "0.95rem" }}>
                  {transaction?.data?.departureFlight?.airportFrom?.name}
                </span>
              </div>
            </Col>
            <Col lg={5}>
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
          </Row>
          <hr />
          {/* Flight Details Section */}
          <Row>
            <Col lg={3}>
              <img
                src={transaction?.data?.returnFlight?.airline?.image}
                alt="Flight"
                className="w-100 px-0"
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
                  {transaction?.data?.returnFlight?.class}
                </div>
                <div
                  className="flight-number mb-2"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {transaction?.data?.returnFlight?.airline?.code}
                </div>

                {/* <div className="info-box">
                                        <div className="info-title"
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                        }}
                                        >Informasi:</div>
                                        <ul className="list-unstyled">
                                            <li>Baggage 20 kg</li>
                                            <li>Cabin baggage 7 kg</li>
                                            <li>In Flight Entertainment</li>
                                        </ul>
                                    </div> */}
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={7}>
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
                    transaction?.data?.departureFlight?.arrivalDate
                  )}
                </div>
                <span style={{ color: "#7126B5", fontSize: "0.95rem" }}>
                  {transaction?.data?.departureFlight?.airportTo?.name}
                </span>
              </div>
            </Col>
            <Col lg={5}>
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
            <Col lg={6}>
              <div
                className="Kedatangan"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#4B1979",
                  textAlign: "right",
                }}
              >
                {transaction?.data?.arrivalFlight?.airportTo?.name}
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="mt-2 mb-2">
            <Col lg={8} className="">
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
            <Col lg={4}>
              <div
                className="hargadeparture"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Rp {returnPrice}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      )}

      <Card
        className="p-3 shadow-sm rounded-3 w-100"
        style={{ border: "1px solid #7126B5" }}
      >
        <Form>
          <div>
            <Row>
            <span>Penumpang :</span>
              <div>
                {transaction?.data?.passenger?.length > 0 ? (
                  transaction.data.passenger.map((passenger, index) => (
                    <Row key={passenger.id} className="d-flex flex-column">
                      <span style={{color: "#7126B5"}}>{index + 1} : {passenger.title} {passenger.firstName} {passenger.familyName} | <TruncatableText text={passenger.id} maxLength={10} /></span>
                    </Row>
                  ))
                ) : (
                  <p>No passengers available.</p>
                )}
              </div>
          </Row>  
          <hr />
          </div>

          <Row className="my-2">
            <h6>Rincian Harga</h6>
            <Col xs={7}>
              {Object.entries(passengerCounts).map(([type, count]) => (
                <div key={type}>
                  <span>
                    {count} {type}
                  </span>
                </div>
              ))}
              Tax
            </Col>
            <Col xs={5} className="text-end align-self-start">
              <div className="d-flex flex-column">
                {passengerCounts.ADULT > 0 && (
                  <span>
                    IDR {new Intl.NumberFormat("id-ID").format(adultTotalPrice)}
                  </span>
                )}
                {passengerCounts.CHILD > 0 && (
                  <span>
                    IDR {new Intl.NumberFormat("id-ID").format(childTotalPrice)}
                  </span>
                )}
                {passengerCounts.INFANT > 0 && (
                  <span>
                    IDR{" "}
                    {new Intl.NumberFormat("id-ID").format(infantTotalPrice)}
                  </span>
                )}
                <span>
                  {paymentStatus === "CANCELLED" ? (
                    <span>--</span>
                  ) : (
                    <span>
                      IDR {new Intl.NumberFormat("id-ID").format(totalTax)}
                    </span>
                  )}
                </span>
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="mt-2 justify-content-between">
            <Col>
              <h5>Total :</h5>
            </Col>
            <Col className="text-end align-self-start">
              {paymentStatus === "CANCELLED" ? (
                <span>--</span>
              ) : (
                <h5 style={{ color: "#7126B5", fontWeight: "bold" }}>
                  IDR {new Intl.NumberFormat("id-ID").format(totalPrice)}
                </h5>
              )}
            </Col>
          </Row>
          <hr />
          {paymentStatus === "SUCCESS" && (
              <Button
                type="button"
                onClick={handleSendTicket}
                // disabled={isPending}
                style={{
                  backgroundColor: "#7126B5",
                  border: "none",
                  borderRadius: "8px",
                  width: "100%",
                  padding: "10px 0",
                  fontSize: "1.15rem",
                  marginTop: "5px",
                }}
              >
                {/* {isPending ? "Mengirim..." : "Cetak Tiket"} */}
                Cetak Tiket
              </Button>
            )}

            {paymentStatus === "PENDING" && (
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
                  marginTop: "5px",
                }}
              >
                Lanjut Bayar
              </Button>
            )}

            {paymentStatus === "CANCELLED" && null}
            {!["SUCCESS", "PENDING", "CANCELLED"].includes(paymentStatus) && null}
          {!isOrderHistoryPage && (
        <Button
          onClick={handleCancelTransaction}
          className="btn-danger w-100 my-2 rounded-3"
        >
          Batalkan Transaksi
        </Button>
      )}
        </Form>
      </Card>
    </div>
  );
};
