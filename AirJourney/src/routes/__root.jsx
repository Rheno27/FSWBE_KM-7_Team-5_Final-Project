import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavigationBar from "../components/Navbar";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {

const hideNavbar = ["/register", "/login", "/reset-password", "/reset-password-request", "/otp"];
const showNavbar = !hideNavbar.includes(window.location.pathname);

    return (    
        <>
            {showNavbar && (
                <NavigationBar />
            )}
            <Outlet />
            <ToastContainer limit={3} />
            {import.meta.env.MODE == "development" && <TanStackRouterDevtools />}
        </>
    );
}
