import React from 'react';
import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProgressBar from '../../../../components/ProgresBar';
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
            <ProgressBar />
            {/* Checkout Content */}
            <Row>
                {/* Left Side: Form Data Diri */}
                <Col lg={7}>
                    <OrderForm />
                    <PassengerForm />
                    <SeatPicker maxRow={45} maxCol={10} />
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