import React, { useState } from 'react';
import axios from 'axios'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useSearchParams } from "react-router-dom";
import { Row, Col, Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import tiketkuImage from '../assets/img/tiketku.png';

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPassword,
});

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log("Extracted Token:", token);

  if (!token) {
    return <p>Invalid or missing token!</p>;
  }

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password`;

  // For password visibility option
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    try {
      // Send both the token and the newPassword in the request body
      const response = await axios.post(url, {
        token,        // Include the token from the URL (extracted with useSearchParams)
        newPassword,  // Send the new password from the state
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
      setMessage(response.data.message); // Update UI with success message
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred.";
      setMessage(errorMessage); // Update UI with error message
      console.error('Password update error:', error); // Log error for debugging
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
          <Container
            className="p-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <div className="w-100 m-lg-5 m-0">
              <h4 className="mb-3 fw-bold">Reset Password</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className="mb-2" controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      style={{ fontSize: '14px', lineHeight: '2' }}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      style={{ fontSize: '14px', lineHeight: '2' }}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={togglePassword} style={{ cursor: 'pointer' }}>
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
                    Save
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <span>
                    Sudah ingat password?{" "}
                    <a
                      href={`/login`}
                      style={{ color: "#7126B5", fontWeight: "bold" }}
                    >
                      Login now
                    </a>
                  </span>
                </div>
              </Form>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
