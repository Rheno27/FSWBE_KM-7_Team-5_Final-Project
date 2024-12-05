import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/img/logoterbangin.png";
import Form from "react-bootstrap/Form";
import {
    Search as SearchIcon,
    History as HistoryIcon,
    NotificationsNone as NotificationIcon,
    PersonOutline as ProfileIcon,
    Login as LoginIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dummyData from "../../data/dummy.json";

const NavigationBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [showNotifications, setShowNotifications] = useState(false);

    const hideNavbarRoutes = [
        "/register",
        "/login",
        "/reset-password",
        "/reset-password-request",
        "/otp",
    ];
    const { data, isSuccess, isError } = useQuery({
        queryKey: ["user"],
        queryFn: async () =>
            await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        enabled: !!localStorage.getItem("token"),
    });

    
    // const handleLogout = useCallback(() => {
    //     localStorage.removeItem("token");
    //     dispatch(setToken(null));
    //     dispatch(setUser(null));
    // }, [dispatch]);


    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(data.data));
            dispatch(setToken(localStorage.getItem("token")));
        }
        if (isError) {
            navigate({ to: "/login" });
        }
    }, [isSuccess, isError, dispatch, data,user]);

    const notifications = dummyData.notification;

    const shuoldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    const handleMouseEnter = () => setShowNotifications(true);
    const handleMouseLeave = () => setShowNotifications(false);

    const onSubmit = async (e) => {
        e.preventDefault();
    };
    // const logout = (e) => {
    //     e.preventDefault();
    //     handleLogout();
    //     navigate({ to: "/login" });
    // };

    return (
        <>
            {shuoldShowNavbar && (
                <Navbar expand="lg" className="bg-white">
                    <Container fluid>
                        <Navbar.Brand href="#" style={{ marginLeft: "128px" }}>
                            <img src={logo} alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Form
                            className="d-flex"
                            style={{
                                position: "relative",
                                marginLeft: "34px",
                                width: "444px",
                            }}
                            onSubmit={onSubmit}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{
                                    borderRadius: "12px",
                                    paddingLeft: "20px",
                                }}
                            />
                            <SearchIcon
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "gray",
                                }}
                            />
                        </Form>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{ maxHeight: "100px" }}
                                navbarScroll
                            >
                                {user ? (
                                    <>
                                        <Nav.Link as={Link} to="/history">
                                            <HistoryIcon
                                                style={{ marginRight: "8px" }}
                                            />
                                        </Nav.Link>
                                         {/* Notifications Hover-to-Reveal */}
                                         <div
                                            style={{ position: "relative" }}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Nav.Link as={Link} to="/notification">
                                                <NotificationIcon
                                                    style={{ marginRight: "8px" }}
                                                />
                                            </Nav.Link>
                                            {showNotifications && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "100%",
                                                        right: 0,
                                                        backgroundColor: "white",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                        width: "300px",
                                                        zIndex: 1000,
                                                        maxHeight: "400px",
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {notifications.length > 0 ? (
                                                        notifications.map(
                                                            (notification) => (
                                                                <div
                                                                    key={notification.id}
                                                                    style={{
                                                                        padding: "10px 15px",
                                                                        borderBottom:
                                                                            "1px solid #eaeaea",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                        navigate({
                                                                            to: `/notification/${notification.id}`,
                                                                        })
                                                                    }
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                            fontWeight: "bold",
                                                                        }}
                                                                    >
                                                                        {notification.title}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                            fontSize: "12px",
                                                                            color: "#888",
                                                                        }}
                                                                    >
                                                                        {notification.message}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                            fontSize: "10px",
                                                                            color: "#aaa",
                                                                        }}
                                                                    >
                                                                        {new Date(
                                                                            notification.created_at
                                                                        ).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <p
                                                            style={{
                                                                padding: "10px 15px",
                                                                color: "#888",
                                                            }}
                                                        >
                                                            No notifications available
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <Nav.Link as={Link} to="/users/private/profile">
                                            <ProfileIcon
                                                style={{ marginRight: "8px" }}
                                            />
                                        </Nav.Link>
{/* 
                                        <button onClick={logout}>
                                            Log out
                                        </button> */}
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link
                                            variant="primary"
                                            style={{
                                                backgroundColor: "#7126B5",
                                                borderRadius: "12px",
                                                marginRight: "70px",
                                                color: "white",
                                            }}
                                            as={Link}
                                            to="/login"
                                        >
                                            <LoginIcon
                                                style={{ marginRight: "8px" }}
                                            />
                                            Masuk
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
        </>
    );
};

export default NavigationBar;
