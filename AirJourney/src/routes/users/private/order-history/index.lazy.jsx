import React, { useState, useEffect } from "react";
import axios from "axios";
import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Row, Col, Container, Card, Alert, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Place } from "@mui/icons-material";
import {
  getAllTransactions,
  getAllTransactionsByUser,
} from "../../../../services/transaction";
import { HeaderNav } from "../../../../components/ui/headerNav";
import OrderDetailCard from "../../../../components/OrderDetails";
import Pagination from "../../../../components/Pagination";
import notFound from "../../../../assets/img/notfound.png";
import { useSearchParams } from "react-router-dom";

export const Route = createLazyFileRoute("/users/private/order-history/")({
  component: OrderHistory,
});

function OrderHistory({ id }) {
  const navigate = useNavigate();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); 
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRange, setSelectedRange] = useState(null);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1); 
  // Reset selectedTransactionId when the location (page or filter) changes
  useEffect(() => {
    setSelectedTransactionId(null);
  }, [location, currentPage]); 

  // Initialize selectedRange from query parameters on mount
  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page"), 10) || 1;
    if (pageFromParams >= 1) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams]);

  const formatLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleFilter = (range) => {
    if (!range || !range.from) return;
  
    const fromDate = new Date(range.from);
    const toDate = range.to ? new Date(range.to) : new Date(range.from);
  
    // Ensure 'from' is at the start of the day
    fromDate.setHours(0, 0, 0, 0);
    // Ensure 'to' is at the end of the day
    toDate.setHours(23, 59, 59, 999);
  
    // Define new query parameters explicitly
    const params = {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
      page: 1, // Always reset to the first page
    };
  
    // Update the selected range and page state
    setSelectedRange({ from: fromDate, to: toDate });
    setCurrentPage(1);
  
    // Use the new parameters for navigation
    navigate({
      to: "/users/private/order-history", // Explicit route
      search: params, // Pass parameters directly as an object
    });
  };    


  const handleClear = () => {
    setSelectedRange(null); // Clear the selected range state
    setCurrentPage(1); // Reset to the first page
  
    // Navigate to the correct route with no search parameters
    navigate({
      to: "/users/private/order-history", // Explicitly set the correct route
      search: {}, // Clear all search parameters
    });
  };  

  const {
    data: responseData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "transactions",
      currentPage,
      selectedRange?.from ? formatLocalDateString(selectedRange.from) : null,
      selectedRange?.to
        ? formatLocalDateString(selectedRange.to)
        : selectedRange?.from
          ? formatLocalDateString(selectedRange.from)
          : null, // Use `from` as `to` if `to` is missing
    ],
    queryFn: () =>
      getAllTransactions(currentPage, {
        startDate: selectedRange?.from
          ? formatLocalDateString(selectedRange.from)
          : null,
        endDate: selectedRange?.to
          ? formatLocalDateString(selectedRange.to)
          : selectedRange?.from
            ? formatLocalDateString(selectedRange.from)
            : null,
      }),
    keepPreviousData: true,
    staleTime: 60000, 
    retry: 3, // Retry up to 3 times if the query fails
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff (max 30 seconds)
    onError: (error) => toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat mengambil data transaksi"
        ),
    onSuccess: (transactions) => {
      const grouped = groupHistoriesByMonth(transactions.data);
      setSelectedTransactionId(transactions.data);
    },
  });

  // Safely destructure the `data` and `meta` fetched by useQuery
  const { meta = {}, data: transactions = [] } = responseData || {};
  const totalPages = meta.totalPage || 1;

  const isAvailable = transactions.length > 0;

  const transactionsArray = Array.isArray(transactions) ? transactions : [];

  function groupHistoriesByMonth(transactions = []) {
    return transactions.reduce((grouped, { createdAt, ...rest }) => {
      const date = new Date(createdAt);
      if (isNaN(date)) {
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

  // Filter transactions based on the selected date range
  const filteredTransactions = selectedRange
    ? transactionsArray.filter((transaction) => {
        const createdAt = new Date(transaction.createdAt); 
        const fromDate = new Date(selectedRange.from); 
        const toDate = new Date(selectedRange.to); 

        // Normalize 'from' and 'to' to ignore time for comparison
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);

        // Compare the transaction date with the range
        return createdAt >= fromDate && createdAt <= toDate;
      })
    : transactionsArray;
  // Show all transactions if no date range is selected

  const groupedFilteredTransactions =
    groupHistoriesByMonth(filteredTransactions);

  useEffect(() => {
    // Show toast when token is missing or empty
    if (!token || token.trim() === "") {
      toast.error("Tidak diizinkan, redirect ke halaman utama", {
        position: "bottom-center",
        autoClose: 3000,
      });
      const timer = setTimeout(() => {
        navigate({ to: "/" });
      }, 3000);

      // Cleanup timer when component unmounts or re-renders
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const handlePaymentRedirect = () => {
    let url = `/users/private/payment/${selectedTransactionId}`;
    if (selectedTransactionId) {
      navigate({ to: url });
    } else {
      toast.error("ID transaksi tidak ditemukan!");
    }
  };

  // Mutation for sending request link through email
  const { mutate: sendTicket, isPending } = useMutation({
    mutationFn: async (email) =>
      await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions/${selectedTransactionId}/ticket`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),

    onSuccess: () => {
      toast.success("Tiket berhasil diterbitkan! Mohon cek email anda", {
        autoClose: 4000,
        position: "bottom-center",
      });
    },

    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error("Email anda tidak ditemukan di database kami.", {
          autoClose: 4000,
          position: "bottom-center",
        });
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui");
      }
    },
  });

  // Form submission handler
  const handleSendTicket = async () => {
    sendTicket();
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Explicitly update the URL and navigate to the correct route
      navigate({
        to: "/users/private/order-history", // Ensure the correct route
        search: (prev) => ({ ...Object.fromEntries(prev), page }), // Retain other params and update 'page'
      });
    }
  };

  const handleCardClick = (transactionId) => {
    setSelectedTransactionId(transactionId); // Set selected transaction
  };

  const getPaymentStatus = (status, expiredAt) => {
    const currentTime = new Date();
    const expiredTime = new Date(expiredAt);

    // Check if status is PENDING and expired
    if (status.toUpperCase() === "PENDING" && expiredTime < currentTime) {
      return "secondary"; 
    }

    // Default cases
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

  const activeCard = {
    border: "2px solid #7126B5",
    boxShadow: "0 0 10px rgba(0, 123, 255, 0.5)",
    cursor: "pointer",
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // Handle null or undefined
    return str
      .split("_") // Split the string into an array by underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join the words with a space
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not found";

    const [year, month, day] = dateStr.split("T")[0].split("-");
    const indonesianMonthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    // Ensure parsed values are valid
    if (!year || !month || !day) return "Invalid Date";

    const monthName = indonesianMonthsShort[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
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

  return (
    <div>
      <HeaderNav
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        onFilter={handleFilter}
        onClear={handleClear}
      />
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
        ) : isLoading ? (
          <div>Loading...</div> // Show loading state
        ) : isAvailable &&
          Object.keys(groupedFilteredTransactions).length > 0 ? (
          <Row className="justify-content-center my-4">
            <Col lg={6} md={6}>
              {Object.entries(groupedFilteredTransactions).map(
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
                        onClick={() => handleCardClick(transaction.id)}
                        className="p-3 shadow-sm rounded-3 mt-2 w-100 cursor-pointer"
                        style={
                          transaction.id === selectedTransactionId
                            ? activeCard
                            : { cursor: "pointer" }
                        }
                      >
                        {/* <Alert
                            className={`bg-${getPaymentStatus(transaction?.payment?.status || "Tidak diketahui")} text-white mb-0`}
                            style={statusBadge}
                          >
                            {capitalizeFirstLetter(
                              transaction?.payment?.status || "Tidak diketahui"
                            )}
                          </Alert> */}
                        <Alert
                          className={`bg-${getPaymentStatus(
                            transaction?.payment?.status || "Tidak terlacak",
                            transaction?.payment?.expiredAt
                          )} text-white mb-0 align-items-end`}
                          style={statusBadge}
                        >
                          {capitalizeFirstLetter(
                            transaction?.payment?.status === "PENDING" &&
                              new Date(transaction?.payment?.expiredAt) <
                                new Date()
                              ? "CANCELLED"
                              : transaction?.payment?.status || "Tidak terlacak"
                          )}
                        </Alert>

                        {/* Departure flight section */}
                        <Row className="d-flex align-items-center justify-content-center fs-8">
                          <span
                            className="text-center text-muted mb-3 mt-1"
                            style={{ fontSize: "0.9rem" }}
                          >
                            --- Keberangkatan (
                            {capitalizeFirstLetter(
                              transaction?.departureFlight?.class ||
                                "Tidak diketahui"
                            )}
                            ) ---
                          </span>
                          <Col
                            xs={1}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <Place color="secondary" />
                          </Col>
                          <Col xs={3} className="p-0 m-0">
                            <span>
                              <b>
                                {transaction?.departureFlight?.airportFrom
                                  ?.city || "Tidak diketahui"}
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
                                "Tidak diketahui"}
                            </span>
                          </Col>
                          <Col
                            xs={4}
                            className="p-0 px-2 pe-1 text-center mx-auto"
                          >
                            <span className="pe-3 text-muted">
                              {transaction?.departureFlight?.duration
                                ? `${Math.floor(transaction.departureFlight?.duration / 60)}j ${transaction.departureFlight.duration % 60}m`
                                : "Tidak diketahui"}
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
                          <Col
                            xs={1}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <Place color="secondary" />
                          </Col>
                          <Col xs={3} className="p-0 m-0">
                            <span>
                              <b>
                                {transaction?.departureFlight?.airportTo
                                  ?.city || "Tidak diketahui"}
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
                                "Tidak diketahui"}
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        {/* End */}

                        {/* Return flight section */}
                        {transaction?.returnFlight && (
                          <>
                            <Row className="d-flex align-items-center justify-content-center fs-8">
                              <span
                                className="text-center text-muted mb-3"
                                style={{ fontSize: "0.9rem" }}
                              >
                                ---- Kepulangan (
                                {capitalizeFirstLetter(
                                  transaction?.returnFlight?.class ||
                                    "Tidak diketahui"
                                )}
                                ) ----
                              </span>
                              <Col
                                xs={1}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <Place />
                              </Col>
                              <Col xs={3} className="p-0 m-0">
                                <span>
                                  <b>
                                    {transaction?.returnFlight?.airportTo
                                      ?.city || "Tidak diketahui"}
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
                                    "Tidak diketahui"}
                                </span>
                              </Col>
                              <Col
                                xs={4}
                                className="p-0 pe-4 mx-auto text-center"
                              >
                                <span className="text-muted">
                                  {transaction?.returnFlight?.duration
                                    ? `${Math.floor(transaction.returnFlight?.duration / 60)}j ${transaction.returnFlight.duration % 60}m`
                                    : "Tidak diketahui"}
                                </span>
                                <br />
                                <svg
                                  width="100%"
                                  height="24"
                                  viewBox="0 0 160 24"
                                >
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
                              <Col
                                xs={1}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <Place />
                              </Col>
                              <Col xs={3} className="p-0 m-0">
                                <span>
                                  <b>
                                    {transaction?.returnFlight?.airportFrom
                                      ?.city || "Tidak diketahui"}
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
                                    "Tidak diketahui"}
                                </span>
                              </Col>
                            </Row>
                            <hr />
                          </>
                        )}
                        {/* End */}

                        <Row className="justify-content-between align-items-start px-2 fs-8">
                          <Col xs={5}>
                            <span>
                              <b>Kode Booking :</b>
                            </span>
                            <br />
                            <span>
                              <TruncatableText
                                text={transaction?.id}
                                maxLength={20}
                              />
                            </span>
                          </Col>
                          <Col xs={5} className="text-end">
                            <span>
                              <b>Total :</b>{" "}
                              {transaction?.payment?.status === "CANCELLED" ? (
                                <span>--</span>
                              ) : (
                                <b style={{ color: "#7126B5" }}>
                                  Rp.{" "}
                                  {new Intl.NumberFormat("id-ID").format(
                                    transaction?.amount
                                  )}
                                </b>
                              )}
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
              {selectedTransactionId &&
              transactions.some(
                (transaction) => transaction.id === selectedTransactionId
              ) ? (
                <OrderDetailCard
                  id={selectedTransactionId}
                  handlePaymentRedirect={handlePaymentRedirect}
                  handleSendTicket={handleSendTicket}
                  isPending={isPending}
                />
              ) : (
                <p style={{ color: "#7126B5" }} className="text-center my-4">
                  Pilih riwayat untuk menampilkan detail
                </p>
              )}
            </Col>
            <Row>
              {/* Pagination */}
              <Col className="justify-content-center d-flex mt-5 mb-3">
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </Col>
              {/* <Col className="justify-content-center d-flex my-5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span style={{ margin: "0 10px" }}>
                Page {meta.page} of {meta.totalPage}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < meta.totalPage ? prev + 1 : prev
                  )
                }
                disabled={currentPage === meta.totalPage}
              >
                Next
              </button>
              </Col> */}
            </Row>
          </Row>
        ) : (
          <Container className="py-5">
            <div className="d-flex flex-column align-items-center">
              <Col xs={12} sm={10} md={7} lg={6} className="text-center my-2">
                <img
                  src={notFound}
                  alt="No order history found"
                  className="img-fluid mb-2 w-100 mx-auto"
                />
                <p style={{ color: "#a06ece", fontWeight: 500 }}>
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
                    backgroundColor: "#7126B5",
                    borderRadius: "14px",
                    border: "none",
                    color: "white",
                    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    padding: "10px 0",
                  }}
                >
                  Cari Penerbangan
                </Button>
              </Col>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
}
