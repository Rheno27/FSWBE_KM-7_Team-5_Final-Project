import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logoterbangin.png';
import Form from 'react-bootstrap/Form';
import { 
    Search as SearchIcon,
    History as HistoryIcon,
    PersonOutline as ProfileIcon,
    Login as LoginIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";
import axios from "axios";
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
    const { data: user, isSuccess, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        enabled: !!token,
        onSuccess: (data) => dispatch(setUser(data.data)),
        onError: () => {
            dispatch(setUser(null));
            dispatch(setToken(null));
            navigate({ to: "/login" });
        },
    });

    const shuoldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password
        }
        const result = await login(body);
        if (result.success) {
            dispatch(setUser(result.data.token));
            navigate("/");
            return;
        }
        alert(result.message);
    }

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
                            style={{ position: 'relative', marginLeft: '34px', width: '444px' }}
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
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                {user ? (
                                    <>
                                        <Nav.Link
                                            as={Link}
                                            to="/history"
                                        >
                                            <HistoryIcon
                                                style={{ marginRight: '8px' }}
                                            />
                                        </Nav.Link>
                                        <NotificationDropdown 
                                            as={Link}
                                            to="/notification"/>
                                        <Nav.Link as={Link} to="/users/private/profile/id">
                                            <ProfileIcon
                                                style={{ marginRight: '8px' }}
                                            />
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link
                                            variant="primary"
                                            style={{
                                                backgroundColor: '#7126B5',
                                                borderRadius: '12px',
                                                marginRight: '70px',
                                                color: 'white',
                                            }}
                                            as={Link}
                                            to="/login"
                                        >
                                            <LoginIcon
                                                style={{ marginRight: '8px' }}
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
