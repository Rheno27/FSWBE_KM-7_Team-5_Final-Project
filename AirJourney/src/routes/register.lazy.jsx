import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import tiketkuImage from "../assets/img/tiketku.png";

export const Route = createLazyFileRoute("/register")({
    component: Register,
});

function Register() {
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [password, setPassword] = useState("");


  const onSubmit = (event) => {
    event.preventDefault();

    const isSuccess = true;

    if (isSuccess) {
      navigate({ to: "/otp"});
  } 
};

   return (
    <section style={{ height: "100vh", backgroundColor: "white" }}>
    <Row className="h-100 mx-auto gap-0">
    <Col lg={6} md={12} className="d-none d-lg-block p-0" style={{ position: "relative",overflow: "hidden" }}>
      <img
        src={tiketkuImage}
        alt="Tiketku - Your Traveling Partner"
        style={{ maxWidth: "100%", height: "100vh", objectFit: "cover" }}
      />
    </Col>
      <Col lg={6} md={12} className="d-flex align-items-center justify-content-center">
        <Card className="w-75 border-0" style={{ height: "70%" }} >
          <Card.Body>
            <Form style={{  width: "100%", maxWidth: "452px", padding: "20px" }} onSubmit={onSubmit}>
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

              <div className="d-grid">
                <Button 
                  onClick={() => navigate({ to: "/otp" })}
                  type="submit" 
                  variant="primary" 
                  style={{ backgroundColor: "#7126B5", borderColor: "#7126B5", borderRadius: "16px", }}>
                  Daftar
                </Button>
              </div>

              <p className="text-center mt-3">
                Sudah punya akun?{" "}
                <Link to="/login" style={{ color: "#7126B5", fontWeight: "bold" }}>
                  Masuk di sini
                </Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </section>
  );
}