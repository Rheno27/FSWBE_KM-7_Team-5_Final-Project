import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavigationBar from '../components/Navbar'
import { Container } from 'react-bootstrap'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'


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
