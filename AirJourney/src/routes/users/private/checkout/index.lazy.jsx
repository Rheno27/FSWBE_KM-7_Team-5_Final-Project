import {useState,useEffect} from 'react';
import { createLazyFileRoute } from "@tanstack/react-router";
import { 
    Container, 
    Row, 
    Col, 
    Button ,
    Form,
    Card,

} from 'react-bootstrap';
import ProgressBar from '../../../../components/ProgresBar';
import SeatPicker from '../../../../components/SeatPicker';
import FlightDetails from '../../../../components/FlightDetails';
import { useNavigate } from "react-router-dom"; 
import { getUser } from '../../../../services/user';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';


export const Route = createLazyFileRoute('/users/private/checkout/')({
    component: Checkout,
});


function Checkout() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { passenger } = useSelector((state) => state.searchQuery);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
    });

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


    return (
        <>
            <Container className="checkout-page" style={{maxWidth:"1024px"}}>
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
                            <Card className="shadow-sm mb-4" key={index} style={{ borderRadius: '8px' }}>
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
                                                onChange={(e) => handleChange(index, 'title', e.target.value)}
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
                                                onChange={(e) => handleChange(index, 'fullName', e.target.value)}
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
                                                onChange={(e) => handleChange(index, 'familyName', e.target.value)}
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
                                                onChange={(e) => handleChange(index, 'birthDate', e.target.value)}
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
                                                onChange={(e) => handleChange(index, 'nationality', e.target.value)}
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
                                                KTP/Paspor
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => handleChange(index, 'passport', e.target.value)}
                                                placeholder="Masukkan KTP/Paspor"
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
                                                onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
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
                        <SeatPicker selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
                    </Col>

                    {/* Right Side: Detail Penerbangan */}
                    <Col lg={5}>
                        <FlightDetails />
                        <Button 
                            className="mt-3 w-100 mb-4"
                            style={{
                                backgroundColor: "#FF0000",
                                borderColor: "#FF0000",
                            }}
                            onClick={() => {navigate(`users/private/payment`);console.log(selectedSeats)}}
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