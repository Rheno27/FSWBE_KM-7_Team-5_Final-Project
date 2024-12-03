import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./style.css";

const SeatPicker = () => {
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
                                {[...Array(20)].map((_, row) => (
                                    <li key={row} className={`row row--${row + 1}`}>
                                        <ol className="seats" type="A">
                                            {["A", "B", "C", "D", "E", "F"].map((seat) => (
                                                <li key={seat} className="seat">
                                                    <input type="checkbox" id={`${row + 1}${seat}`} />
                                                    <label htmlFor={`${row + 1}${seat}`}>
                                                        {row + 1}
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
