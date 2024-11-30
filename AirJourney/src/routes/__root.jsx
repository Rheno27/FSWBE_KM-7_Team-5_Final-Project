import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavigationBar from "../components/Navbar";
import { Container } from "react-bootstrap";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <NavigationBar />
            <Container> </Container>
            <Outlet />
            
            <ToastContainer limit={3} />
            <TanStackRouterDevtools />
        </>
    );
}
