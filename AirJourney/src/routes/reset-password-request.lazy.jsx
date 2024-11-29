import React, { useState } from 'react'
import axios from 'axios'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import tiketkuImage from '../assets/img/tiketku.png'

export const Route = createLazyFileRoute('/reset-password-request')({
  component: ResetRequest,
})

function ResetRequest() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password/request`;

  const mutation = useMutation({
    mutationFn: (email) => axios.post(url, { email }, { headers: { 'Content-Type': 'application/json' }}),
    onSuccess: (response) => {
      setMessage(response.data.message) // Handle success
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || 'An error occurred.') // Handle error
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutation.mutate(email)
    // Placeholder for submit logic; nothing happens for now
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
              top: 0,
              left: 0,
            }}
          />
        </Col>
        <Col md={6}>
            <Container
              className="p-5 d-flex justify-content-center align-items-center"
              style={{ minHeight: '100vh' }}
            >
              <div className="w-100 m-lg-5 m-0">
                <h4 className="mb-4 fw-bold">Lupa Password</h4>
                <Form onSubmit={handleSubmit}>
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
                            // boxShadow: '2px 2px 18px 1px rgba(0, 0, 0, 0.2)',
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
                          style={{
                            backgroundColor: '#7126B5',
                            borderColor: '#7126B5',
                            borderRadius: '15px',
                            lineHeight: '1.7',
                            marginTop: '0.8rem',
                            boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                          }}
                          disabled={mutation.isLoading}
                        >
                          {mutation.isLoading
                            ? 'Mengirim...'
                            : 'Kirim Permintaan'}
                        </Button>
                        {mutation.isError && (
                          <p>Error: {mutation.error.message}</p>
                        )}
                        {mutation.isSuccess && <p>{message}</p>}
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
