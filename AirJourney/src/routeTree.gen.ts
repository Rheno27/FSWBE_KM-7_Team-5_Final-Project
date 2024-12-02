/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsersPrivateProfileIndexImport } from './routes/users/private/profile/index'

// Create Virtual Routes

const ResetPasswordRequestLazyImport = createFileRoute(
  '/reset-password-request',
)()
const ResetPasswordLazyImport = createFileRoute('/reset-password')()
const RegisterLazyImport = createFileRoute('/register')()
const OtpLazyImport = createFileRoute('/otp')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()
const UsersPublicDetailPenerbanganLazyImport = createFileRoute(
  '/users/public/detailPenerbangan',
)()
const UsersPrivateCheckoutIndexLazyImport = createFileRoute(
  '/users/private/checkout/',
)()

// Create/Update Routes

const ResetPasswordRequestLazyRoute = ResetPasswordRequestLazyImport.update({
  id: '/reset-password-request',
  path: '/reset-password-request',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reset-password-request.lazy').then((d) => d.Route),
)

const ResetPasswordLazyRoute = ResetPasswordLazyImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reset-password.lazy').then((d) => d.Route),
)

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const OtpLazyRoute = OtpLazyImport.update({
  id: '/otp',
  path: '/otp',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/otp.lazy').then((d) => d.Route))

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

const UsersPublicDetailPenerbanganLazyRoute =
  UsersPublicDetailPenerbanganLazyImport.update({
    id: '/users/public/detailPenerbangan',
    path: '/users/public/detailPenerbangan',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/users/public/detailPenerbangan.lazy').then((d) => d.Route),
  )

const UsersPrivateCheckoutIndexLazyRoute =
  UsersPrivateCheckoutIndexLazyImport.update({
    id: '/users/private/checkout/',
    path: '/users/private/checkout/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/users/private/checkout/index.lazy').then((d) => d.Route),
  )

const UsersPrivateProfileIndexRoute = UsersPrivateProfileIndexImport.update({
  id: '/users/private/profile/',
  path: '/users/private/profile/',
  getParentRoute: () => rootRoute,
} as any)

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
    '/otp': {
      id: '/otp'
      path: '/otp'
      fullPath: '/otp'
      preLoaderRoute: typeof OtpLazyImport
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
    '/reset-password-request': {
      id: '/reset-password-request'
      path: '/reset-password-request'
      fullPath: '/reset-password-request'
      preLoaderRoute: typeof ResetPasswordRequestLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/public/detailPenerbangan': {
      id: '/users/public/detailPenerbangan'
      path: '/users/public/detailPenerbangan'
      fullPath: '/users/public/detailPenerbangan'
      preLoaderRoute: typeof UsersPublicDetailPenerbanganLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/private/profile/': {
      id: '/users/private/profile/'
      path: '/users/private/profile'
      fullPath: '/users/private/profile'
      preLoaderRoute: typeof UsersPrivateProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/private/checkout/': {
      id: '/users/private/checkout/'
      path: '/users/private/checkout'
      fullPath: '/users/private/checkout'
      preLoaderRoute: typeof UsersPrivateCheckoutIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/reset-password-request': typeof ResetPasswordRequestLazyRoute
  '/users/public/detailPenerbangan': typeof UsersPublicDetailPenerbanganLazyRoute
  '/users/private/profile': typeof UsersPrivateProfileIndexRoute
  '/users/private/checkout': typeof UsersPrivateCheckoutIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/reset-password-request': typeof ResetPasswordRequestLazyRoute
  '/users/public/detailPenerbangan': typeof UsersPublicDetailPenerbanganLazyRoute
  '/users/private/profile': typeof UsersPrivateProfileIndexRoute
  '/users/private/checkout': typeof UsersPrivateCheckoutIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/reset-password-request': typeof ResetPasswordRequestLazyRoute
  '/users/public/detailPenerbangan': typeof UsersPublicDetailPenerbanganLazyRoute
  '/users/private/profile/': typeof UsersPrivateProfileIndexRoute
  '/users/private/checkout/': typeof UsersPrivateCheckoutIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/otp'
    | '/register'
    | '/reset-password'
    | '/reset-password-request'
    | '/users/public/detailPenerbangan'
    | '/users/private/profile'
    | '/users/private/checkout'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/otp'
    | '/register'
    | '/reset-password'
    | '/reset-password-request'
    | '/users/public/detailPenerbangan'
    | '/users/private/profile'
    | '/users/private/checkout'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/otp'
    | '/register'
    | '/reset-password'
    | '/reset-password-request'
    | '/users/public/detailPenerbangan'
    | '/users/private/profile/'
    | '/users/private/checkout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  OtpLazyRoute: typeof OtpLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  ResetPasswordRequestLazyRoute: typeof ResetPasswordRequestLazyRoute
  UsersPublicDetailPenerbanganLazyRoute: typeof UsersPublicDetailPenerbanganLazyRoute
  UsersPrivateProfileIndexRoute: typeof UsersPrivateProfileIndexRoute
  UsersPrivateCheckoutIndexLazyRoute: typeof UsersPrivateCheckoutIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  OtpLazyRoute: OtpLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  ResetPasswordRequestLazyRoute: ResetPasswordRequestLazyRoute,
  UsersPublicDetailPenerbanganLazyRoute: UsersPublicDetailPenerbanganLazyRoute,
  UsersPrivateProfileIndexRoute: UsersPrivateProfileIndexRoute,
  UsersPrivateCheckoutIndexLazyRoute: UsersPrivateCheckoutIndexLazyRoute,
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
        "/otp",
        "/register",
        "/reset-password",
        "/reset-password-request",
        "/users/public/detailPenerbangan",
        "/users/private/profile/",
        "/users/private/checkout/"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/otp": {
      "filePath": "otp.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/reset-password": {
      "filePath": "reset-password.lazy.jsx"
    },
    "/reset-password-request": {
      "filePath": "reset-password-request.lazy.jsx"
    },
    "/users/public/detailPenerbangan": {
      "filePath": "users/public/detailPenerbangan.lazy.jsx"
    },
    "/users/private/profile/": {
      "filePath": "users/private/profile/index.jsx"
    },
    "/users/private/checkout/": {
      "filePath": "users/private/checkout/index.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
