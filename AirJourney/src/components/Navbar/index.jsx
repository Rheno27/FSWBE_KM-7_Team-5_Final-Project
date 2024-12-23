import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/img/logoterbangin.png";
import Form from "react-bootstrap/Form";
import {
    Search as SearchIcon,
    History as HistoryIcon,
    PersonOutline as ProfileIcon,
    Login as LoginIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { setUser, setToken } from "../../redux/slices/auth";;
=======
import { setUser, setToken } from "../../redux/slices/auth";
>>>>>>> 00dbf076d15f86d4fbee782414cbc135cdfb6229
import NotificationDropdown from "../Notification/dropdown";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user";

const NavigationBar = () => {
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    const hideNavbarRoutes = [
        "/register",
        "/login",
        "/reset-password",
        "/reset-password-request",
        "/otp",
    ];
    const {
        data: user,
        isSuccess,
        isError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        enabled: !!token,
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(user.data));
            return;
        }
        if (isError) {
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.removeItem("token");
            return;
        }
    }, [isSuccess, isError]);
<<<<<<< HEAD
    const shuoldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
=======

    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
>>>>>>> 00dbf076d15f86d4fbee782414cbc135cdfb6229

    return (
        <>
            {shouldShowNavbar && (
                <Navbar expand="lg" className="bg-white">
                    <Container fluid>
<<<<<<< HEAD
                        <Navbar.Brand href="/" style={{ marginLeft: "128px" }}>
                            <img src={logo} alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Form
                            className="d-flex"
                            style={{
                                position: "relative",
                                marginLeft: "34px",
                                width: "444px",
=======
                        <div className="d-flex align-items-center w-100">
                            <Navbar.Brand
                                as={Link}
                                to="/"
                                className="d-flex align-items-center"
                                style={{ marginLeft: window.innerWidth < 768 ? "16px" : "128px" }}
                            >
                                <img src={logo} alt="logo" style={{ maxHeight: "40px" }} />
                            </Navbar.Brand>

                            <Form
                                className="d-none d-md-flex ms-3"
                                style={{ position: "relative", width: "300px" }}
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

                            <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
                        </div>

                        <Navbar.Collapse
                            id="navbarScroll"
                            style={{
                                maxHeight: "none",
                                overflow: "visible", 
                                flexDirection: "column", 
                                alignItems: "start",
                                paddingLeft: "16px", 
                                marginRight: "60px",
                            }}
                        >
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{
                                    width: "100%", 
                                }}
                                navbarScroll
                            >
                                {user && token ? (
                                    <>
                                        <Nav.Link
                                            as={Link}
                                            to="users/private/order-history/"
                                            style={{
                                                display: "flex", 
                                                alignItems: "center",
                                                marginBottom: "8px", 
                                            }}
                                        >
                                            <HistoryIcon style={{ marginRight: "8px" }} />
                                            <span className="d-md-none">History</span>
                                        </Nav.Link>
                                        <NotificationDropdown />
                                        <Nav.Link
                                            as={Link}
                                            to="/users/private/profile/"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            <ProfileIcon style={{ marginRight: "8px" }} />
                                            <span className="d-md-none">Profile</span>
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link
                                        variant="primary"
                                        style={{
                                            backgroundColor: "#7126B5",
                                            borderRadius: "12px",
                                            marginRight: "16px",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        as={Link}
                                        to="/login"
                                    >
                                        <LoginIcon style={{ marginRight: "8px" }} />
                                        Masuk
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>


                        <Form
                            className="d-flex d-md-none mt-3"
                            style={{
                                position: "relative",
                                width: "100%",
>>>>>>> 00dbf076d15f86d4fbee782414cbc135cdfb6229
                            }}
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
<<<<<<< HEAD
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{ maxHeight: "100px" }}
                                navbarScroll
                            >
                                {(user && token) ? (
                                    <>
                                        <Nav.Link
                                            as={Link}
                                            to="users/private/order-history/"
                                        >
                                            <HistoryIcon
                                                style={{ marginRight: "8px" }}
                                            />
                                        </Nav.Link>
                                        <NotificationDropdown />
                                        <Nav.Link
                                            as={Link}
                                            to="/users/private/profile/"
                                        >
                                            <ProfileIcon
                                                style={{ marginRight: "8px" }}
                                            />
                                        </Nav.Link>
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
=======
>>>>>>> 00dbf076d15f86d4fbee782414cbc135cdfb6229
                    </Container>
                </Navbar>
            )}
        </>
    );
};

export default NavigationBar;
