import * as React from 'react'
import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Row, Col, Container, Form, Button, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import tiketkuImage from '../assets/tiketku.png'

export const Route = createLazyFileRoute('/resetPassword')({
  component: resetPassword,
})

function resetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Row style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
        <Col md={6} style={{ overflow: "hidden", height: "100vh", position: "relative" }}
          className="d-none d-md-block">
          <img src={tiketkuImage} alt="Tiketku" 
          style={{ maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              position: "absolute",
              top: 0,
              left: 0,}} />
        </Col>
        <Col md={6}>
        <Form>
        <Container
            className="p-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100 m-lg-5 m-0">
              <h4 className="mb-3 fw-bold">Masuk</h4>
              <Form>
                <Form.Group as={Col} className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Contoh: johndoe@gmail.com"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-4" controlId="password">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label>Password</Form.Label>
                    <a href="#" className="text-decoration-none" style={{color: '#7126B5'}}>
                      <small>Lupa Kata Sandi</small>
                    </a>
                  </div>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#7126B5",
                      borderColor: "#7126B5",
                    }}
                    className="rounded-3"
                  >
                    Masuk
                  </Button>
                </div>
              </Form>
            </div>
        </Container>
        </Form>
        </Col>
      </Row>
    </>
  )
}
