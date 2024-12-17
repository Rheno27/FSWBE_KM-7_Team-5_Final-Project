import { Card, Row, Col, Button } from "react-bootstrap";
import Thumbnail from "../../assets/img/Thumbnail.png";
import { useQuery } from "@tanstack/react-query";
import { getFlightByID } from "../../services/flight";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function FlightDetails({ handleSubmit, passenger, flightId, returnFlightId }) {
    const { passengerType } = useSelector(state => state.searchQuery)

    const { data: detailFlight } = useQuery({
        queryKey: ["flight", flightId],
        queryFn: async () => {
            const response = await getFlightByID(flightId);
            console.log("response", response);
            return response;
        },
        enabled: !!flightId,
        retry: 1,
    });

    const { data: returnDetailFlight, isSuccess } = useQuery({
        queryKey: ["flight", returnFlightId],
        queryFn: async () => {
            const response = await getFlightByID(returnFlightId);
            console.log("response", response);
            return response;
        },
        enabled: !!returnFlightId,
        retry: 1,
    });

    const passengerAdult = passenger.ADULT
    const passengerChild = passenger.CHILD
    const passengerInfant = passenger.INFANT

    //price
    const allAdultPrice = returnFlightId
        ? detailFlight?.departureFlight?.price * passenger.ADULT +
          returnDetailFlight?.departureFlight?.price * passenger.ADULT
        : detailFlight?.departureFlight?.price * passenger.ADULT;
    const allChildPrice = returnFlightId
        ? detailFlight?.departureFlight?.price * passenger.CHILD +
          returnDetailFlight?.departureFlight?.price * passenger.CHILD
        : detailFlight?.departureFlight?.price * passenger.CHILD;
    const allInfantPrice = returnFlightId
        ? detailFlight?.departureFlight?.price * passenger.INFANT +
          returnDetailFlight?.departureFlight?.price * passenger.INFANT
        : detailFlight?.departureFlight?.price * passenger.INFANT;
    const allTax = (allAdultPrice + allInfantPrice + allChildPrice) * 0.1;
    const allTotalPrice = allAdultPrice + allInfantPrice + allChildPrice + allTax;

    return (
        <>
            <Col lg={5} className="flight-details">
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
                                {detailFlight?.departureFlight?.departureTime}
                            </div>
                            <div className="departure mt-2 mb-2">
                                <div className="date">
                                {
                                    detailFlight?.departureFlight?.departureDate &&
                                    new Date(detailFlight.departureFlight.departureDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        detailFlight?.departureFlight
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
                                {detailFlight?.arrivalFlight?.airportTo?.name}
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
                                        detailFlight?.departureFlight?.airline
                                            ?.name
                                    }{" "}
                                    - {detailFlight?.departureFlight?.class}
                                </div>
                                <div
                                    className="flight-number mb-2"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        detailFlight?.departureFlight?.airline
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
                                    detailFlight?.departureFlight
                                        ?.arrivalTime
                                }
                            </div>
                            <div className="arrival mt-2 mb-2">
                                <div className="date">
                                {
                                    detailFlight?.departureFlight?.arrivalDate &&
                                    new Date(detailFlight.departureFlight.arrivalDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        detailFlight?.departureFlight
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
                                {detailFlight?.arrivalFlight?.airportTo?.name}
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
                                Rp {detailFlight?.departureFlight?.price}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {isSuccess && (
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
                                {returnDetailFlight?.departureFlight?.departureTime}
                            </div>
                            <div className="departure mt-2 mb-2">
                                <div className="date">
                                {
                                    returnDetailFlight?.departureFlight?.departureDate &&
                                    new Date(returnDetailFlight.departureFlight.departureDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        returnDetailFlight?.departureFlight
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
                                {returnDetailFlight?.arrivalFlight?.airportTo?.name}
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
                                        returnDetailFlight?.departureFlight?.airline
                                            ?.name
                                    }{" "}
                                    - {returnDetailFlight?.departureFlight?.class}
                                </div>
                                <div
                                    className="flight-number mb-2"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        returnDetailFlight?.departureFlight?.airline
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
                                    returnDetailFlight?.departureFlight
                                        ?.arrivalTime
                                }
                            </div>
                            <div className="arrival mt-2 mb-2">
                                <div className="date">
                                {
                                    returnDetailFlight?.departureFlight?.arrivalDate &&
                                    new Date(returnDetailFlight.departureFlight.arrivalDate).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                                </div>
                                <div className="airport">
                                    {
                                        returnDetailFlight?.departureFlight
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
                                {returnDetailFlight?.arrivalFlight?.airportTo?.name}
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
                                Rp {returnDetailFlight?.departureFlight?.price}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            )}
            <Card className="mt-3">
                <Card.Body>
                    <Row>
                        <div
                            className="time"
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                            }}
                        >
                            Rincian Harga
                        </div>
                    </Row>
                    <hr />
                    <Row>
                    <Col lg={8}>
                            <div className="departure ">
                                    <div className="passenger">
                                        {passengerAdult} Adult
                                    </div>
                                    <div className="passenger">
                                        {passengerChild} Child
                                    </div>
                                    <div className="passenger">
                                        {passengerInfant} Infant
                                    </div>
                                    <div className="tax">Tax</div>
                                </div>
                        </Col>
                        <Col lg={4}>
                            <div
                                className="priceadult"
                                style={{
                                    marginLeft: "20px",
                                    textAlign: "right",
                                }}
                            >
                                Rp {allAdultPrice}
                            </div>
                            <div
                                className="pricechild"
                                style={{
                                    marginLeft: "20px",
                                    textAlign: "right",
                                }}
                            >
                                Rp {allChildPrice}
                            </div>
                            <div
                                className="pricebaby"
                                style={{
                                    marginLeft: "20px",
                                    textAlign: "right",
                                }}
                            >
                                Rp {allInfantPrice}
                            </div>
                            <div
                                className="tax"
                                style={{
                                    marginLeft: "20px",
                                    textAlign: "right",
                                }}
                            >
                                Rp {allTax}
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={8}>
                            <div
                                className="time"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Total Harga
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div
                                className="total-price"
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "#4B1979",
                                    textAlign: "right",
                                }}
                            >
                                Rp {allTotalPrice}
                            </div>
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
                onClick={handleSubmit}
            >
                Lanjutkan Pembayaran
            </Button>
        </Col>
        </>
    );
}

FlightDetails.propTypes = {
    handleSubmit: PropTypes.any,
    passenger: PropTypes.any,
    flightId: PropTypes.any,
    returnFlightId: PropTypes.any,
};

export default FlightDetails;
