import React from 'react';
import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Row, Col, Button } from 'react-bootstrap';
import OrderForm from '../../../../components/OrderForm';
import PassengerForm from '../../../../components/PassengerForm';
import SeatPicker from '../../../../components/SeatPicker';
import FlightDetails from '../../../../components/FlightDetails';

export const Route = createLazyFileRoute('/users/private/checkout/')({
    component: Checkout,
});

function Checkout() {
    return (
        <Container className="checkout-page">
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
                            <span>Isi Data Diri</span> &gt; <span>Bayar</span> &gt; <span>Selesai</span>
                        </div>
                        <div className="timer bg-danger text-white px-3 py-2 rounded-pill mx-auto">
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
                <Col lg={7}>
                    <OrderForm />
                    <PassengerForm />
                    <SeatPicker />
                    <Button 
                        className="mt-3 w-100 mb-4"
                        style={{
                            backgroundColor: "#7126B5",
                            borderColor: "##7126B5",
                        }}
                    >
                        Simpan Data
                    </Button>
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
                    >
                        Lanjutkan Pembayaran
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout;
