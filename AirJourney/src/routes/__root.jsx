import { createRootRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from 'react-bootstrap/Container';
export const Route = createRootRoute({
    component: () => {
        const isAuthPage = useMatch("/login") || useMatch("/register");

    return (
        <>
            {isAuthPage ? (
                <Outlet />
            ) : (
                <Container>
                    <Outlet />
                </Container>
            )}
            <TanStackRouterDevtools />
        </>
    )
    },
});