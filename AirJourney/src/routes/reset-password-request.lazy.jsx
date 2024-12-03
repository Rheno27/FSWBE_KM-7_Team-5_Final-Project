import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import tiketkuImage from '../assets/img/tiketku.png';

export const Route = createLazyFileRoute('/reset-password-request')({
  component: ResetRequest,
})

function ResetRequest() {
  // Form input state
  const [email, setEmail] = useState('');

  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password/request`;

  // Mutation for sending request link through email
  const { mutate: sendRequest, isPending } = useMutation({
    mutationFn: async (email) => 
      await axios.post(
        url, 
        { email }, 
        { headers: { 'Content-Type': 'application/json' }}
      ),

    onSuccess: (response) => {
      toast.success('Reset link was sent successfully! Please check your email', {
        autoClose: 3000, 
      });
    },

    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error('Your email was not found in our records.', { 
          autoClose: 3000,
        });
      } else {
        toast.error('An unexpected error occured')
      }
    },
  })
  // End of mutation

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    sendRequest(email)
  }
  
  return (
    <section style={{ height: "100vh", backgroundColor: "white" }}>
      <Row className="h-100 mx-auto gap-0">
        
        {/* Left column with image */}
        <Col
            lg={6}
            md={12}
            className="d-none d-lg-block p-0"
            style={{
                position: "relative",
                overflow: "hidden",
            }}
        >
          <img
              src={tiketkuImage}
              alt="tiketku"
              style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
              }}
          />
        </Col>
        {/* End of left column */}

        {/* Right column with form */}
        <Col
            lg={6}
            md={12}
            style={{position:'relative'}}
            className="d-flex flex-column align-items-center justify-content-center"
        >
          <Form
              style={{
                  width: "100%",
                  maxWidth: "452px",
                  padding: "20px",
              }}
              onSubmit={handleSubmit}
          >
            {/* ToastContainer for response message */}
            <ToastContainer
              position="bottom-center"
              style={{
                position: 'absolute', 
                bottom: 10,          
                right: '10%',          
                zIndex: 9999       
              }}
            />
            {/* End of toast */}

              <h1
                  className="mb-4"
                  style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "left",
                      marginBottom: "1rem",
                  }}
              >
                  Lupa Password
              </h1>

              {/* Email form field */}
              <Form.Group controlId="email" className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      name="email"
                      type="email"
                      placeholder="Contoh: johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        borderRadius: "16px",
                        marginTop: "4px"
                      }}
                      required
                  />
              </Form.Group>

              {/* Buttons */}
              <Row>
                <Col md={6}>
                  <div className="d-grid">
                    <Button
                      as={Link}
                      href={`/login`}
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#7126B5',
                        borderRadius: '16px',
                        color: '#7126B5',
                        boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      Kembali ke Login
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-grid">
                    <Button
                      type="submit"
                      disabled={isPending}
                      style={{
                        backgroundColor: '#7126B5',
                        borderColor: '#7126B5',
                        borderRadius: '16px',
                        boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {isPending ? "Mengirim..." : "Kirim Permintaan"}
                    </Button>
                  </div>
                </Col>
              </Row>
          </Form>
        </Col>
      </Row>
    </section>
  )
}
