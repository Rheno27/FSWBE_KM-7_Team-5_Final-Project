import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import background from "../assets/img/login-illust.png";
import { resetPassword } from "../services/auth";
import { navigateWithTimeout } from "../utils/navigationUtils";

export const Route = createLazyFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // Input fields state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  // Password validation state
  const [passwordValid, setPasswordValid] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const ID_VALIDATION_ERROR = "validation-error"; // Toast ID for validation error
  const RESET_PASSWORD_SUCCESS = "reset-password-success"; // Toast ID for successful reset password
  const UNKNOWN_ERROR = "unknown-error"; // Toast ID for unknown error

  // Check if token is present
  useEffect(() => {
    if (!token) {
      toast.error("Token tidak ditemukan. Mohon buat permintaan baru");
      navigateWithTimeout(navigate, "/reset-password-request", 4000);
    }
  }, [token]);

  // Reset password token validation
  useEffect(() => {
    const validationUrl = `${import.meta.env.VITE_API_URL}/auth/reset-password/validate/${token}`;
    const validateToken = async () => {
      try {
        setIsLoading(true);
        // Use validateStatus to prevent Axios from throwing an error for non-2xx responses
        const response = await axios.get(validationUrl, {
          validateStatus: (status) => status < 500, // Only throw for server errors
        });

        if (response.status === 200) {
          setIsTokenValid(true);
        } else if (response.status === 400) {
          setIsTokenValid(false);
          if (!toast.isActive(ID_VALIDATION_ERROR)) {
            toast.error(
              "Token kadaluwarsa atau tidak valid. Mengembalikan...",
              {
                toastId: ID_VALIDATION_ERROR,
              }
            );
          }
          navigateWithTimeout(navigate, "/reset-password-request", 4000);
        }
      } catch (error) {
        setIsTokenValid(false);
        if (!toast.isActive(UNKNOWN_ERROR)) {
          toast.error("Terjadi kesalahan yang tidak diketahui", {
            toastId: UNKNOWN_ERROR,
          });
        }
        navigateWithTimeout(navigate, "/", 4000);
      } finally {
        setIsLoading(false); // Set loading to false after validation
      }
    };

    if (token) validateToken();

    // Cleanup to avoid memory leaks or redundant API calls
    return () => setIsLoading(false);
  }, [token, navigate]);

  // Update password mutation
  const { mutate: savePassword, isPending } = useMutation({
    mutationFn: (data) => {
      return resetPassword(data);
    },
    onSuccess: (response) => {
      if (!toast.isActive(RESET_PASSWORD_SUCCESS)) {
        toast.success("Reset sandi berhasil. Mengarahkan ke homepage...", {
          toastId: RESET_PASSWORD_SUCCESS,
        });
      }

      setTimeout(() => setIsTokenValid(false), 5000);
      navigateWithTimeout(navigate, "/", 4000);
    },

    onError: (error) => {
      if (error.response?.status === 503) {
        toast.error("Layanan tidak tersedia. Silahkan coba lagi nanti.");
      } else {
        toast.error(error.message || "Terjadi kesalahan yang tidak diketahui");
        navigateWithTimeout(navigate, "/", 4000);
      }
    },
  });

  // For password visibility option
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTokenValid) {
      toast.error("Token kadaluarsa atau tidak valid.");
      return;
    }

    // Basic password validation checks
    const validatePassword = () => {
      if (newPassword.length < 6) {
        return "Password harus minimal 6 karakter.";
      }
      if (newPassword !== confirmPassword) {
        return "Password tidak sesuai.";
      }
      return null;
    };

    const passwordError = validatePassword();
    if (passwordError) {
      toast.warn(passwordError);
      return;
    }

    // If password is valid, proceed with form submission
    setPasswordValid(true);
    setMessage("");

    const data = {
      token,
      newPassword,
    };

    savePassword(data);
  };

  return (
    <section
      style={{
        height: "100vh",
        backgroundColor: "white",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        closeOnClick
        draggable
      />
      <Row className="h-100 mx-auto gap-0">
        <Col
          lg={6}
          md={12}
          className="d-none d-lg-block p-0"
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        ></Col>

        {/* Right column with form */}
        <Col
          lg={6}
          md={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          {isLoading ? (
            <p className="p-3 bg-light bg-opacity-75 border-2 shadow-sm rounded">
              Memvalidasi token, silahkan tunggu...
            </p>
          ) : (
            <Form
              style={{
                width: "100%",
                maxWidth: "452px",
                padding: "20px",
              }}
              className="bg-white bg-opacity-75 border-1 rounded-xl p-5 shadow-sm"
              onSubmit={handleSubmit}
            >
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
                Reset Sandi
              </h1>

              {/* New password form field */}
              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label>Masukkan Sandi Baru</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      borderRadius: "16px",
                      marginTop: "4px",
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
                <Form.Label>Ulangi Sandi Baru</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ulangi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      borderRadius: "16px",
                      marginTop: "4px",
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
                <span>*Sandi harus terdiri dari setidaknya 6 karakter.</span>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-100"
                disabled={isPending}
                style={{
                  backgroundColor: isTokenValid ? "#7126B5" : "#bfa0d7",
                  borderColor: isTokenValid ? "#7126B5" : "#bfa0d7",
                  borderRadius: "16px",
                  boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>

              {/* Back to login link */}
              <div className="text-center mt-3">
                <span>
                  Sudah ingat sandi?{" "}
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
                    {message || "Token sudah kadaluarsa atau tidak valid"}.{" "}
                    <br />
                    <Link
                      to={`/reset-password-request`}
                      style={{ color: "#7126B5" }}
                    >
                      Silahkan coba lagi
                    </Link>
                  </span>
                </div>
              )}
              {/* Display error messages */}
              {message && (
                <Container>
                  <p style={{ color: "red", paddingTop: "5px" }}>{message}</p>
                </Container>
              )}
            </Form>
          )}
        </Col>
      </Row>
    </section>
  );
}
