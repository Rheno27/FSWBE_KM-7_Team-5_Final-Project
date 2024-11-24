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
      navigate({ to: "/"});
  } 
};

   return (
    <Row className="g-0" style={{ height: "100vh", overflow: "hidden" }}>
    <Col md={6} className="p-0">
      <img
        src={tiketkuImage}
        alt="Tiketku - Your Traveling Partner"
        className="img-fluid h-100 w-100"
        style={{ objectFit: "cover" }}
      />
    </Col>
      <Col md={6} className="d-flex align-items-center justify-content-center bg-white">
        <Card className="w-75 border-0" style={{ height: "70%" }} >
          <Card.Body>
            <h4 className=" fw-bold mb-4">Daftar</h4>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="primary" style={{ backgroundColor: "#7126B5", borderColor: "#7126B5" }}>
                  Daftar
                </Button>
              </div>

              <p className="text-center mt-3">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-decoration-none text-purple">
                  Masuk di sini
                </Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}