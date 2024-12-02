import React, { useState, useEffect } from "react";
import { Link, useNavigate, createLazyFileRoute } from "@tanstack/react-router";

import { Row, Col, Form, Button} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import background from "../assets/img/login-illust.png"

import { useDispatch, useSelector} from "react-redux";
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
    const {token} = useSelector((state) => state.auth);

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
    
    const {mutate: loginUser} = useMutation({
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
    
        //hit api
        loginUser(body);
    }

    return (
        <section style={{ height: "100vh", backgroundColor: "white", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <Row className="h-100 mx-auto gap-0">
                <Col
                    lg={6}
                    md={12}
                    className="d-none d-lg-block p-0"
                    style={{
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    
                </Col>
                <Col
                    lg={6}
                    md={12}
                    className="d-flex flex-column align-items-center justify-content-center p-5"
                >
                    <Form
                        style={{
                            width: "100%",
                            maxWidth: "452px",
                            padding: "20px",
                        }}
                        className="bg-white bg-opacity-75 border-1 rounded-xl p-5 shadow-sm"
                        onSubmit={onSubmit}
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
                            Masuk
                        </h1>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Example: johndoe@gmail.com"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    borderRadius: "16px",
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Label>Password</Form.Label>
                                <a
                                    href={`/reset-password-request`}
                                    style={{
                                        fontSize: "0.875rem",
                                        fontWeight: "light",
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
                                        paddingRight: "3rem",
                                        borderRadius: "16px",
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
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </div>
                            </div>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="w-100"
                            style={{
                                backgroundColor: "#7126B5",
                                borderColor: "#7126B5",
                                borderRadius: "16px",
                            }}
                        >
                            Masuk
                        </Button>
                        <div className="text-center mt-3">
                            <span>
                                Don't have an account?{" "}
                                <Link to="/register" style={{ color: "#7126B5", fontWeight: "bold" }}>
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
