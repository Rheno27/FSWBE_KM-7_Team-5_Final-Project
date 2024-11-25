import { createRootRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from 'react-bootstrap/Container';
import NavigationBar from '../components/Navbar';
import { useLocation } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (    
        <>
            <NavigationBar />
            <Container> </Container>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}
