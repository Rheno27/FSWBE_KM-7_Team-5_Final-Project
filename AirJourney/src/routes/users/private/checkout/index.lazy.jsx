import React, { useState, useEffect } from 'react';
import { createLazyFileRoute } from "@tanstack/react-router";
import { 
    Container, 
    Row, 
    Col, 
    Button ,
    Form,
    Card,
} from 'react-bootstrap';
import Thumbnail from '../../../../assets/img/Thumbnail.png';
import "./style.css";
import ProgressBar from '../../../../components/ProgresBar';
import { useNavigate } from "react-router-dom"; 
import { getUser } from '../../../../services/user';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getFlightByID } from '../../../../services/flight';
import { createTransaction } from '../../../../services/transaction';

export const Route = createLazyFileRoute('/users/private/checkout/')({
    component: Checkout,
});

/*constoh data yg akan di post
    {
    "departureFlightId": "0193a5f2-1b37-7ab2-8afc-57a42ae7641c",
    "passengers": [
        {
        "birthday": "1990-01-15T00:00:00.000Z",
        "departureSeatId": "0193a5f2-1b41-7d83-94f8-c72eb672ad82",
        "expiredAt": "2030-01-15T00:00:00Z",
        "familyName": "Doe",
        "firstName": "John",
        "nationality": "Indonesia",
        "nikKtp": "3174012345678901",
        "nikPaspor": "P12345672",
        "returnSeatId": "0193a5f2-1b94-77b1-87e5-8b614648d3b3",
        "title": "Mr",
        "type": "ADULT"
        },
        {
        "birthday": "1990-01-15T00:00:00.000Z",
        "departureSeatId": "0193a5f2-1b41-7d83-94f8-c73c6ad6ee44",
        "expiredAt": "2030-01-15T00:00:00Z",
        "familyName": "Doe",
        "firstName": "John",
        "nationality": "Indonesia",
        "nikKtp": "3174012345678901",
        "nikPaspor": "P12345672",
        "returnSeatId": "0193a5f2-1b94-77b1-87e5-8b70415b327a",
        "title": "Mr",
        "type": "ADULT"
        }
    ],
    "returnFlightId": "0193a5f2-1b37-7ab2-8afc-57d700508d92"
}
*/

function Checkout() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { passenger } = useSelector((state) => state.searchQuery);
    const { flightId } = useSelector((state) => state.searchQuery);
    const { returnFlightId } = useSelector((state) => state.searchQuery);
    const [flight, setFlight] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [birthDay, setBirthDay] = useState("");
    const [departureSeat, setDepartureSeat] = useState("");
    const [expiredAt, setExpiredAt] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [nationality, setNationality] = useState("");
    const [nikKtp, setNikKtp] = useState("");
    const [nikPaspor, setNikPaspor] = useState("");
    const [returnSeat, setReturnSeat] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
    });

    const { data: detailFlight  } = useQuery({
        queryKey: ['flight', flightId],
        queryFn: async () => {
            const response = await getFlightByID(flightId);
            console.log("response", response);
            return response;
        },
        enabled: !!flightId,
        retry: 1,
    });

    const { mutate: postTransaction } = useMutation({
        mutationFn: (data) => createTransaction(data),
        onSuccess: () => {
            navigate(`users/private/payment`);
        },
        onError: (error) => {
            console.log("error", error);
            toast.error("Gagal membuat pemesanan");
        },
    });

    //passenger
    const totalPassengers = (passenger?.adult || 0) + (passenger?.child || 0) + (passenger?.baby || 0);
    const getPassengerType = (index) => {
        if (index < passenger?.adult) {
            return 'Adult';
        } else if (index < passenger?.adult + passenger?.child) {
            return 'Child';
        } else {
            return 'Baby';
        }
    };

    //seat
    const totalPassengerSeat = (passenger?.adult || 0) + (passenger?.child || 0);
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

    //price
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

    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            departureFlightId: flightId,
            passengers: [
                {
                    birthday: birthDay,
                    departureSeatId: selectedSeats[0],
                    expiredAt: expiredAt,
                    familyName: familyName,
                    firstName: firstName,
                    nationality: nationality,
                    nikKtp: nikKtp,
                    nikPaspor: nikPaspor,
                    returnSeatId: selectedSeats[1],
                    title: title,
                    type: type,
                }
            ],
            returnFlightId: returnFlightId,
        }
        console.log("data", data);
        postTransaction(data);
    };

    return (
        <>
            <Container className="checkout-page">
                {/* Progress Bar */}
                <ProgressBar />
                {/* Checkout Content */}
                <Row>
                    {/* Left Side: Form Data Diri */}
                    <Col lg={7}>
                        <Card className="shadow-sm mb-4" style={{ borderRadius: '8px' }}>
                            <Card.Body>
                                <h4>Isi Data Diri Pemesan</h4>
                                <div
                                    className="p-3 shadow-sm rounded mb-4"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                    }}
                                >
                                    {/* Header dengan styling inline */}
                                    <Card.Header
                                        className="form-header"
                                        style={{
                                            backgroundColor: '#333',
                                            color: '#fff',
                                            padding: '10px 15px',
                                            borderTopLeftRadius: '10px',
                                            borderTopRightRadius: '10px',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <div className="">Data Diri Pemesan</div>
                                    </Card.Header>

                                    {/* Nama Lengkap */}
                                    <Form.Group className="mt-3">
                                        <Form.Label
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                color: '#4B1979',
                                            }}
                                        >Nama Lengkap</Form.Label>
                                        <Form.Control
                                            value={user?.name}
                                            type="text"
                                            disabled
                                            placeholder="Masukkan Nama Lengkap"
                                            style={{
                                                borderRadius: '8px',
                                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                    </Form.Group>
                                    {/* Nomor Telepon */}
                                    <Form.Group className="mt-3">
                                        <Form.Label
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                color: '#4B1979',
                                            }}
                                        >Nomor Telepon</Form.Label>
                                        <Form.Control
                                            value={user?.phoneNumber}
                                            type="text"
                                            disabled
                                            placeholder="Masukkan Nomor Telepon"
                                            style={{
                                                borderRadius: '8px',
                                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mt-3">
                                        <Form.Label
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                color: '#4B1979',
                                            }}
                                        >Email</Form.Label>
                                        <Form.Control
                                            value={user?.email}
                                            type="email"
                                            disabled
                                            placeholder="Masukkan Email"
                                            style={{
                                                borderRadius: '8px',
                                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Passenger Form */}
                        {Array.from({ length: totalPassengers }).map((_, index) => (
                            <Card className="shadow-sm mb-4" style={{ borderRadius: '8px' }}>
                                <Card.Body>
                                    <h4>Data Diri Penumpang </h4>
                                    <div
                                        className="p-3 shadow-sm rounded mb-4"
                                        style={{
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <Card.Header
                                            className="form-header"
                                            style={{
                                                backgroundColor: '#333',
                                                color: '#fff',
                                                padding: '10px 15px',
                                                borderTopLeftRadius: '6px',
                                                borderTopRightRadius: '6px',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <div>Data Diri Penumpang {index + 1} - {getPassengerType(index)}</div>
                                        </Card.Header>

                                        {/* Title */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Title
                                            </Form.Label>
                                            <Form.Select
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            >
                                                <option value="Mr.">Mr.</option>
                                                <option value="Mrs.">Mrs.</option>
                                            </Form.Select>
                                        </Form.Group>

                                        {/* Nama Lengkap */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Nama Lengkap
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="Masukkan Nama Lengkap"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        {/* Nama Keluarga */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Nama Keluarga
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setFamilyName(e.target.value)}
                                                placeholder="Masukkan Nama Keluarga"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        {/* Tanggal Lahir */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Tanggal Lahir
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                onChange={(e) => setBirthDay(e.target.value)}
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        {/* Kewarganegaraan */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Kewarganegaraan
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setNationality(e.target.value)}
                                                placeholder="Masukkan Kewarganegaraan"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        {/* KTP/Paspor */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Nik KTP
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setNikKtp(e.target.value)}
                                                placeholder="Masukkan No. KTP"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        {/* Paspor */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                No. Paspor
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setNikPaspor(e.target.value)}
                                                placeholder="Masukkan No. Paspor"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        {/* Berlaku Sampai */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Berlaku Sampai
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                onChange={(e) => setExpiredAt(e.target.value)}
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                        {/* Seat Picker */}
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
                                                        .sort((a, b) => a.column - b.column) 
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
                    </Col>

                    {/* Right Side: Detail Penerbangan */}
                    <Col lg={5}>
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
                                            {detailFlight?.departureFlight?.departureTime}
                                        </div>
                                        <div className="flight-details">
                                            <div className="departure mb-3">
                                            <div className="date">{detailFlight?.departureFlight?.departureDate}</div>
                                                <div className="airport">{detailFlight?.departureFlight?.airportFrom?.name}</div>
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
                                            >{detailFlight?.departureFlight?.airline?.name} - {detailFlight?.departureFlight?.class}</div>
                                            <div 
                                                className="flight-number mb-4"
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                }}
                                            >{detailFlight?.departureFlight?.airline?.code}</div>
                                            
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
                                            {detailFlight?.arrivalFlight?.arrivalTime}
                                        </div>
                                        <div className="flight-details">
                                            <div className="departure mb-2">
                                            <div className="date">{detailFlight?.arrivalFlight?.arrivalDate}</div>
                                                <div className="airport">{detailFlight?.arrivalFlight?.airportTo?.name}</div>
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
                </Row>
            </Container>
        </>
    );
}

export default Checkout;