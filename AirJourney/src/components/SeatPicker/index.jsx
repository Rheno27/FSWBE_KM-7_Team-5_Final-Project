import { React, useState } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import "./style.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getFlightByID } from "../../services/flight";

const SeatPicker = () => {
    const { flightId } = useSelector((state) => state.searchQuery);
    const { passenger } = useSelector((state) => state.searchQuery);
    const [selectedSeats, setSelectedSeats] = useState([]);

    console.log("passenger", passenger);

    const { data: detailFlight, isLoading, isError, error } = useQuery({
        queryKey: ['flight', flightId],
        queryFn: async () => {
            const response = await getFlightByID(flightId);
            return response;
        },
        enabled: !!flightId,
        retry: 1,
    });

    const totalPassengers = (passenger?.adult || 0) + (passenger?.child || 0);

    console.log("totalPassengers", totalPassengers);

    const handleSeatSelection = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            // Deselect seat
            setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
        } else if (selectedSeats.length < totalPassengers) {
            // Select seat if limit is not reached
            setSelectedSeats((prev) => [...prev, seatId]);
        }
    };

    console.log("selectedSeats", selectedSeats);
    console.log("seat", detailFlight?.departureFlight?.seat);

    return (
        <Card>
            <Card.Body>
                <h4>Pilih Kursi</h4>
                <Card.Header
                    className="form-header"
                    style={{
                        backgroundColor: '#4978d0',
                        color: '#fff',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    <div className="class-seat">Bisnis Class</div>
                </Card.Header>
                <Row>
                    <Col lg={12} className="p-4">
                        <div className="plane">
                            <ol className="cabin fuselage">
                                {[...Array(detailFlight?.departureFlight?.aeroplane?.maxRow)].map((_, rowIndex) => (
                                <li key={rowIndex} className={`row row--${rowIndex + 1}`}>
                                    <ol className="seats" type="A">
                                    {detailFlight?.departureFlight?.seat
                                        ?.filter((seat) => seat.row === rowIndex + 1)
                                        .sort((a, b) => a.column - b.column) // Pastikan kursi diurutkan berdasarkan kolom
                                        .map((seat) => (
                                        <li key={seat.id} className="seat">
                                            <input
                                            type="checkbox"
                                            id={seat.id}
                                            checked={selectedSeats.includes(seat.id)}
                                            disabled={seat.status !== "AVAILABLE" || (!selectedSeats.includes(seat.id) && selectedSeats.length >= totalPassengers)}
                                            onChange={() => handleSeatSelection(seat.id)}
                                            />
                                            <label htmlFor={seat.id}>{String.fromCharCode(64 + seat.column)}{seat.row}</label>
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
    );
};

export default SeatPicker;