import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { createLazyFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { Row, Col, Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import tiketkuImage from '../assets/img/tiketku.png';

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    toast.warning("Token is missing or invalid.", {
      position: "top-center",
    });
    return;
  }

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  let validationUrl = `${import.meta.env.VITE_API_URL}/auth/reset-password/validate/${token}`;
  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password`;

  // Validate token
  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsLoading(true); 
        const response = await axios.get(validationUrl);

        if (response.status === 200) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          toast.error("Token has expired or is invalid");
        }

      } catch (error) {
        setIsTokenValid(false);
        toast.error(error.response?.data?.message || "An unexpected error occured");

      } finally {
        setIsLoading(false); // Set loading to false after validation
      }
    };

    if (token) validateToken();
  }, [token, validationUrl]);

  // For password visibility option
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTokenValid) {
      toast.error("The token is invalid or expired.");
      return; 
    }
  
    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }
  
    try {
      // Send both the token and the newPassword in the request body
      const response = await axios.post(url, {
        token,        
        newPassword,  
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      toast.success('Password reset successfully. Redirecting to login...');
      setTimeout(() => navigate({ to: "/login" }), 3000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage); 
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
            }}
          />
        </Col>
        <Col md={6} className={{position: 'relative'}}>
          <Container
            className="p-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            {isLoading ? (
                <p>Validating token, please wait...</p>
              ) : (
            <div className="w-100 m-lg-5 m-0">
              <h4 className="mb-3 fw-bold">Reset Password</h4>
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
                  <Form.Group as={Col} className="mb-3" controlId="newPassword">
                    <Form.Label>Masukkan password baru</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan password baru"
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
                  <Form.Group as={Col} className="mb-2" controlId="confirmPassword">
                    <Form.Label>Ulangi password baru</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ulangi password baru"
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
                        backgroundColor: isTokenValid ? '#7126B5' : '#bfa0d7',
                        borderColor: isTokenValid ? '#7126B5' : '#bfa0d7',
                        borderRadius: '10px',
                        marginTop: '1rem',
                        lineHeight: '1.7',
                        boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                      }}
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
                 {!isTokenValid && (
                  <div className="text-center text-danger mt-5">
                    <span>{message}. {" "}<a href={`/reset-password-request`} style={{ color: "#7126B5" }}>
                      Please try again
                    </a></span>
                  </div>
                )}
              
            </div>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
}
