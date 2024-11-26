import React, { useState } from 'react';
import { createLazyFileRoute } from "@tanstack/react-router";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card
} from 'react-bootstrap';
// import ProgressBar from '../../../../components/ProgresBar';
import {
    ArrowBack as ArrowBackIcon
} from "@mui/icons-material";

export const Route = createLazyFileRoute('/users/private/checkout/')({
    component: Checkout,
});

function Checkout() {
    const [seatSelection, setSeatSelection] = useState(null);

    const handleSeatSelect = (seat) => {
        setSeatSelection(seat);
    };

    return (
        <Container className="">
        {/* Progress Bar */}
        <Container
                fluid
                className="pt-4 mb-4"
                style={{
                    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <div className="progress-bar">
                    <div className="d-flex flex-column align-items-start">
                        <div className="progress-steps mb-2">
                            <span className="">Isi Data Diri</span> &gt; <span className="text-dark">Bayar</span> &gt; <span className="text-dark">Selesai</span>
                        </div>
                        <div
                            className="timer bg-danger text-white px-3 py-2 rounded-pill mx-auto"
                            style={{
                                width: '100%',
                                marginBottom: '20px', // Tambahkan jarak di bawah tombol
                            }}
                        >
                            <div className="d-flex justify-content-center align-items-center">
                                Selesaikan dalam 00:15:00
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Checkout Content */}
            <Row>
                {/* Left Side: Form Data Diri */}
                <Col lg={8}>
                {/* Data Pemesan */}
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                    <h3 className="mb-4">Isi Data Pemesan</h3>
                    <Form>
                        <Form.Group controlId="fullName" className="mb-3">
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control type="text" placeholder="Nama Lengkap" />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group controlId="phoneNumber" className="mb-3">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control type="text" placeholder="Nomor Telepon" />
                        </Form.Group>
                    </Form>
                    </Card.Body>
                </Card>

                {/* Data Penumpang */}
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                    <h4>Data Penumpang</h4>
                    <div className="mt-3">
                        <h5>Data Penumpang 1 - Adult</h5>
                        <Form>
                        <Form.Group controlId="title1" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Select>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Miss</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="fullName1" className="mb-3">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control type="text" placeholder="Nama Lengkap" />
                        </Form.Group>
                        </Form>
                    </div>
                    </Card.Body>
                </Card>

                {/* Pemilihan Kursi */}
                <Card className="shadow-sm">
                    <Card.Body>
                    <h4 className="mb-3">Pilih Kursi</h4>
                    <div className="seat-selection-container">
                        <div className="seat-row">
                        <span>A</span>
                        <button
                            className={`seat-btn ${seatSelection === 'A1' ? 'selected' : 'available'}`}
                            onClick={() => handleSeatSelect('A1')}
                        >
                            1
                        </button>
                        <button className="seat-btn booked">X</button>
                        <button
                            className={`seat-btn ${seatSelection === 'A3' ? 'selected' : 'available'}`}
                            onClick={() => handleSeatSelect('A3')}
                        >
                            3
                        </button>
                        </div>
                        {/* Add more seat rows dynamically */}
                    </div>
                    </Card.Body>
                </Card>

                <Button variant="primary" type="submit" className="mt-4 w-100">
                    Lanjutkan Pembayaran
                </Button>
                </Col>

                {/* Right Side: Detail Penerbangan */}
                <Col lg={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                    <h4 className="mb-3">Detail Penerbangan</h4>
                    <div className="flight-info">
                        <p><strong>Keberangkatan:</strong> 07:00 - 3 Maret 2023</p>
                        <p>Bandara: Soekarno Hatta - Terminal IA Domestik</p>
                        <p>Maskapai: Jet Air - Economy</p>
                        <p><strong>Informasi:</strong> Baggage 20 kg, Cabin baggage 7 kg</p>
                        <p><strong>Kedatangan:</strong> 11:00 - 3 Maret 2023, Melbourne International Airport</p>
                    </div>

                    <hr />

                    <div className="price-details-box">
                        <h4 className="mb-3">Rincian Harga</h4>
                        <p>2 Adults: IDR 9.550.000</p>
                        <p>1 Baby: IDR 1.000.000</p>
                        <p>Tax: IDR 300.000</p>
                        <hr />
                        <p><strong>Total: IDR 9.850.000</strong></p>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout;
