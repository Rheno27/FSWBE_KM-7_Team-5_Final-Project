import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/img/logo.png';
import Form from 'react-bootstrap/Form';
import { 
    Search as SearchIcon,
    History as HistoryIcon,
    NotificationsNone as NotificationIcon,
    PersonOutline as ProfileIcon,
    Login as LoginIcon, 
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth"; 
import { toast } from "react-toastify";

const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const location = useLocation();

    const hideNavbarRoutes = ["/register", "/login", "/reset-password", "/otp"];

    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            dispatch(setUser(null));
            dispatch(setToken(null)); 

            localStorage.removeItem("token");

            toast.success("Logged out successfully.", { position: "bottom-center" });

            navigate("/login");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password,
        };
        const result = await login(body);
        if (result.success) {
            dispatch(setUser(result.data.token));
            dispatch(setToken(result.data.token)); 
            navigate("/");
            return;
        }
        alert(result.message);
    };

    return (
        <>
            {shouldShowNavbar && (
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container fluid>
                        <Navbar.Brand
                            href="#"
                            style={{ marginLeft: '128px' }}
                        >
                            <img src={logo} alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Form
                            className="d-flex"
                            style={{ position: 'relative', marginLeft: '34px', width: '444px' }}
                            onSubmit={onSubmit}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{
                                    borderRadius: '12px',
                                    paddingLeft: '20px',
                                }}
                            />
                            <SearchIcon
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'gray',
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
                                        <Nav.Link
                                            as={Link}
                                            to="/notification"
                                        >
                                            <NotificationIcon
                                                style={{ marginRight: '8px' }}
                                            />
                                        </Nav.Link>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="link"
                                                id="dropdown-profile"
                                                className="nav-link"
                                            >
                                                <ProfileIcon
                                                    style={{ marginRight: '8px' }}
                                                />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/profile"
                                                >
                                                    Profile
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={handleLogout}
                                                    style={{ color: "red" }}
                                                >
                                                    <LogoutIcon
                                                        style={{
                                                            marginRight: '8px',
                                                        }}
                                                    />
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
