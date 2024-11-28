import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import tiketkuImage from "../assets/img/tiketku.png";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/slices/auth";  

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Register mutation using react-query
  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();  // Read as text to check error
        throw new Error(errorText || "Registration failed");
      }
      
      try {
        const data = await response.json();  // Attempt to parse JSON
        return data;  // Return parsed data if successful
      } catch (e) {
        throw new Error("Invalid JSON response received");
      }
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user));  
      dispatch(setToken(data.token));  
      localStorage.setItem("user", data.user); 
      localStorage.setItem("token", data.token);  

      alert("Registration successful! Redirecting to login...");
      navigate({ to: "/login" }); 
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Form submission handler
  const onSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !phoneNumber || !password) {
      alert("Please fill in all fields");
      return;
    }

    const registrationData = {
      name,
      email,
      phoneNumber,
      password,
    };

    registerUser(registrationData);
  };

  return (
    <section style={{ height: "100vh", backgroundColor: "white" }}>
      <Row className="h-100 mx-auto gap-0">
        {/* Left Column with Image */}
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
            alt="Tiketku - Your Traveling Partner"
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </Col>

        {/* Right Column with Form */}
        <Col
          lg={6}
          md={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Form
            style={{
              width: "100%",
              maxWidth: "452px",
              padding: "20px",
            }}
            onSubmit={onSubmit}
          >
            <h4
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                textAlign: "left",
                marginBottom: "1rem",
              }}
            >
              Daftar
            </h4>

            {/* Name Input */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "16px" }}
              />
            </Form.Group>

            {/* Email Input */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contoh: johndee@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "16px" }}
              />
            </Form.Group>

            {/* Phone Number Input */}
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="tel"
                placeholder="+62"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ borderRadius: "16px" }}
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Buat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Buat Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "16px" }}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-100"
              disabled={isLoading}
              style={{
                backgroundColor: "#7126B5",
                borderColor: "#7126B5",
                borderRadius: "16px",
              }}
            >
              {isLoading ? "Mendaftar..." : "Daftar"}
            </Button>

            {/* Link to Login */}
            <div className="text-center mt-3">
              <p>
                Sudah punya akun?{" "}
                <Link to="/login" style={{ color: "#7126B5", fontWeight: "bold" }}>
                  Masuk di sini
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </section>
  );
}

