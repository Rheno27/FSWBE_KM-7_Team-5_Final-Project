import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Alert, Form } from "react-bootstrap";
import { useState } from "react";
import { getTransactionById } from "../../services/order-history/index";
import { Link } from "@tanstack/react-router";

export const OrderDetailCard = ({ transactionId }) => {

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

  function getPaymentStatus(status) {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return 'success';
      case 'CANCELLED':
        return 'secondary';
      case 'PENDING':
        return 'warning';
      default:
        return 'danger';
    }
  }

  const paymentStatus = transaction?.data?.payment?.status || 'untracked';

  return (
    <Card className="p-3 shadow-sm rounded-3 mt-1 w-100" style={{border: '1px solid #7126B5'}}>
      <Form>
        <Row className="justify-content-between align-items-start">
          <Col>
            <h5>Detail Pesanan</h5>
          </Col>
          <Col xs='auto' className="text-end align-self-start">
            <Alert
              className={`bg-${getPaymentStatus(transaction?.data?.payment?.status || 'untracked')} text-white`}
              style={statusBadge}
            >
              {capitalizeFirstLetter(transaction?.data?.payment?.status || 'Untracked')}
            </Alert>
          </Col>
        </Row>
        <h6>
          Booking Code : {/* <TruncatableText text={transaction?.data?.id} maxLength={15} /> */}
        </h6>
        <div className="mt-3">
          {/* Departure Flight Section */}
          <Row className="d-flex justify-content-between">
            <h6 className="text-center text-muted" style={{fontSize:'0.9rem'}}>--- Departure Flight ---</h6>
            <Col xs={6} className="d-flex flex-column">
              <span style={{marginBottom:'5px', fontSize:'0.95rem'}}>Origin :</span>
              <span>
                <strong>
                  {transaction?.data?.departureFlight?.departureTime}
                </strong>
              </span>
              <span className="mb-1">
                {formatDate(
                  transaction?.data?.departureFlight?.departureDate
                )}
              </span>
              <span style={{color:'#7126B5', fontSize:'0.95rem'}}>{transaction?.data?.departureFlight?.airportFrom?.name}</span>
            </Col>
            <Col xs={6} className="d-flex flex-column align-items-end">
              <span style={{marginBottom:'5px', fontSize:'0.95rem'}}>Destination :</span>
              <span>
                <strong>
                  {transaction?.data?.departureFlight?.arrivalTime}
                </strong>
              </span>
              <span className="mb-1">
                {formatDate(transaction?.data?.departureFlight?.arrivalDate)}
              </span>
              <span style={{color:'#7126B5', fontSize:'0.95rem'}}>{transaction?.data?.departureFlight?.airportTo?.name}</span>
            </Col>
          </Row>
          <Row className="mt-2">
            <span className="text-center text-muted" style={{fontSize:'0.9rem'}}>------ Airline ------</span>
            <Col xs={2}>
              <img
                src={transaction?.data?.departureFlight?.airline?.image}
                alt=""
              />
            </Col>
            <Col xs={10}>
              <span style={{fontSize:'0.95rem'}}>
                <b>
                  {transaction?.data?.departureFlight?.airline?.name} -{" "}
                  {capitalizeFirstLetter(
                    transaction?.data?.departureFlight?.class || "Not found"
                  )}
                </b>
                <br />
                {transaction?.data?.departureFlight?.airline?.code}
              </span>
            </Col>
          </Row>
          <hr style={{ height: '3px', backgroundColor: '#000', border: 'none' }}/>
          {/* End of departure flight section */}

          {/* Return Flight Section */}
          {transaction?.data?.returnFlight && (
          <>
            <Row className="d-flex justify-content-between">
              <h6 className="text-center text-muted" style={{fontSize:'0.9rem'}}>--- Return Flight ---</h6>
              <Col xs={6} className="d-flex flex-column">
                <span style={{marginBottom:'5px', fontSize:'0.95rem'}}>Origin :</span>
                <span>
                  <strong>
                    {transaction?.data?.returnFlight?.departureTime}
                  </strong>
                </span>
                <span className="mb-1">
                  {formatDate(
                    transaction?.data?.returnFlight?.departureDate
                  )}
                </span>
                <span style={{color:'#7126B5', fontSize:'0.95rem'}}>{transaction?.data?.returnFlight?.airportFrom?.name}</span>
              </Col>
              <Col xs={6} className="d-flex flex-column align-items-end">
                <span style={{marginBottom:'5px', fontSize:'0.95rem'}}>Destination :</span>
                <span>
                  <strong>
                    {transaction?.data?.returnFlight?.arrivalTime}
                  </strong>
                </span>
                <span className="mb-1">
                  {formatDate(transaction?.data?.returnFlight?.arrivalDate)}
                </span>
                <span style={{color:'#7126B5', fontSize:'0.95rem'}}>{transaction?.data?.returnFlight?.airportTo?.name}</span>
              </Col>
            </Row>
            <Row className="mt-2">
              <span className="text-center text-muted" style={{fontSize:'0.9rem'}}>------ Airline ------</span>
              <Col xs={2}>
                <img
                  src={transaction?.data?.returnFlight?.airline?.image}
                  alt=""
                />
              </Col>
              <Col xs={10}>
                <span style={{fontSize:'0.95rem'}}>
                    <b>
                    {transaction?.data?.returnFlight?.airline?.name} -{" "}
                    {capitalizeFirstLetter(
                      transaction?.data?.returnFlight?.class || "Not found"
                    )}
                    </b>
                  <br />
                  {transaction?.data?.returnFlight?.airline?.code}
                </span>
              </Col>
            </Row>
          <hr style={{ height: '3px', backgroundColor: '#000', border: 'none' }} />
          </>
          )}
          {/* End of return flight section */}

          <Row>
            <span>Penumpang :</span>
              <div>
                {transaction?.data?.passenger?.length > 0 ? (
                  transaction.data.passenger.map((passenger, index) => (
                    <div key={passenger.id} className="d-flex flex-column">
                      <span style={{color: "#7126B5"}}>{index + 1} : {passenger.title} {passenger.firstName} {passenger.familyName} | ui9752H</span>
                      {/* <span>ID : <TruncatableText text={passenger.id} maxLength={15} /></span> */}
                    </div>
                  ))
                ) : (
                  <p>No passengers available.</p>
                )}
              </div>
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
        <Row className="mt-2 justify-content-between">
          <Col>
            <h5>Total :</h5>
          </Col>
          <Col className="text-end align-self-start">
            <h5 style={{ color: "#7126B5", fontWeight: "bold" }}>
              IDR {totalPrice}
            </h5>
          </Col>
        </Row>
            {paymentStatus === "SUCCESS" && (
              <Button
                type="submit"
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
                {/* {isPending ? "Memproses..." : "Cetak Tiket"} */}
                Cetak Tiket
              </Button>
            )}

            {paymentStatus === "PENDING" && (
              <Button
                as={Link}
                href={`/users/private/payment/`}
                type="button"
                style={{
                  backgroundColor: "#FFA500",
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
      </Form>
    </Card>
  );
};
