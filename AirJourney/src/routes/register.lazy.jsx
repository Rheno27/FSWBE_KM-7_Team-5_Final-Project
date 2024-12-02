import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import tiketkuImage from "../assets/img/tiketku.png";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const showToast = (type, message, isLoading = false, id = null) => {
    if (isLoading) {
      return toast.loading(message, { position: "bottom-center" });
    }
    toast.update(id, {
      render: message,
      type,
      autoClose: 3000,
      isLoading: false,
    });
  };

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const toastId = showToast("info", "Processing registration...", true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const resData = response.data.data;

        showToast("success", "Registration successful! Redirecting to OTP...", false, toastId);
        dispatch(setUser(resData));
        navigate({ to: "/otp" });
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data?.message || "Registration failed."
          : "Network error. Please try again later.";
        showToast("error", errorMessage, false, toastId);
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const { name, email, phoneNumber, password } = formData;

    if (!name || !email || !phoneNumber || !password) {
      toast.warn("Please fill in all fields", { position: "bottom-center" });
      return;
    }

    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long", { position: "bottom-center" });
      return;
    }

    registerUser(formData);
  };
  
  return (
    <section style={{ height: "100vh", backgroundColor: "white" }}>
      <Row className="h-100 mx-auto gap-0">
        <Col
          lg={6}
          md={12}
          className="d-none d-lg-block p-0"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            src={tiketkuImage}
            alt="Tiketku - Your Traveling Partner"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </Col>

        <Col
          lg={6}
          md={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Form
            style={{ width: "100%", maxWidth: "452px", padding: "20px" }}
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

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ borderRadius: "16px" }}
                aria-label="Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contoh: johndee@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ borderRadius: "16px" }}
                aria-label="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="tel"
                placeholder="+62"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={{ borderRadius: "16px" }}
                aria-label="Phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Buat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Buat Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ borderRadius: "16px" }}
                aria-label="Password"
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={isPending}
              style={{
                backgroundColor: "#7126B5",
                borderColor: "#7126B5",
                borderRadius: "16px",
              }}
            >
              {isPending ? "Mendaftar..." : "Daftar"}
            </Button>

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
