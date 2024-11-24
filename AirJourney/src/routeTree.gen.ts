/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const ResetPasswordLazyImport = createFileRoute('/reset-password')()
const RegisterLazyImport = createFileRoute('/register')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ResetPasswordLazyRoute = ResetPasswordLazyImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/reset-password.lazy').then((d) => d.Route))

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/register' | '/reset-password'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/register' | '/reset-password'
  id: '__root__' | '/' | '/login' | '/register' | '/reset-password'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/login",
        "/register",
        "/reset-password"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/reset-password": {
      "filePath": "reset-password.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
