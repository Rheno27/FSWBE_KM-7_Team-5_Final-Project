import React, { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { createLazyFileRoute } from '@tanstack/react-router'
import { Row, Col, Container, Form, Button, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import tiketkuImage from '../assets/img/tiketku.png'

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPassword,
})
 
function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // For password visibility option
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords tidak sesuai .");
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {
        token,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

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
          <Form onSubmit={handleSubmit}>
            <Container
              className="p-5 d-flex justify-content-center align-items-center"
              style={{ minHeight: '100vh' }}
            >
              <div className="w-100 m-lg-5 m-0">
                <h4 className="mb-3 fw-bold">Masuk</h4>
                <Form>
                <Form.Group as={Col} className="mb-2" controlId="newPassword">
                    <Form.Label>Masukkan Password Baru</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan password baru"
                        style={{fontSize:'14px', lineHeight: '2'}}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        onClick={togglePassword}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3" controlId="newPassword">
                    <Form.Label>Ulangi Password Baru</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Konfirmasi password baru"
                        style={{fontSize:'14px', lineHeight: '2'}}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <InputGroup.Text
                        onClick={togglePassword}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: '#7126B5',
                        borderColor: '#7126B5',
                        lineHeight: '1.7',
                        boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                      }}
                      className="rounded-3 mt-1"
                    >
                      Simpan
                    </Button>
                  </div>
                  <div className="text-center mt-3">
                      <span>
                          Sudah ingat password?{" "}
                          <a
                              href={`/login`}
                              style={{ color: "#7126B5", fontWeight: "bold" }}
                          >
                              Masuk sekarang
                          </a>
                      </span>
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
