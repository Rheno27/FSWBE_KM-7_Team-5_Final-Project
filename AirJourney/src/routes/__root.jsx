import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavigationBar from '../components/Navbar'
import { Container } from 'react-bootstrap'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'


export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const location = useLocation();

    const hideNavbarRoutes = ["/register", "/login", "/reset-password", "/otp"];
    const shuoldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (    
        <>
            {shuoldShowNavbar && (
            <NavigationBar />
            )}
            <Container> </Container>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}
