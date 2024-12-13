import * as React from 'react'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Row, Col, Container, Card, Alert } from 'react-bootstrap'
import { Place } from '@mui/icons-material'
import { useState } from 'react'
import { HeaderNav } from '../../../../components/ui/headerNav'
import {
  getAllTransactions,
  getAllPayments,
} from '../../../../services/order-history'
import { OrderDetailCard } from '../../../../components/Card/orderDetail'
import { toast } from 'react-toastify'

export const Route = createLazyFileRoute('/users/private/order-history/')({
  component: OrderHistory,
})

function OrderHistory() {
  const navigate = useNavigate();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null) // Track the selected card

  const { 
    data: transactions, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getAllTransactions(), // Fetch all transactions for the user
    onError: (error) => {
      console.error('Error fetching transaction:', error);
      toast.error(error.response?.data?.message || 'An error occurred while fetching the transaction data');
    },
    onSuccess: (transactions) => {
      // Perform the side effects here
      const grouped = groupOrdersByMonth([transactions]); // Group the transactions by month
      console.log(grouped);
      setSelectedTransactionId(transactions); // Set the selected transaction
    },
  });
//   console.log("transactions :", transactions);
//   console.log('check data transactions?.data?:', transactions?.data)
//   console.log('isObject?:', typeof transactions?.data); // Should log 'object'
// console.log('isArray?:', Array.isArray(transactions?.data)); // Should log 'true'
console.log("Before function:");
console.log("Is Array:", Array.isArray(transactions));
console.log("Type:", typeof transactions);
console.log("Data:", transactions);

  // const { data: payments } = useQuery({
  //   queryKey: ['payments'],
  //   queryFn: () => getAllPayments(), // Fetch all payments for the user
  //   onError: (error) => {
  //     console.error('Error fetching payment:', error);
  //     toast.error(error.response?.data?.message || 'An error occurred while fetching the payment data');
  //   },
  // });

  // if (isLoading) return <div>Loading...</div>
  // Ensure transactions is the array before passing it to the function
  const transactionsArray = Array.isArray(transactions?.data) ? transactions.data : [];
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
  console.log(groupedTransactions);
  console.log("After function:");
  // console.log("Transactions data:", transactions, typeof transactions);
console.log("Is Array:", Array.isArray(transactions));
console.log("Type:", typeof transactions);
console.log("Data:", transactions);


  const statusBadge = {
    backgroundColor: 'grey',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9rem',
    color: 'white',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '4px 10px',
    width: 'fit-content',
  }

  const capitalizeFirstLetter = (str) => {
    if (!str) return str // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() // Capitalize the first letter and append the rest
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not found'
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr))
  }

  const TruncatableText = ({ text, maxLength = 10 }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleText = () => setIsExpanded(!isExpanded)

    return (
      <span onClick={toggleText} style={{ cursor: 'pointer', color: 'blue' }}>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      </span>
    )
  }

  // const transactionsHistories = transactions?.data || []; 

  return (
    <div>
      <HeaderNav />
      <Container>
        <Row className="justify-content-center gap-3 my-4">
          <Col lg={6} md={6}>
            {Object.entries(groupedTransactions).map(([yearMonth, transactions]) => (
              <div key={yearMonth} style={{ marginBottom: "20px" }}>
                <h4>{new Date(yearMonth + "-01").toLocaleString("default", { month: "long", year: "numeric" })}</h4>
                  {transactions.map((transaction) => (
                  <Card
                      key={transaction.id}
                      onClick={() => {
                        setSelectedTransactionId(transaction.id); // Set selected transaction
                        navigate(`/users/private/order-history/${transaction.id}`); // Navigate with the transactionId
                      }}
                      className={`p-3 shadow-sm rounded-3 mt-2 w-100 ${transaction.id === selectedTransactionId ? 'active' : ''}`}
                    >
                      {/* {payments.map((payment) => ( */}
                        {/* <div key={payment.id}> */}
                        <div>
                          <Alert variant="filled" style={statusBadge}>
                            {/* {capitalizeFirstLetter(payment.status || 'Untracked')} */}
                            Untracked
                          </Alert>
                        </div>
                      {/* ))} */}
                      <Row className="align-items-center fs-8">
                        <Col xs={1} className="m-0">
                          <Place color="secondary" />
                        </Col>
                        <Col xs={3} className="p-0 m-0">
                          <span>
                            <b>
                              {transaction?.departureFlight?.airportFrom
                                ?.city || 'Not found'}
                            </b>
                          </span>
                          <br />
                          <span>
                            {formatDate(
                              transaction?.departureFlight?.departureDate,
                            )}
                          </span>
                          <br />
                          <span>
                            {transaction?.departureFlight?.departureTime ||
                              'Not found'}
                          </span>
                        </Col>
                        <Col xs={4} className="p-0 m-0 text-center px-2">
                          <span className="pe-3 text-muted">
                            {transaction?.departureFlight?.duration
                              ? `${Math.floor(transaction.departureFlight?.duration / 60)}h ${transaction.departureFlight.duration % 60}m`
                              : 'Not found'}
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
                            <polygon points="140,12 130,6 130,18" fill="#7126b4" />
                          </svg>
                        </Col>
                        <Col xs={1} className="m-0">
                          <Place color="secondary" />
                        </Col>
                        <Col xs={3} className="p-0 m-0">
                          <span>
                            <b>
                              {transaction?.departureFlight?.airportTo?.city ||
                                'Not found'}
                            </b>
                          </span>
                          <br />
                          <span>
                            {formatDate(
                              transaction?.departureFlight?.arrivalDate,
                            )}
                          </span>
                          <br />
                          <span>
                            {transaction?.departureFlight?.arrivalTime ||
                              'Not found'}
                          </span>
                        </Col>
                      </Row>
                      <hr />
                      <Row className="justify-content-between align-items-center fs-8">
                        <Col xs={1}></Col>
                        <Col xs={4} className="p-0 m-0">
                          <span>
                            <b>Booking Code :</b>
                          </span>
                          <br />
                          <span>
                            <TruncatableText
                            text={transaction?.id}
                            maxLength={15}
                          />
                          </span>
                        </Col>
                        <Col xs={4} className="p-0 m-0">
                          <span>
                            <b>Class :</b>
                          </span>
                          <br />
                          <span>
                            {capitalizeFirstLetter(
                            transaction?.departureFlight?.class || 'Not found',
                          )}
                          </span>
                        </Col>
                        <Col xs={3} className="p-0 m-0">
                          <span>
                            <b>
                              IDR{' '}
                              {new Intl.NumberFormat('id-ID').format(
                                transaction?.amount,
                              )}
                            </b>
                          </span>
                        </Col>
                      </Row>
                  </Card>
                  ))}
              </div>
            ))}
          </Col>
          <Col lg={4} md={5} className="mt-4">
            {selectedTransactionId && ( 
              <OrderDetailCard transactionId={selectedTransactionId} /> 
              // <OrderDetailCard />
            )} 
          </Col>
        </Row>
      </Container>
    </div>
  )
}
