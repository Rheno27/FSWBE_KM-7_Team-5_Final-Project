import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Card, Alert, Form } from "react-bootstrap";
import { useState } from "react";
import { getDetailTransaction } from "../../services/transaction/index";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Thumbnail from "../../assets/img/Thumbnail.png";

function OrderDetailCard({ id, handleCancelTransaction }) {
    const { data: detailTransaction, isLoading, isError } = useQuery({
        queryKey: ["transaction", id],
        queryFn: async () => {
            const response = await getDetailTransaction(id);
            return response;
        },
        enabled: !!id,
        onError: (err) => {
            toast.error(
            err.message || "An error occurred while fetching transaction data"
            );
        },
    });

    if (isLoading) {
        return <p>Loading order details...</p>;
    }

    if (isError || !detailTransaction) {
        return <p>Error loading order details. Please try again.</p>;
    }
    const allPassenger = detailTransaction?.data?.passenger || []
    const passengerAdult = allPassenger.filter(passenger => passenger.type === 'ADULT').length
    const passengerChild = allPassenger.filter(passenger => passenger.type === 'CHILD').length
    const passengerInfant = allPassenger.filter(passenger => passenger.type === 'INFANT').length

    //price departure
    const allAdultPrice = detailTransaction?.data?.departureFlight?.price * passengerAdult
    const allChildPrice = detailTransaction?.data?.departureFlight?.price * passengerChild

    //price return
    const allReturnAdultPrice = detailTransaction?.data?.returnFlight?.price * passengerAdult
    const allReturnChildPrice = detailTransaction?.data?.returnFlight?.price * passengerChild


    const allTaxDeparture = (allAdultPrice + allChildPrice ) * 0.1;
    const allTaxReturn = (allReturnAdultPrice + allReturnChildPrice ) * 0.1;

    const allTotalPrice = allAdultPrice + allChildPrice + allTaxDeparture + (detailTransaction?.data?.returnFlight !== null ? allReturnAdultPrice + allReturnChildPrice + allTaxReturn : 0);

    return (
        <>
            <Col lg={5} className="flightdetails my-2">
                <Card className="shadow-sm">
                    <Card.Body>
                    <div className="mb-3"
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "black",
                    }}
                    >Detail Penerbangan</div>
                    <Row>
                        <Col lg={7} >
                            <div
                                className="time"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                {detailTransaction?.departureFlight?.departureTime}
                            </div>
                            <div className="departure mt-2 mb-2">
                                <div className="date">
                                {
                                    detailTransaction?.data?.departureFlight?.departureDate &&
                                    new Date(detailTransaction.data.departureFlight.departureDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        detailTransaction?.data?.departureFlight
                                            ?.airportFrom?.name
                                    }
                                </div>
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
                        <Col lg={2}>
                            <div
                                className="flight-image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img src={Thumbnail} alt="Flight" />
                            </div>
                        </Col>
                        <Col lg={10}>
                            <div className="flight-info mb-2 mt-3">
                                <div
                                    className="airline"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        detailTransaction?.data?.departureFlight?.airline
                                            ?.name
                                    }{" "}
                                    - {detailTransaction?.data?.departureFlight?.class}
                                </div>
                                <div
                                    className="flight-number mb-2"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        detailTransaction?.data?.departureFlight?.airline
                                            ?.code
                                    }
                                </div>

                                <div className="info-box">
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
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                    <Col lg={7} >
                            <div
                                className="time"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                {
                                    detailTransaction?.data?.departureFlight
                                        ?.arrivalTime
                                }
                            </div>
                            <div className="arrival mt-2 mb-2">
                                <div className="date">
                                {
                                    detailTransaction?.data?.departureFlight?.arrivalDate &&
                                    new Date(detailTransaction.data.departureFlight.arrivalDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        detailTransaction?.data?.departureFlight
                                            ?.airportTo?.name
                                    }
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
                                {detailTransaction?.data?.departureFlight?.airportTo?.name}
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
                                Rp {detailTransaction?.data?.departureFlight?.price}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {detailTransaction?.data?.returnFlight !== null && (
                <Card className="shadow-sm mb-3 mt-3 ">
                    <Card.Body>
                    <div className="mb-3"
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "black",
                    }}
                    >Detail Penerbangan</div>
                    <Row>
                        <Col lg={7} >
                            <div
                                className="time"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                {detailTransaction?.data?.returnFlight?.departureTime}
                            </div>
                            <div className="departure mt-2 mb-2">
                                <div className="date">
                                {
                                    detailTransaction?.data?.returnFlight?.departureDate &&
                                    new Date(detailTransaction.data.returnFlight.departureDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        detailTransaction?.data?.returnFlight
                                            ?.airportFrom?.name
                                    }
                                </div>
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
                        <Col lg={6}>
                            <div
                                className="keberangkatan"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#4B1979",
                                    textAlign: "right",
                                }}
                            >
                                {detailTransaction?.data?.returnFlight?.airportTo?.name}
                            </div>
                        </Col>
                    </Row>
                    <hr />

                    {/* Flight Details Section */}
                    <Row>
                        <Col lg={2}>
                            <div
                                className="flight-image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img src={Thumbnail} alt="Flight" />
                            </div>
                        </Col>
                        <Col lg={10}>
                            <div className="flight-info mb-2 mt-3">
                                <div
                                    className="airline"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        detailTransaction?.data?.returnFlight?.airline
                                            ?.name
                                    }{" "}
                                    - {detailTransaction?.data?.returnFlight?.class}
                                </div>
                                <div
                                    className="flight-number mb-2"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        detailTransaction?.data?.returnFlight?.airline
                                            ?.code
                                    }
                                </div>

                                <div className="info-box">
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
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                    <Col lg={7} >
                            <div
                                className="time"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                {
                                    detailTransaction?.data?.returnFlight
                                        ?.arrivalTime
                                }
                            </div>
                            <div className="arrival mt-2 mb-2">
                                <div className="date">
                                {
                                    detailTransaction?.data?.returnFlight?.arrivalDate &&
                                    new Date(detailTransaction.data.returnFlight.arrivalDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        detailTransaction?.data?.returnFlight
                                            ?.airportTo?.name
                                    }
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
                                Rp {detailTransaction?.data?.returnFlight?.price}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            )}
            <Card className="mt-3">
                <Card.Body>
                    {/* Heading */}
                    <Row>
                        <div
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                            }}
                        >
                            Rincian Harga
                        </div>
                    </Row>
                    <hr />
                    {/* Rincian Harga */}
                    <Row>
                        <Col
                            xs={8}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ fontSize: "16px", marginBottom: "5px" , fontWeight: "bold"}}>
                                Departure
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                {passengerAdult} Adult
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                {passengerChild} Child
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                {passengerInfant} Infant
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>Tax</div>
                        </Col>

                        <Col
                            xs={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ fontSize: "16px", marginBottom: "5px" , fontWeight: "bold"}}>
                                Harga
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                Rp {allAdultPrice ?? 0}
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                Rp {allChildPrice ?? 0}
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                Rp {0 ?? 0}
                            </div>
                            <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                Rp {allTaxDeparture ?? 0}
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    {detailTransaction?.data?.returnFlight !== null && (
                        <>
                            <Row>
                                <Col
                                    xs={8}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ fontSize: "16px", marginBottom: "5px" , fontWeight: "bold"}}>
                                        Return
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        {passengerAdult} Adult
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        {passengerChild} Child
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        {passengerInfant} Infant
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>Tax</div>
                                </Col>

                                <Col
                                    xs={4}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ fontSize: "16px", marginBottom: "5px" , fontWeight: "bold"}}>
                                        Harga
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        Rp {allReturnAdultPrice ?? 0}
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        Rp {allReturnChildPrice ?? 0}
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        Rp {0 ?? 0}
                                    </div>
                                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                        Rp {allTaxReturn ?? 0}
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                        </>
                    )}
                    {/* Total Harga */}
                    <Row>
                        <Col
                            xs={8}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                            }}
                        >
                            Total Harga
                        </Col>
                        <Col
                            xs={4}
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#4B1979",
                                textAlign: "right",
                            }}
                        >
                            Rp {allTotalPrice ?? 0}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Button
                className="mt-3 w-100 mb-4"
                style={{
                    backgroundColor: "#FF0000",
                    borderColor: "#FF0000",
                }}
                onClick={handleCancelTransaction}
            >
                Cencel Transaction
            </Button>
            </Col>
        </>
    );
};

OrderDetailCard.propTypes = {
    handleCancelTransaction: PropTypes.any,
    passenger: PropTypes.any,
};

export default OrderDetailCard;
