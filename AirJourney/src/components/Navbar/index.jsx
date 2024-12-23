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
import { setUser, setToken } from "../../redux/slices/auth";
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

    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {shouldShowNavbar && (
                <Navbar expand="lg" className="bg-white">
                    <Container fluid>
                        <div className="d-flex align-items-center w-100">
                            <Navbar.Brand
                                as={Link}
                                to="/"
                                className="d-flex align-items-center"
                                style={{ marginLeft: window.innerWidth < 768 ? "16px" : "128px" }}
                            >
                                <img src={logo} alt="logo" style={{ maxHeight: "40px" }} />
                            </Navbar.Brand>

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
                                            <span className="d-md-none">Riwayat</span>
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
                                            <span className="d-md-none">Profil</span>
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
                    </Container>
                </Navbar>
            )}
        </>
    );
};

export default NavigationBar;
