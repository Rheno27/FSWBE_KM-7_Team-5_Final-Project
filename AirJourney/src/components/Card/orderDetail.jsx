import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Alert, Form } from "react-bootstrap";
// import { Link, useParams } from '@tanstack/react-router'
import { useState } from "react";
import dummy from "../../data/dummy.json";
import {
  getTransactionById,
  getPaymentById,
} from "../../services/order-history/index";

export const OrderDetailCard = ({ transactionId }) => {
  const [payments, setPayments] = useState(dummy.payment);

  const [transactions, setTransactions] = useState(null);

  const { data: transaction } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: !!transactionId,
    onSuccess: (transaction) => {
      setTransactions(transaction); // Update state directly when the query succeeds
    },
    onError: (err) => {
      toast.error("An error occurred while fetching the transaction data");
    },
  });
  console.log("transaction?.data", transaction?.data);

  // Function to count passengers by type
  const countPassengersByType = (passengerArray) => {
    if (!Array.isArray(passengerArray)) {
      console.error("Passenger data is not an array:", passengerArray);
      return {}; // Return an empty object if the input is invalid
    }
    return passengerArray.reduce((counts, passenger) => {
      const type = passenger.type; // Extract type (e.g., ADULT, CHILD)
      // const price = passenger.totalPrice || 0;

      // Initialize the object for the type if it doesn't exist
      // if (!result[type]) {
      //   result[type] = { count: 0, totalPrice: 0 };
      // }
      // Increment count and accumulate totalPrice for each type
      counts[type] = (counts[type] || 0) + 1;
      // result[type].totalPrice += price;
      return counts;
      // return result;
    }, {}); // Initialize result as an empty object
  };

  const flightPrice = transaction?.data?.departureFlight?.price || 0; // Default to 0 if undefined
  const passengerCounts = countPassengersByType(
    transaction?.data?.passenger || []
  );

  console.log(passengerCounts);
  const adultTotalPrice = flightPrice * (passengerCounts.ADULT || 0);
  const childTotalPrice = flightPrice * (passengerCounts.CHILD || 0);
  const infantTotalPrice = 0;
  const totalTax = (adultTotalPrice + infantTotalPrice + childTotalPrice) * 0.1;

  // Calculate total price for the entire transaction
  const totalPrice =
    adultTotalPrice + childTotalPrice + infantTotalPrice + totalTax;

  const statusBadge = {
    backgroundColor: "grey",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    color: "white",
    textAlign: "center",
    borderRadius: "20px",
    padding: "4px 10px",
    width: "fit-content",
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); // Capitalize the first letter and append the rest
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not found";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  const TruncatableText = ({ text, maxLength = 10 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => setIsExpanded(!isExpanded);

    return (
      <span
        onClick={toggleText}
        style={{ cursor: "pointer", color: "#7126B5", fontWeight: "bold" }}
      >
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      </span>
    );
  };

  return (
    <Card className="p-3 shadow-sm rounded-3 mt-1 w-100">
      <Form>
        {/* {payments.map((payment) => ( */}
        {/* <div key={payment.id}> */}
        <div>
          <Alert variant="filled" style={statusBadge}>
            {/* {capitalizeFirstLetter(payment.status || 'Untracked')} */}
            Untracked
          </Alert>
        </div>
        {/* ))} */}
        <h6>
          Booking Code:{" "}
          <TruncatableText text={transaction?.data?.id} maxLength={15} />
        </h6>
        <div className="mt-4">
          <Row>
            <Col xs={7}>
              <div>
                <span>
                  <strong>
                    {transaction?.data?.departureFlight?.departureTime}
                  </strong>
                </span>
                <br />
                <span>
                  {formatDate(
                    transaction?.data?.departureFlight?.departureDate
                  )}
                </span>
              </div>
            </Col>
            <Col xs={5} className="text-end align-self-start">
              <p style={{ color: "#7126B5", fontWeight: "bold" }}>
                Keberangkatan
              </p>
            </Col>
            <span>{transaction?.data?.departureFlight?.airportFrom?.name}</span>
          </Row>
          <hr />
          <Row>
            <Col xs={2}>
              <img
                src={transaction?.data?.departureFlight?.airline?.image}
                alt="airline-logo"
              />
            </Col>
            <Col xs={10}>
              <p>
                <strong>
                  {transaction?.data?.departureFlight?.airline?.name} -{" "}
                  {capitalizeFirstLetter(
                    transaction?.data?.departureFlight?.class || "Not found"
                  )}
                </strong>{" "}
                <br />
                {transaction?.data?.departureFlight?.airline?.code}
              </p>
              <span>Informasi :</span>
              <div>
                {transaction?.data?.passenger?.length > 0 ? (
                  transaction.data.passenger.map((passenger, index) => (
                    <div key={passenger.id}>
                      <p>Penumpang {index + 1}:</p>
                      <p>Name: {passenger.name}</p>
                      <p>ID: {passenger.id}</p>
                    </div>
                  ))
                ) : (
                  <p>No passengers available.</p>
                )}
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={8}>
              <div>
                <span>
                  <strong>
                    {transaction?.data?.departureFlight?.arrivalTime}
                  </strong>
                </span>
                <br />
                <span>
                  {formatDate(transaction?.data?.departureFlight?.arrivalDate)}
                </span>
              </div>
            </Col>
            <Col xs={4} className="text-end align-self-start">
              <p style={{ color: "#7126B5", fontWeight: "bold" }}>Kedatangan</p>
            </Col>
            <span>{transaction?.data?.departureFlight?.airportTo?.name}</span>
          </Row>
          <hr />
        </div>

        <Row className="my-2">
          {/* {Object.entries(passengerCounts).map(([type, { count, totalPrice }]) => (
      <div key={type}>
        <span>{count} {type} {totalPrice}<br /></span>
    </div>
))} */}
          <Col xs={7}>
            {Object.entries(passengerCounts).map(([type, count]) => (
              <div key={type}>
                <span>
                  {count} {type}
                  <br />
                </span>
              </div>
            ))}
            Tax
          </Col>
          <Col xs={5} className="text-end align-self-start">
            <div className="d-flex flex-column">
              {passengerCounts.ADULT > 0 && <span>IDR {adultTotalPrice}</span>}
              {passengerCounts.CHILD > 0 && <span>IDR {childTotalPrice}</span>}
              {passengerCounts.INFANT > 0 && (
                <span>IDR {infantTotalPrice}</span>
              )}
              <span>IDR {totalTax}</span>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="my-2 justify-content-between">
          <Col>
            <h5>Total :</h5>
          </Col>
          <Col className="text-end align-self-start">
            <h5 style={{ color: "#7126B5", fontWeight: "bold" }}>
              IDR {totalPrice}
            </h5>
          </Col>
        </Row>
        <Button
          type="submit"
          // disabled={isPending}
          style={{
            backgroundColor: "#7126B5",
            border: "none",
            borderRadius: "8px",
            boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.2)",
            width: "100%",
            padding: "10px 0",
          }}
        >
          {/* {isPending ? "Memproses..." : "Cetak Tiket"} */}
          Cetak Tiket
        </Button>
        {/* {paymentStatus === "SUCCESS" && (
  <Button
    type="submit"
    style={{
      backgroundColor: "#7126B5",
      border: "none",
      borderRadius: "10px",
      boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.2)",
      width: "100%",
    }}
  >
    Cetak Tiket
  </Button>
)}

{paymentStatus === "PENDING" && (
  <Button
    type="button"
    style={{
      backgroundColor: "#FFA500",
      border: "none",
      borderRadius: "10px",
      boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.2)",
      width: "100%",
    }}
    onClick={handlePayment} // Optional: Add a function for payment flow
  >
    Lanjut Bayar
  </Button>
)}

{paymentStatus === "CANCELLED" && null}
{!["SUCCESS", "PENDING", "CANCELLED"].includes(paymentStatus) && null} */}
      </Form>
    </Card>
  );
};
