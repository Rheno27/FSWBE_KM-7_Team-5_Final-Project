import * as React from "react";
import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Container, Card, Alert, Button } from "react-bootstrap";
import { Place } from "@mui/icons-material";
import { useState } from "react";
import { HeaderNav } from "../../../../components/ui/headerNav";
import { getAllTransactions } from "../../../../services/order-history";
import { OrderDetailCard } from "../../../../components/Card/orderDetail";
import { toast } from "react-toastify";
import notFound from '../../../../assets/img/notfound.png'

export const Route = createLazyFileRoute("/users/private/order-history/")({
  component: OrderHistory,
});

function OrderHistory() {
  const navigate = useNavigate();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); // Track the selected card

  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getAllTransactions(), // Fetch all transactions for the user
    onError: (error) => {
      console.error("Error fetching transaction:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching the transaction data"
      );
    },
    onSuccess: (transactions) => {
      // Perform the side effects here
      const grouped = groupOrdersByMonth([transactions]); // Group the transactions by month
      console.log(grouped);
      setSelectedTransactionId(transactions); // Set the selected transaction
    },
  });
  const isAvailable = transactions?.data.length > 0;
  // console.log("Before function:");
  // console.log("Is Array:", Array.isArray(transactions));
  // console.log("Type:", typeof transactions);
  // console.log("Data:", transactions);

  // if (isLoading) return <div>Loading...</div>
  // Ensure transactions is the array before passing it to the function
  const transactionsArray = Array.isArray(transactions?.data)
    ? transactions.data
    : [];
  console.log("Transactions before grouping:", transactionsArray);

  function groupHistoriesByMonth(transactions = []) {
    return transactions.reduce((grouped, { createdAt, ...rest }) => {
      //console.log("Transaction:", transaction);
      // Extract year and month from the created_at timestamp
      const date = new Date(createdAt);
      console.log("Parsed Date:", date);
      if (isNaN(date)) {
        console.error("Invalid date for transaction:", createdAt);
        return grouped;
      }
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      // Group transactions by the year-month key
      if (!grouped[yearMonth]) {
        grouped[yearMonth] = [];
      }
      grouped[yearMonth].push({ createdAt, ...rest });

      return grouped;
    }, {});
  }

  const groupedTransactions = groupHistoriesByMonth(transactionsArray);
  // console.log('groupedTransactions', groupedTransactions);
  console.log("After function:");
  // console.log("Transactions data:", transactions, typeof transactions);
  console.log("Is Array:", Array.isArray(transactions));
  console.log("Type:", typeof transactions);
  console.log("Data:", transactions);

  const statusBadge = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    textAlign: "center",
    borderRadius: "20px",
    border: "none",
    padding: "5px 10px",
    width: "fit-content",
  };

  const activeCard = {
    border: '2px solid #7126B5',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)',
    cursor: 'pointer',
  }  

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
      <span onClick={toggleText} style={{ cursor: "pointer" }}>
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

  return (
    <div>
      <HeaderNav />
      <Container>
      {isAvailable ? (
        <Container>
          <Row className="justify-content-center gap-1 my-4">
            <Col lg={6} md={6}>
              {Object.entries(groupedTransactions).map(
                ([yearMonth, transactions]) => (
                  <div key={yearMonth} style={{ marginBottom: "20px" }}>
                    <h5 className="mb-2 fw-bold">
                      {new Date(yearMonth + "-01").toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h5>
                    {transactions.map((transaction) => (
                      <Card
                        key={transaction.id}
                        onClick={() => {
                          setSelectedTransactionId(transaction.id); // Set selected transaction
                          navigate(
                            `/users/private/order-history/${transaction.id}`
                          ); // Navigate with the transactionId
                        }}
                        className='p-3 shadow-sm rounded-3 mt-2 w-100 cursor-pointer'
                        style={transaction.id === selectedTransactionId ? activeCard : { cursor: 'pointer' }}
                      >
                        <Alert
                          className={`bg-${getPaymentStatus(transaction?.payment?.status || 'untracked')} text-white`}
                          style={statusBadge}
                        >
                          {capitalizeFirstLetter(transaction?.payment?.status || 'Untracked')}
                        </Alert>

                        {/* Departure flight section */}
                        <h6 className="mb-2">
                          Departure Flight - {" "}
                          {capitalizeFirstLetter(
                            transaction?.departureFlight?.class || "Not found"
                          )}
                        </h6>
                        <Row className="align-items-center fs-8">
                          <Col xs={1} className="m-0">
                            <Place color="secondary" />
                          </Col>
                          <Col xs={3} className="p-0 m-0">
                            <span>
                              <b>
                                {transaction?.departureFlight?.airportFrom
                                  ?.city || "Not found"}
                              </b>
                            </span>
                            <br />
                            <span>
                              {formatDate(
                                transaction?.departureFlight?.departureDate
                              )}
                            </span>
                            <br />
                            <span>
                              {transaction?.departureFlight?.departureTime ||
                                "Not found"}
                            </span>
                          </Col>
                          <Col xs={4} className="p-0 text-center mx-auto">
                            <span className="pe-3 text-muted">
                              {transaction?.departureFlight?.duration
                                ? `${Math.floor(transaction.departureFlight?.duration / 60)}h ${transaction.departureFlight.duration % 60}m`
                                : "Not found"}
                            </span>
                            <br />
                            <svg width="100%" height="24" viewBox="0 0 160 24">
                              {/* Increased the tail length */}
                              <line
                                x1="0"
                                y1="12"
                                x2="140"
                                y2="12"
                                stroke="#7126b4"
                                strokeWidth="2"
                              />
                              {/* Arrowhead repositioned at the end of the line */}
                              <polygon
                                points="140,12 130,6 130,18"
                                fill="#7126b4"
                              />
                            </svg>
                          </Col>
                          <Col xs={1} className="m-0">
                            <Place color="secondary" />
                          </Col>
                          <Col xs={3} className="p-0 m-0">
                            <span>
                              <b>
                                {transaction?.departureFlight?.airportTo?.city ||
                                  "Not found"}
                              </b>
                            </span>
                            <br />
                            <span>
                              {formatDate(
                                transaction?.departureFlight?.arrivalDate
                              )}
                            </span>
                            <br />
                            <span>
                              {transaction?.departureFlight?.arrivalTime ||
                                "Not found"}
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        {/* End */}

                        {/* Return flight section */}
                        {transaction?.returnFlight && (
                          <>
                            <h6 className="my-2">
                              Return Flight - {" "}
                              {capitalizeFirstLetter(
                                transaction?.returnFlight?.class || "Not found"
                              )}
                            </h6>
                            <Row className="align-items-center fs-8">
                              <Col xs={1} className="m-0">
                                <Place/>
                              </Col>
                              <Col xs={3} className="p-0 m-0">
                                <span>
                                  <b>
                                    {transaction?.returnFlight?.airportTo?.city || "Not found"}
                                  </b>
                                </span>
                                <br />
                                <span>
                                  {formatDate(
                                    transaction?.returnFlight?.arrivalDate
                                  )}
                                </span>
                                <br />
                                <span>
                                  {transaction?.returnFlight?.arrivalTime ||
                                    "Not found"}
                                </span>
                              </Col>
                              <Col xs={4} className="p-0 pe-4 mx-auto text-center">
                                <span className="text-muted">
                                  {transaction?.returnFlight?.duration
                                    ? `${Math.floor(transaction.returnFlight?.duration / 60)}h ${transaction.returnFlight.duration % 60}m`
                                    : "Not found"}
                                </span>
                                <br />
                                <svg width="100%" height="24" viewBox="0 0 160 24">
                                  {/* Arrowhead at the left side */}
                                  <polygon
                                    points="10,12 16,6 16,18"
                                    fill="#000000"
                                  />
                                  {/* Tail starts from the arrowhead and extends to the right */}
                                  <line
                                    x1="16"
                                    y1="12"
                                    x2="160"
                                    y2="12"
                                    stroke="#000000"
                                    strokeWidth="2"
                                  />
                                </svg>
                              </Col>
                              <Col xs={1} className="m-0">
                                <Place/>
                              </Col>
                              <Col xs={3} className="p-0 m-0">
                                <span>
                                  <b>
                                    {transaction?.returnFlight?.airportFrom?.city ||
                                      "Not found"}
                                  </b>
                                </span>
                                <br />
                                <span>
                                  {formatDate(
                                    transaction?.returnFlight?.departureDate
                                  )}
                                </span>
                                <br />
                                <span>
                                  {transaction?.returnFlight?.departureTime ||
                                    "Not found"}
                                </span>
                              </Col>
                            </Row>
                            <hr />
                          </>
                        )}
                        {/* End */}

                        <Row className="justify-content-between align-items-end fs-8">
                          <Col xs={5}>
                            <span>
                              <b>Booking Code :</b>
                            </span>
                            <br />
                            <span>
                              <TruncatableText
                                text={transaction?.id}
                                maxLength={20}
                              />
                            </span>
                          </Col>
                          <Col xs={5}>
                            <span>
                              Total Price : {" "}
                              <b>
                                IDR{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                  transaction?.amount
                                )}
                              </b>
                            </span>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </div>
                )
              )}
            </Col>
            <Col lg={4} md={5} className="mt-4">
              {selectedTransactionId && (
                <OrderDetailCard transactionId={selectedTransactionId} />
                // <OrderDetailCard />
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="py-5">
          <div className="d-flex flex-column align-items-center">
            <Col xs={12} sm={10} md={7} lg={6} className="text-center my-2">
              <img
                src={notFound}
                alt="No order history found"
                className="img-fluid mb-2 w-100 mx-auto"
              />
              <p
                style={{ color: '#a06ece', fontWeight: 500 }}
              >
                Oops! Riwayat pesanan kosong! <br />
                <span className="text-dark my-2">
                Anda belum melakukan pemesanan penerbangan
                </span>
              </p>
            </Col>
            <Col xs={10} sm={8} md={5} lg={4}>
              <Button
                as={Link}
                href={`/`}
                style={{
                  backgroundColor: '#7126B5',
                  borderRadius: '14px',
                  border: 'none',
                  color: 'white',
                  boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  padding: '10px 0',
                }}
              >
                Cari Penerbangan
              </Button>
            </Col>
          </div>
        </Container>
      )}
      </Container>
    </div>
  );
}
