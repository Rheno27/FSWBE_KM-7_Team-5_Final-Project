import { Row, Col, Card } from "react-bootstrap";
import "./style.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getFlightByID } from "../../services/flight";
import PropTypes from "prop-types";
import { useEffect } from "react";

const SeatPicker = ({
    selectedSeats,
    setSelectedSeats,
    totalPassengers,
    selectedReturnSeats,
    setSelectedReturnSeats,
}) => {
    const { flightId, returnFlightId } = useSelector(
        (state) => state.searchQuery
    );
    const { passenger } = useSelector((state) => state.searchQuery);

    const { data: detailFlight } = useQuery({
        queryKey: ["flight", flightId],
        queryFn: async () => {
            const response = await getFlightByID(flightId);
            return response;
        },
        enabled: !!flightId,
        retry: 1,
    });
    const { data: returnDetailFlight, isSuccess } = useQuery({
        queryKey: ["flight", returnFlightId],
        queryFn: async () => {
            const response = await getFlightByID(returnFlightId);
            return response;
        },
        enabled: !!returnFlightId,
        retry: 1,
    });
    useEffect(() => {
        console.log(
            "detail",
            detailFlight,
            detailFlight?.departureFlight?.aeroplane?.maxColumn / 2
        );
    }, [detailFlight]);
    //seat
    const totalPassengerSeat =
        (passenger?.ADULT || 0) + (passenger?.CHILD || 0);
    const handleSeatSelection = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats((prev) => {
                const updatedSeats = prev.filter((s) => s !== seatId);
                console.log("selectedSeats after removal:", updatedSeats);
                return updatedSeats;
            });
        } else if (selectedSeats.length < totalPassengerSeat) {
            setSelectedSeats((prev) => {
                const updatedSeats = [...prev, seatId];
                console.log("selectedSeats after addition:", updatedSeats);
                return updatedSeats;
            });
        }
    };
    const handleReturnSeatSelection = (seatId) => {
        if (selectedReturnSeats.includes(seatId)) {
            setSelectedReturnSeats((prev) => {
                const updatedSeats = prev.filter((s) => s !== seatId);
                console.log("selectedReturnSeats after removal:", updatedSeats);
                return updatedSeats;
            });
        } else if (selectedReturnSeats.length < totalPassengerSeat) {
            setSelectedReturnSeats((prev) => {
                const updatedSeats = [...prev, seatId];
                console.log(
                    "selectedReturnSeats after addition:",
                    updatedSeats
                );
                return updatedSeats;
            });
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h4>Pilih Kursi</h4>
                    <Card.Header
                        className="form-header"
                        style={{
                            backgroundColor: "#4978d0",
                            color: "#fff",
                            padding: "10px 15px",
                            borderRadius: "4px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        <div className="class-seat">Bisnis Class</div>
                    </Card.Header>
                    <Row>
                        <Col lg={12} className="p-4">
                            <div className="plane">
                                <ol className="cabin fuselage">
                                    {[
                                        ...Array(
                                            detailFlight?.departureFlight
                                                ?.aeroplane?.maxRow
                                        ),
                                    ].map((_, rowIndex) => (
                                        <li
                                            key={rowIndex}
                                            className={`row row--${rowIndex + 1}`}
                                        >
                                            <ol className="seats" type="A">
                                                {detailFlight?.departureFlight?.seat
                                                    ?.filter(
                                                        (seat) =>
                                                            seat.row ===
                                                            rowIndex + 1
                                                    )
                                                    .sort(
                                                        (a, b) =>
                                                            a.column - b.column
                                                    )
                                                    .map((seat,colIndex) => (
                                                        <li
                                                            key={seat.id}
                                                            className="seat"
                                                            style={{
                                                                marginRight:
                                                                    colIndex +
                                                                        1 ===
                                                                    Math.floor(
                                                                        detailFlight
                                                                            ?.departureFlight
                                                                            ?.aeroplane
                                                                            ?.maxColumn /
                                                                            2
                                                                    )
                                                                        ? "14%"
                                                                        : "0px",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={seat.id}
                                                                checked={selectedSeats.includes(
                                                                    seat.id
                                                                )}
                                                                disabled={
                                                                    seat.status !==
                                                                        "AVAILABLE" ||
                                                                    (!selectedSeats.includes(
                                                                        seat.id
                                                                    ) &&
                                                                        selectedSeats.length >=
                                                                            totalPassengers)
                                                                }
                                                                onChange={() =>
                                                                    handleSeatSelection(
                                                                        seat.id
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    seat.id
                                                                }
                                                            >
                                                                {String.fromCharCode(
                                                                    64 +
                                                                        seat.column
                                                                )}
                                                                {seat.row}
                                                            </label>
                                                        </li>
                                                    ))}
                                            </ol>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {isSuccess && (
                <Card>
                    <Card.Body>
                        <h4>Pilih Kursi Penerbangan Kembali</h4>
                        <Card.Header
                            className="form-header"
                            style={{
                                backgroundColor: "#4978d0",
                                color: "#fff",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            <div className="class-seat">Bisnis Class</div>
                        </Card.Header>
                        <Row>
                            <Col lg={12} className="p-4">
                                <div className="plane">
                                    <ol className="cabin fuselage">
                                        {[
                                            ...Array(
                                                returnDetailFlight
                                                    ?.departureFlight?.aeroplane
                                                    ?.maxRow
                                            ),
                                        ].map((_, rowIndex) => (
                                            <li
                                                key={rowIndex}
                                                className={`row row--${rowIndex + 1}`}
                                            >
                                                <ol className="seats" type="A">
                                                    {returnDetailFlight?.departureFlight?.seat
                                                        ?.filter(
                                                            (seat) =>
                                                                seat.row ===
                                                                rowIndex + 1
                                                        )
                                                        .sort(
                                                            (a, b) =>
                                                                a.column -
                                                                b.column
                                                        )
                                                        .map((seat) => (
                                                            <li
                                                                key={seat.id}
                                                                className="seat"
                                                                style={{
                                                                    marginRight:
                                                                        rowIndex +
                                                                            1 ===
                                                                        Math.floor(
                                                                            returnDetailFlight
                                                                                ?.departureFlight
                                                                                ?.aeroplane
                                                                                ?.maxColumn /
                                                                                2
                                                                        )
                                                                            ? "30px"
                                                                            : "0px",
                                                                }}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id={seat.id}
                                                                    checked={selectedReturnSeats.includes(
                                                                        seat.id
                                                                    )}
                                                                    disabled={
                                                                        seat.status !==
                                                                            "AVAILABLE" ||
                                                                        (!selectedReturnSeats.includes(
                                                                            seat.id
                                                                        ) &&
                                                                            selectedReturnSeats.length >=
                                                                                totalPassengers)
                                                                    }
                                                                    onChange={() =>
                                                                        handleReturnSeatSelection(
                                                                            seat.id
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        seat.id
                                                                    }
                                                                >
                                                                    {String.fromCharCode(
                                                                        64 +
                                                                            seat.column
                                                                    )}
                                                                    {seat.row}
                                                                </label>
                                                            </li>
                                                        ))}
                                                </ol>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};

SeatPicker.propTypes = {
    selectedSeats: PropTypes.any,
    setSelectedSeats: PropTypes.any,
    totalPassengers: PropTypes.number,
    selectedReturnSeats: PropTypes.any,
    setSelectedReturnSeats: PropTypes.any,
};
export default SeatPicker;
