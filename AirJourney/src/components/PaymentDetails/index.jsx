import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Alert, Form } from "react-bootstrap";
import { useState } from "react";
import { getDetailTransaction } from "../../services/transaction/index";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import Thumbnail from "../../assets/img/Thumbnail.png";

export const OrderDetailCard = ({ id }) => {
  useEffect(() => {
    console.log("OrderDetailCard received ID:", id);
    console.log('expiredAt', transaction?.data?.payment?.expiredAt);
  }, [id]);
  
  const { data: transaction, isLoading, isError } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getDetailTransaction(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(
        err.message || "An error occurred while fetching transaction data"
      );
    },
  });

  console.log('expiredAt', transaction?.data?.payment?.expiredAt);
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

  const flightPrice = transaction?.data?.departureFlight?.price + 
  (transaction?.data?.returnFlight?.price || 0) || 0;

  console.log("transaction", transaction?.data?.departureFlight?.price);
  const adultTotalPrice = flightPrice * (passengerCounts.ADULT || 0);
  const childTotalPrice = flightPrice * (passengerCounts.CHILD || 0);
  const infantTotalPrice = flightPrice * 0;
  const totalTax = (adultTotalPrice + childTotalPrice+ infantTotalPrice) * 0.1;

  // Calculate total price for the entire transaction
  const totalPrice = adultTotalPrice + childTotalPrice + infantTotalPrice + totalTax;

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
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
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
      case 'SUCCESS':
        return 'success';
      case 'CANCELLED':
        return 'secondary';
      case 'PENDING':
        return 'danger';
      default:
        return 'warning';
    }
  }

  const paymentStatus = transaction?.data?.payment?.status || 'untracked';
  

  return (
    <Card className="p-3 shadow-sm rounded-3 w-100" style={{border: '1px solid #7126B5'}}>
      <Form>
        <h6>
          Booking Code : <TruncatableText text={transaction?.data?.id || "Not found"} maxLength={15} />
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
              <span style={{color:'#7126B5', fontSize:'0.95rem'}} className="text-end">{transaction?.data?.departureFlight?.airportTo?.name}</span>
            </Col>
          </Row>
          <Row className="mt-2">
            <span className="text-center text-muted" style={{fontSize:'0.9rem'}}>------ Airline ------</span>
            <Col xs={2}>
              <img
                // src={transaction?.data?.departureFlight?.airline?.image}
                src={Thumbnail}
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
          <hr style={{ height: '2px', backgroundColor: '#000000', border: 'none' }}/>
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
          <hr style={{ height: '2px', backgroundColor: '#000000', border: 'none' }} />
          </>
          )}
          {/* End of return flight section */}

          {/* <Row>
            <span>Penumpang :</span>
              <div>
                {transaction?.data?.passenger?.length > 0 ? (
                  transaction.data.passenger.map((passenger, index) => (
                    <div key={passenger.id} className="d-flex flex-column">
                      <span style={{color: "#7126B5"}}>{index + 1} : {passenger.title} {passenger.firstName} {passenger.familyName} | <TruncatableText text={passenger.id} maxLength={10} /></span>
                    </div>
                  ))
                ) : (
                  <p>No passengers available.</p>
                )}
              </div>
          </Row> */}
          {/* <hr /> */}
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
              {passengerCounts.ADULT > 0 && <span>IDR {new Intl.NumberFormat("id-ID").format(adultTotalPrice)}</span>}
              {passengerCounts.INFANT > 0 && <span>IDR {new Intl.NumberFormat("id-ID").format(infantTotalPrice)}</span>}
              {passengerCounts.CHILD > 0 && <span>IDR {new Intl.NumberFormat("id-ID").format(childTotalPrice)}</span>}
              <span>
              {paymentStatus === "CANCELLED" ? (
                <span>--</span>
              ) : (
                <span>
                  IDR{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    totalTax
                  )}
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
                IDR{" "}
                {new Intl.NumberFormat("id-ID").format(
                  totalPrice
                )}
              </h5>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
