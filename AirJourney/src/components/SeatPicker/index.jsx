import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./style.css";

const SeatPicker = ({ maxRow, maxCol }) => {
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
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        borderBottomLeftRadius: '4px',
                        borderBottomRightRadius: '4px',
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
                                {[...Array(maxRow)].map((_, row) => (
                                    <li key={row} className={`row row--${row + 1}`}>
                                        <ol className="seats">
                                            {/* Bagian kiri kursi */}
                                            {["1", "2", "3", "4", "5"]
                                                .slice(0, Math.ceil(maxCol / 2))
                                                .map((seat) => (
                                                    <li key={`L-${seat}`} className="seat">
                                                        <input type="checkbox" id={`${row + 1}${seat}`} />
                                                        <label htmlFor={`${row + 1}${seat}`}>
                                                            {row + 1}
                                                            -
                                                            {seat}
                                                        </label>
                                                    </li>
                                                ))}
                                            {/* Spacer untuk memisahkan kiri dan kanan */}
                                            <li className="aisle-space"></li>
                                            {/* Bagian kanan kursi */}
                                            {["6", "7", "8", "9", "10"]
                                                .slice(0, Math.floor(maxCol / 2))
                                                .map((seat) => (
                                                    <li key={`R-${seat}`} className="seat">
                                                        <input type="checkbox" id={`${row + 1}${seat}`} />
                                                        <label htmlFor={`${row + 1}${seat}`}>
                                                            {row + 1}
                                                            -
                                                            {seat}
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
    );
};

export default SeatPicker;
