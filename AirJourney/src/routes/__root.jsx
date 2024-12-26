import * as React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavigationBar from "../components/Navbar";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {

    return (    
        <>
            <NavigationBar />
            <Outlet />
            <ToastContainer limit={3} />
            {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
        </>
    );
}
