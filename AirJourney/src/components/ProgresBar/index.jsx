import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from '@tanstack/react-router'; 
import Countdown from 'react-countdown';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';

const ProgressBar = ({ children }) => {
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(1); 
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/users/private/checkout/') {
            setActiveStep(1);
        } else if (location.pathname === '/users/private/checkout/payment') {
            setActiveStep(2);
        } else if (location.pathname === '/users/private/checkout/success') {
            setActiveStep(3);
        }
    }, [location.pathname]); 

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            navigate({ to: `/` });
        } else {
            return (
                <div className="timer"
                style={{
                    backgroundColor: "#FF0000",
                    marginTop: "10px",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    color: "white",
                    marginBottom: "20px",
                    textAlign: "center",
                    position: "relative",
                    marginLeft: "20px",
                    marginRight: "20px",
                }}>                <div
                className="d-flex justify-content-center align-items-center"
                style={{
                width: "100%", // Memastikan elemen di dalam timer ikut penuh
            }}>
                Selesaikan dalam {hours}:{minutes}:{seconds}
                <br/>
                Jangan Keluar Dari Halaman Ini!
            </div></div>

                )
        }
        };

    return (
        <Container
            fluid
            className="pt-4 mb-4"
            style={{
                boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
                paddingLeft: "0",
                paddingRight: "0"
            }}
        >
            <div className="progress-bar">
                <div className="d-flex flex-column ">
                    <div className="progress-steps mb-2 d-flex flex-collum align-items-start mx-4 ">
                        <div
                            className="progress-step"
                            style={{
                                fontSize: "22px",
                                color: activeStep === 1 ? "bold" : "gray",
                                fontWeight: activeStep === 1 ? "bold" : "normal", 
                                marginRight: "10px",
                            }}
                        >
                            Isi Data Diri
                        </div>
                        <div className="arrow"
                        style={{
                            fontSize: "22px",
                            color: activeStep === 1 ? "bold" : "gray",
                            fontWeight: activeStep === 1 ? "bold" : "normal", 
                            marginRight: "10px",
                        }}
                        >
                        &gt;
                        </div>
                        <div 
                            className="progress-step"
                            style={{
                                fontSize: "22px",
                                color: activeStep === 2 ? "bold" : "gray",
                                fontWeight: activeStep === 2 ? "bold" : "normal", 
                                marginRight: "10px",
                                marginLeft: "10px",
                            }}
                        >
                            Bayar
                        </div> 
                        <div className="arrow"
                        style={{
                            fontSize: "22px",
                            color: activeStep === 2 ? "bold" : "gray",
                            fontWeight: activeStep === 2 ? "bold" : "normal", 
                            marginRight: "10px",
                        }}
                        >
                        &gt; 
                        </div>
                        <div 
                            className="progress-step"
                            style={{
                                fontSize: "22px",
                                color: activeStep === 3 ? "bold" : "gray",
                                fontWeight: activeStep === 3 ? "bold" : "normal", 
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        >
                            Selesai
                        </div>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <Countdown
                                date={Date.now() + 15*60*1000}
                                renderer={renderer}
                            />
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </Container>
    );
};




export default ProgressBar;
