import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { createLazyFileRoute, useNavigate, Link } from '@tanstack/react-router'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import tiketkuImage from '../assets/img/tiketku.png';

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get token from url
  const token = searchParams.get("token");

  if (!token) {
    toast.error("Token is missing. Please try new request", {
      position: "top-center",
    });
    return;
  }

  // Input fields state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 

  // Password validation state
  const [passwordValid, setPasswordValid] = useState(true);

  // Password visibility option state
  const [showPassword, setShowPassword] = useState(false);

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
 
  let validationUrl = `${import.meta.env.VITE_API_URL}/auth/reset-password/validate/${token}`;
  let url = `${import.meta.env.VITE_API_URL}/auth/reset-password`;

  // Token validation
  useEffect(() => {
    const validateToken = async () => {
      try {
        setIsLoading(true); 
        const response = await axios.get(validationUrl);

        if (response.status === 200) {
          setIsTokenValid(true);
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

   // Update password mutation
   const { mutate: savePassword, isPending } = useMutation({
    mutationFn: async (email) => 
      await axios.post(
        url, 
        { token, newPassword }, 
        { headers: { 'Content-Type': 'application/json' }}
      ),

    onSuccess: (response) => {
      toast.success('Password reset successfull. Redirecting to login page...', {
        autoClose: 4000, 
      });
      setTimeout(() => navigate({ to: "/login" }), 4000);
    },

    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error('Your email was not found in our records.', { 
          autoClose: 3000,
        });
      } else {
        toast.error(error.response?.data?.message || "An error occurred.")
      }
    },
  })

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTokenValid) {
      toast.error("The token has expired or is invalid.");
      return; 
    }
  
    // Basic password validation checks
    const validatePassword = () => {
      if (newPassword.length < 8 || !/\d/.test(newPassword)) {
        return "Password must be at least 8 characters long and a number.";
      }
  
      if (newPassword !== confirmPassword) {
        return "Passwords do not match.";
      }
  
      return null;
    }
  
    const passwordError = validatePassword();
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // If password is valid, proceed with form submission
    setPasswordValid(true)
    setMessage("");
    savePassword(token, newPassword)
  };  

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
        {isLoading ? (
          <p>Validating token, please wait...</p>
        ) : (
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
                  Reset Password
              </h1>

              {/* New password form field */}
              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label>Masukkan Password Baru</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    name='newPassword'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ 
                      borderRadius: "16px",
                      marginTop: "4px" 
                    }}
                    required
                  />
                  <div
                      style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                      }}
                      onClick={togglePassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
              </Form.Group>

              {/* Confirm new password form field */}
              <Form.Group controlId="confirmPassword">
                <Form.Label>Ulangi Password Baru</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    name='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ulangi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ 
                      borderRadius: "16px",
                      marginTop: "4px" 
                    }}
                    required
                  />
                  <div
                      style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                      }}
                      onClick={togglePassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
              </Form.Group>
              <div className="text-muted mb-4 mt-2">
                <span>* At least 8 characters long and a number</span>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-100"
                disabled={isPending}
                style={{
                  backgroundColor: isTokenValid ? '#7126B5' : '#bfa0d7',
                  borderColor: isTokenValid ? '#7126B5' : '#bfa0d7',
                  borderRadius: "16px",
                  boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                }}
              >
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>

              {/* Back to login link */}
              <div className="text-center mt-3">
                <span>
                  Sudah ingat password?{" "}
                  <Link
                    to={`/login`}
                    style={{ color: "#7126B5", fontWeight: "bold" }}
                  >
                    Masuk sekarang
                  </Link>
                </span>
              </div>

              {/* Invalid token response message */}
              {!isTokenValid && (
                <div className="text-center text-danger mt-5">
                  <span>
                    {message || "Token has expired or is invalid"}. {" "}
                    <Link 
                      to={`/reset-password-request`} 
                      style={{ color: "#7126B5" }}>
                      Please try again
                    </Link>
                  </span>
                </div>
              )}
              {/* Display error messages */}
              {message && <p style={{ color: "red", paddingTop: "5px" }}>{message}</p>}
          </Form>
        )}
        </Col>
      </Row>
    </section>
  );
}
