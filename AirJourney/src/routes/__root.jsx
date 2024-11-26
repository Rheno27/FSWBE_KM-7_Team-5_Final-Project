import * as React from 'react'
import { Outlet, createRootRoute} from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from 'react-bootstrap/Container'
import NavigationBar from "../components/Navbar"

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (    
        <>
            <NavigationBar />
            <Container> </Container>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}
