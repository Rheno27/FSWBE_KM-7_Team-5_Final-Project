import { Card, Row, Col, Button } from "react-bootstrap";
import Thumbnail from "../../assets/img/Thumbnail.png";
import { useQuery } from "@tanstack/react-query";
import { getFlightByID } from "../../services/flight";
import PropTypes from "prop-types";

function FlightDetails({ handleSubmit, passenger, flightId, returnFlightId }) {
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

    const { data: returnDetailFlight } = useQuery({
        queryKey: ["flight", returnFlightId],
        queryFn: async () => {
            const response = await getFlightByID(returnFlightId);
            console.log("response", response);
            return response;
        },
        enabled: !!returnFlightId,
        retry: 1,
    });

    //price
    const adultPrice = returnFlightId
        ? detailFlight?.departureFlight?.price * passenger.ADULT +
          returnDetailFlight?.departureFlight?.price * passenger.ADULT
        : detailFlight?.departureFlight?.price * passenger.ADULT;
    const childPrice = returnFlightId
        ? detailFlight?.departureFlight?.price * passenger.CHILD +
          returnDetailFlight?.departureFlight?.price * passenger.CHILD
        : detailFlight?.departureFlight?.price * passenger.CHILD;
    const infantPrice = returnFlightId
        ? detailFlight?.departureFlight?.price * passenger.INFANT +
          returnDetailFlight?.departureFlight?.price * passenger.INFANT
        : detailFlight?.departureFlight?.price * passenger.INFANT;
    const tax = (adultPrice + infantPrice + childPrice) * 0.1;
    const totalPrice = adultPrice + infantPrice + childPrice + tax;

    return (
        <Col lg={5}>
            <Card className="shadow-sm">
                <Card.Body>
                    <h3 className="mb-3">Detail Penerbangan</h3>
                    <Row>
                        <Col lg={6}>
                            <div
                                className="time"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                {detailFlight?.departureFlight?.departureTime}
                            </div>
                            <div className="flight-details">
                                <div className="departure mb-3">
                                    <div className="date">
                                        {
                                            detailFlight?.departureFlight
                                                ?.departureDate
                                        }
                                    </div>
                                    <div className="airport">
                                        {
                                            detailFlight?.departureFlight
                                                ?.airportFrom?.name
                                        }
                                    </div>
                                </div>
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
                            <div className="flight-info mb-3">
                                <div
                                    className="airline"
                                    style={{
                                        fontSize: "14px",
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
                                    className="flight-number mb-4"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        detailFlight?.departureFlight?.airline
                                            ?.code
                                    }
                                </div>

                                <div className="info-box">
                                    <h6>Informasi:</h6>
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
                        <Col lg={8}>
                            <div
                                className="time"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                {detailFlight?.arrivalFlight?.arrivalTime}
                            </div>
                            <div className="flight-details">
                                <div className="departure mb-2">
                                    <div className="date">
                                        {
                                            detailFlight?.arrivalFlight
                                                ?.arrivalDate
                                        }
                                    </div>
                                    <div className="airport">
                                        {
                                            detailFlight?.arrivalFlight
                                                ?.airportTo?.name
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div
                                className="keberangkatan"
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
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <Card.Body>
                    <Row>
                        <Col lg={8}>
                            <div
                                className="time"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Rincian Harga
                            </div>
                            <div className="flight-details">
                                <div className="departure ">
                                    <div className="passenger">
                                        {passenger.ADULT} Adult
                                    </div>
                                    <div className="passenger">
                                        {passenger.CHILD} Child
                                    </div>
                                    <div className="passenger">
                                        {passenger.INFANT} Infant
                                    </div>
                                    <div className="tax">Tax</div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div
                                className="priceadult"
                                style={{
                                    marginTop: "30px",
                                    marginLeft: "20px",
                                }}
                            >
                                Rp {adultPrice}
                            </div>
                            <div
                                className="pricechild"
                                style={{
                                    marginLeft: "20px",
                                }}
                            >
                                Rp {childPrice}
                            </div>
                            <div
                                className="pricebaby"
                                style={{
                                    marginLeft: "20px",
                                }}
                            >
                                Rp {infantPrice}
                            </div>
                            <div
                                className="tax"
                                style={{
                                    marginLeft: "20px",
                                }}
                            >
                                Rp {tax}
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
                                Rp {totalPrice}
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
    );
}

FlightDetails.propTypes = {
    handleSubmit: PropTypes.any,
    passenger: PropTypes.any,
    flightId: PropTypes.any,
    returnFlightId: PropTypes.any,
};

export default FlightDetails;
