import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer, toast } from "react-toastify";
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import tiketkuImage from '../assets/img/tiketku.png'

export const Route = createLazyFileRoute('/reset-password-request')({
  component: ResetRequest,
})

function ResetRequest() {
  const [email, setEmail] = useState('');

  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password/request`;

  const mutation = useMutation({
    mutationFn: (email) => 
      axios.post(url, { email }, { headers: { 'Content-Type': 'application/json' }}),

    onSuccess: (response) => {
      console.log('Response Message:', response.data?.message);
      toast.success(response.data?.message || 'Reset link was sent successfully!.', {
        autoClose: 3000, 
      });
    },

    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error('Your email was not found in our records.', { 
          autoClose: 3000,
        });
      } 
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutation.mutate(email)
    console.log('submit')
  }
  
  return (
    <>
      <Row style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
        <Col
          md={6}
          style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}
          className="d-none d-md-block"
        >
          <img
            src={tiketkuImage}
            alt="Tiketku"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              position: 'absolute',
            }}
          />
        </Col>
        <Col md={6} style={{position:'relative'}}>
            <Container
              className="p-5 d-flex justify-content-center align-items-center"
              style={{ minHeight: '100vh' }}
            >
              <div className="w-100 m-lg-5 m-0">
                <h4 className="mb-4 fw-bold">Lupa Password</h4>
                <Form onSubmit={handleSubmit}>
                <ToastContainer
                  position="bottom-center"
                  style={{
                    position: 'absolute', 
                    bottom: 10,          
                    right: '10%',          
                    zIndex: 9999       
                  }}
                />
                  <Form.Group as={Col} className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Contoh: johndoe@gmail.com"
                      style={{
                        fontSize: '14px',
                        lineHeight: '2',
                        borderRadius: '15px',
                      }}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <div className="d-grid">
                        <Button
                          as={Link}
                          href={`/login`}
                          style={{
                            backgroundColor: 'white',
                            borderColor: '#7126B5',
                            borderRadius: '15px',
                            lineHeight: '1.7',
                            color: '#7126B5',
                            marginTop: '0.8rem',
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
                          onClick={() => mutation.mutate()}
                          style={{
                            backgroundColor: '#7126B5',
                            borderColor: '#7126B5',
                            borderRadius: '15px',
                            lineHeight: '1.7',
                            marginTop: '0.8rem',
                            boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          Kirim Permintaan
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Container>
        </Col>
      </Row>
    </>
  )
}
