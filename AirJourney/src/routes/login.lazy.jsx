import React, { useState, useEffect } from "react";
import { Link, useNavigate, createLazyFileRoute } from "@tanstack/react-router";

import { Row, Col, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import background from "../assets/img/login-illust.png";

import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/login")({
    component: Login,
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State untuk menampilkan password
    const [showPassword, setShowPassword] = useState(false);

    // Fungsi untuk toggle password visibility
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (token) {
            navigate({ to: "/" });
        }
    }, [token, navigate]);

    const { mutate: loginUser } = useMutation({
        mutationFn: (body) => {
            return login(body);
        },
        onSuccess: (data) => {
            dispatch(setToken(data?.token));
            navigate({ to: "/" });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        const body = {
            email,
            password,
        };

        // hit api
        loginUser(body);
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
            <Row className="h-100 mx-auto">
                {/* Left Side */}
                <Col
                    lg={6}
                    md={12}
                    className="d-none d-lg-block p-0"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                ></Col>

                {/* Right Side */}
                <Col
                    lg={6}
                    md={12}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    <Form
                        style={{
                            width: "100%",
                            maxWidth: "452px",
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            borderRadius: "16px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            padding: "1.5rem",
                            margin: "0 auto",
                        }}
                        onSubmit={onSubmit}
                    >
                        <h1
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: "bold",
                                fontFamily: "Poppins, sans-serif",
                                textAlign: "left",
                                marginBottom: "1rem",
                            }}
                        >
                            Masuk
                        </h1>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label style={{ fontSize: "1rem" }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Example: johndoe@gmail.com"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    borderRadius: "16px",
                                    padding: "0.75rem",
                                    fontSize: "0.9rem",
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Form.Label style={{ fontSize: "1rem" }}>Password</Form.Label>
                                <a
                                    href="/reset-password-request"
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "400",
                                        color: "#7126B5",
                                        textDecoration: "none",
                                    }}
                                >
                                    Forget password
                                </a>
                            </div>
                            <div style={{ position: "relative" }}>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        borderRadius: "16px",
                                        padding: "0.75rem 2.5rem 0.75rem 1rem",
                                        fontSize: "0.9rem",
                                    }}
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
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </Form.Group>
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: "#7126B5",
                                borderColor: "#7126B5",
                                borderRadius: "16px",
                                padding: "0.75rem",
                                fontSize: "1rem",
                            }}
                            className="w-100"
                        >
                            Masuk
                        </Button>
                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                            <span style={{ fontSize: "0.9rem" }}>
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    style={{
                                        color: "#7126B5",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                    }}
                                >
                                    Register here
                                </Link>
                            </span>
                        </div>
                    </Form>
                </Col>
            </Row>
        </section>
    );
}
