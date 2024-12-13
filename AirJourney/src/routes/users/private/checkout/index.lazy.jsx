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

function Checkout() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { passenger } = useSelector((state) => state.searchQuery);
    const { flightId } = useSelector((state) => state.searchQuery);
    const { returnFlightId } = useSelector((state) => state.searchQuery);
    const [flight, setFlight] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [birthDays, setBirthDays] = useState([]);
    const [expiredAt, setExpiredAt] = useState([]);
    const [familyNames, setFamilyNames] = useState([]);
    const [firstNames, setFirstNames] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [identityNumbers, setIdentityNumbers] = useState([]);
    const [originCountries, setOriginCountries] = useState([]);
    const [title, setTitle] = useState("");
    const [passengerTypes, setPassengerTypes] = useState([]);

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
            navigate({to: `/users/private/payment`});
        },
        onError: (error) => {
            console.log("error", error);
            toast.error("Gagal membuat pemesanan");
        },
    });

    //passenger
    const totalPassengers = (passenger?.ADULT || 0) + (passenger?.CHILD || 0) + (passenger?.INFANT || 0);
    const getPassengerType = (index) => {
        if (index < passenger?.ADULT) {
            return 'ADULT';
        } else if (index < passenger?.ADULT + passenger?.CHILD) {
            return 'CHILD';
        } else {
            return 'INFANT';
        }
    };
    
    useEffect(() => {
        if (passenger) {
            const total = (passenger?.ADULT || 0) + (passenger?.CHILD || 0) + (passenger?.INFANT || 0);
            setBirthDays(Array(total).fill(""));
            setFamilyNames(Array(total).fill(""));
            setFirstNames(Array(total).fill(""));
            setNationalities(Array(total).fill(""));
            setIdentityNumbers(Array(total).fill(""));
            setOriginCountries(Array(total).fill(""));
            setPassengerTypes(Array(total).fill("")); // assuming default type
        }
    }, [passenger]);


    //seat
    const totalPassengerSeat = (passenger?.ADULT || 0) + (passenger?.CHILD || 0);
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
    const adultPrice = detailFlight?.departureFlight?.price * passenger.ADULT;
    const childPrice = detailFlight?.departureFlight?.price * passenger.CHILD;
    const infantPrice = detailFlight?.departureFlight?.price * passenger.INFANT;
    const tax = (adultPrice + infantPrice + childPrice) * 0.1;
    const totalPrice = adultPrice + infantPrice + childPrice + tax;

    const handleInputChange = (index, field, value) => {
        if (field === 'birthday') {
            setBirthDays(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'familyName') {
            setFamilyNames(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'firstName') {
            setFirstNames(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'nationality') {
            setNationalities(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'identityNumber') {
            setIdentityNumbers(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'expiredAt') {
            setExpiredAt(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'originCountry') {
            setOriginCountries(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        } else if (field === 'passengerType') {
            setPassengerTypes(prev => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
            });
        }
    };

    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const passengers = Array.from({ length: totalPassengers }).map((_, index) => {
            const passenger = {
                birthday: birthDays[index] || "",
                departureSeatId: selectedSeats[index],
                expiredAt: expiredAt[index] || "",
                familyName: familyNames[index] || "",
                firstName: firstNames[index] || "",
                nationality: nationalities[index] || "",
                identityNumber: identityNumbers[index] || "",
                originCountry: originCountries[index] || "",
                title: title || "",
                type: passengerTypes[index] || getPassengerType(index),
            };
            if (returnFlightId && selectedSeats[index + 1]) {
                passenger.returnSeatId = selectedSeats[index + 1];
            }
            return passenger;
        });
        const data = {
            departureFlightId: flightId,
            passengers,
        };
        if (returnFlightId) {
            data.returnFlightId = returnFlightId;
        }
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
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                    console.log("Selected Title:", e.target.value); // Debugging
                                                }}
                                                placeholder="Pilih Title"
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            >
                                                <option disabled value="" >Pilih Title</option>
                                                <option value="Mr">Mr.</option>
                                                <option value="Mrs">Mrs.</option>
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
                                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
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
                                                onChange={(e) => handleInputChange(index, 'familyName', e.target.value)}
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
                                                onChange={(e) => handleInputChange(index, 'birthday', e.target.value)}
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
                                                onChange={(e) => handleInputChange(index, 'nationality', e.target.value)}
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
                                                No. KTP/Paspor
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => handleInputChange(index, 'identityNumber', e.target.value)}
                                                placeholder="Masukkan No. KTP/Paspor"
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
                                                onChange={(e) => handleInputChange(index, 'expiredAt', e.target.value)}
                                                style={{
                                                    borderRadius: '8px',
                                                    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </Form.Group>

                                        
                                        {/* origin country */}
                                        <Form.Group className="mt-3">
                                            <Form.Label
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: '#4B1979',
                                                }}
                                            >
                                                Asal Negara
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => handleInputChange(index, 'originCountry', e.target.value)}
                                                placeholder="Masukkan Asal Negara"
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
                                                <div className="passenger">{passenger.ADULT} Adult</div>
                                                <div className="passenger">{passenger.CHILD} Child</div>
                                                <div className="passenger">{passenger.INFANT} Infant</div>
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
                                            Rp {infantPrice}
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