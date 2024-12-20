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
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";;
import NotificationDropdown from "../Notification/dropdown";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/user";

const NavigationBar = () => {
    const navigate = useNavigate();
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
    const shuoldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {shuoldShowNavbar && (
                <Navbar expand="lg" className="bg-white">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/" style={{ marginLeft: "128px" }}>
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
                    </Container>
                </Navbar>
            )}
        </>
    );
};

export default NavigationBar;
