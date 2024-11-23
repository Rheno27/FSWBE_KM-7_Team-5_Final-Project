import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                            Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/forgot-password">
                            forgot-password
                            </Nav.Link>
                            <Nav.Link as={Link} to="/otp">
                            otp
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
            </Container>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});