import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavigationBar from "../components/Navbar";
import { Container } from "react-bootstrap";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';import { useLocation } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const location = useLocation();

    const hideNavbarRoutes = ["/register", "/login", "/reset-password", "/reset-password-request", "/otp"];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {shouldShowNavbar && (
            <NavigationBar />
            )}
            <Container> </Container>
            <Outlet />
            
            <ToastContainer limit={3} />
            <TanStackRouterDevtools />
        </>
    );
}
