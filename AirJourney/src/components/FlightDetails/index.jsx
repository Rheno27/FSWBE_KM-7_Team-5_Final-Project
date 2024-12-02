import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Thumbnail from '../../assets/img/thumbnail.png';

function FlightDetails() {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h3 className="mb-3">Detail Penerbangan</h3>
                <Row>
                    <Col lg={6}>
                        <div 
                            className="time"
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            07:00
                        </div>
                        <div className="flight-details">
                            <div className="departure mb-3">
                            <div className="date">3 Maret 2023</div>
                                <div className="airport">Soekarno Hatta <br /> Terminal 1A Domestik</div>
                            </div>  
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div 
                            className="keberangkatan"
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                                textAlign: 'right',
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
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img src={Thumbnail} alt="Flight" />
                        </div>
                    </Col>
                    <Col lg={10}>
                        <div className="flight-info mb-3">
                            <div className="airline"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >Jet Air - Economy</div>
                            <div 
                                className="flight-number mb-4"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >JT - 203</div>
                            
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
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            11:00
                        </div>
                        <div className="flight-details">
                            <div className="departure mb-3">
                            <div className="date">3 Maret 2023</div>
                                <div className="airport">Melbourne International Airport</div>
                            </div>  
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div 
                            className="keberangkatan"
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                                textAlign: 'right',
                            }}
                        >
                            Kedatangan
                        </div>
                    </Col>
                </Row>

                <hr />

                {/* Price Details Section */}
                <Row>
                    <Col lg={8}>
                        <div 
                            className="time"
                            style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            Rincian Harga
                        </div>
                        <div className="flight-details">
                            <div className="departure mb-3">
                                <div className="passenger">1 Adult</div>
                                <div className="tax">Tax</div>
                            </div>  
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div 
                            className="price"
                            style={{
                                marginTop: '30px',
                            }}
                        >
                            Rp 1.000.000
                        </div>
                        <div className="tax">Rp 100.000</div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col lg={8}>
                        <div 
                            className="time"
                            style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                            }}
                        >
                            Total Harga
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div 
                            className="total-price"
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#4B1979',
                                textAlign: 'right',
                            }}
                        >
                            Rp 1.100.000
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default FlightDetails;
