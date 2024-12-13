import { React, useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Thumbnail from '../../assets/img/Thumbnail.png';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getFlightByID } from '../../services/flight';


function FlightDetails({flightId, returnFlightId, passenger}) {
    const [flight, setFlight] = useState(null);

    const { data: detailFlight, isLoading, isError, error } = useQuery({
        queryKey: ['flight', flightId],
        queryFn: async () => {
            if (!flightId) {
                throw new Error('Flight ID not available');
            }
            const response = await getFlightByID(flightId);
            return response;
        },
        enabled: !!flightId,
        retry: 1,
    });

    const adultPrice = flight?.departureFlight?.price * passenger.adult;
    const childPrice = flight?.departureFlight?.price * passenger.child;
    const babyPrice = flight?.departureFlight?.price * passenger.baby;
    const tax = (adultPrice + babyPrice + childPrice) * 0.1;
    const totalPrice = adultPrice + babyPrice + childPrice + tax;

    useEffect(() => {
        if (detailFlight) {
            setFlight(detailFlight);
        }
    }, [detailFlight]);

    if (isLoading) return <div>Loading flight details...</div>;
    if (isError) return <div>Error: {error?.message}</div>;
    if (!flight) return <div>No flight data available</div>;

    return (
        <>
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
                            {flight?.departureFlight?.departureTime}
                        </div>
                        <div className="flight-details">
                            <div className="departure mb-3">
                            <div className="date">{flight?.departureFlight?.departureDate}</div>
                                <div className="airport">{flight?.departureFlight?.airportFrom?.name}</div>
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
                            {flight?.arrivalFlight?.airportTo?.name}
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
                            >{flight?.departureFlight?.airline?.name} - {flight?.departureFlight?.class}</div>
                            <div 
                                className="flight-number mb-4"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >{flight?.departureFlight?.airline?.code}</div>
                            
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
                            {flight?.departureFlight?.arrivalTime}
                        </div>
                        <div className="flight-details">
                            <div className="departure mb-2">
                            <div className="date">{flight?.departureFlight?.arrivalDate}</div>
                                <div className="airport">{flight?.departureFlight?.airportTo?.name}</div>
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
            </Card.Body>
        </Card>
        <Card className="mt-3">
            <Card.Body>
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
                            <div className="departure ">
                                <div className="passenger">{passenger.adult} Adult</div>
                                <div className="passenger">{passenger.child} Child</div>
                                <div className="passenger">{passenger.baby} Baby</div>
                                <div className="tax">Tax</div>
                            </div>  
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div 
                            className="priceadult"
                            style={{
                                marginTop: '30px',
                                marginLeft: '20px',
                            }}
                        >
                            Rp {adultPrice}
                        </div>
                            <div 
                                className="pricechild"
                                style={{
                                    marginLeft: '20px',
                                }}
                            >
                                Rp {childPrice}
                            </div>
                        <div 
                            className="pricebaby"
                            style={{
                                marginLeft: '20px',
                            }}
                        >
                            Rp {babyPrice}
                        </div>
                        <div className="tax"
                            style={{
                                marginLeft: '20px',
                            }}
                        >Rp {tax}</div>
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
                            Rp {totalPrice}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    );
}

export default FlightDetails;
