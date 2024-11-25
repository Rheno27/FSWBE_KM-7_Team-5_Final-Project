import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logo.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from '@tanstack/react-router';

const NavigationBar = () => {
    const location = useLocation();

    const hideNavbarRoutes = ["/register", "/login", "/reset-password", "/otp"];

    const shuoldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
    return (
        <>
            {shuoldShowNavbar && (
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container fluid>
                        <Navbar.Brand
                            href="#"
                            style={{ marginLeft: '128px' }}
                        >
                            <img src={logo} alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Form className="d-flex" style={{ position: 'relative', marginLeft: '34px', width: '444px' }}>
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
                        <Navbar.Collapse
                            id="navbarScroll"
                            style={{ marginRight: '150px' }}
                        >
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            ></Nav>
                            <Button
                                variant="primary"
                                style={{
                                    backgroundColor: '#7126B5',
                                    borderRadius: '12px',
                                }}
                                as={Link}
                                to="/login"
                            >
                                <LoginIcon
                                    style={{ marginRight: '8px' }}
                                />
                                Masuk
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
        </>
    );
};

export default NavigationBar;
