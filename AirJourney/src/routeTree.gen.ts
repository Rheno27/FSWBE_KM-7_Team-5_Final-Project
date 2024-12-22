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

const ResetPasswordRequestLazyImport = createFileRoute(
  '/reset-password-request',
)()
const ResetPasswordLazyImport = createFileRoute('/reset-password')()
const RegisterLazyImport = createFileRoute('/register')()
const OtpLazyImport = createFileRoute('/otp')()
const NotificationLazyImport = createFileRoute('/notification')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()
const UsersPublicDetailPenerbanganLazyImport = createFileRoute(
  '/users/public/detailPenerbangan',
)()
const UsersPrivateGoogleAuthLazyImport = createFileRoute(
  '/users/private/googleAuth',
)()
const UsersPrivateProfileIndexLazyImport = createFileRoute(
  '/users/private/profile/',
)()
const UsersPrivateOrderHistoryIndexLazyImport = createFileRoute(
  '/users/private/order-history/',
)()
const UsersPrivateCheckoutIndexLazyImport = createFileRoute(
  '/users/private/checkout/',
)()
const UsersPrivatePaymentSuccessLazyImport = createFileRoute(
  '/users/private/payment/success',
)()
const UsersPrivatePaymentIdLazyImport = createFileRoute(
  '/users/private/payment/$id',
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

const NotificationLazyRoute = NotificationLazyImport.update({
  id: '/notification',
  path: '/notification',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notification.lazy').then((d) => d.Route))

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

const UsersPrivateGoogleAuthLazyRoute = UsersPrivateGoogleAuthLazyImport.update(
  {
    id: '/users/private/googleAuth',
    path: '/users/private/googleAuth',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/users/private/googleAuth.lazy').then((d) => d.Route),
)

const UsersPrivateProfileIndexLazyRoute =
  UsersPrivateProfileIndexLazyImport.update({
    id: '/users/private/profile/',
    path: '/users/private/profile/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/users/private/profile/index.lazy').then((d) => d.Route),
  )

const UsersPrivateOrderHistoryIndexLazyRoute =
  UsersPrivateOrderHistoryIndexLazyImport.update({
    id: '/users/private/order-history/',
    path: '/users/private/order-history/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/users/private/order-history/index.lazy').then(
      (d) => d.Route,
    ),
  )

const UsersPrivateCheckoutIndexLazyRoute =
  UsersPrivateCheckoutIndexLazyImport.update({
    id: '/users/private/checkout/',
    path: '/users/private/checkout/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/users/private/checkout/index.lazy').then((d) => d.Route),
  )

const UsersPrivatePaymentSuccessLazyRoute =
  UsersPrivatePaymentSuccessLazyImport.update({
    id: '/users/private/payment/success',
    path: '/users/private/payment/success',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/users/private/payment/success.lazy').then((d) => d.Route),
  )

const UsersPrivatePaymentIdLazyRoute = UsersPrivatePaymentIdLazyImport.update({
  id: '/users/private/payment/$id',
  path: '/users/private/payment/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/users/private/payment/$id.lazy').then((d) => d.Route),
)

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
    '/notification': {
      id: '/notification'
      path: '/notification'
      fullPath: '/notification'
      preLoaderRoute: typeof NotificationLazyImport
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
    '/users/private/googleAuth': {
      id: '/users/private/googleAuth'
      path: '/users/private/googleAuth'
      fullPath: '/users/private/googleAuth'
      preLoaderRoute: typeof UsersPrivateGoogleAuthLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/public/detailPenerbangan': {
      id: '/users/public/detailPenerbangan'
      path: '/users/public/detailPenerbangan'
      fullPath: '/users/public/detailPenerbangan'
      preLoaderRoute: typeof UsersPublicDetailPenerbanganLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/private/payment/$id': {
      id: '/users/private/payment/$id'
      path: '/users/private/payment/$id'
      fullPath: '/users/private/payment/$id'
      preLoaderRoute: typeof UsersPrivatePaymentIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/private/payment/success': {
      id: '/users/private/payment/success'
      path: '/users/private/payment/success'
      fullPath: '/users/private/payment/success'
      preLoaderRoute: typeof UsersPrivatePaymentSuccessLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/private/checkout/': {
      id: '/users/private/checkout/'
      path: '/users/private/checkout'
      fullPath: '/users/private/checkout'
      preLoaderRoute: typeof UsersPrivateCheckoutIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/private/order-history/': {
      id: '/users/private/order-history/'
      path: '/users/private/order-history'
      fullPath: '/users/private/order-history'
      preLoaderRoute: typeof UsersPrivateOrderHistoryIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/users/private/profile/': {
      id: '/users/private/profile/'
      path: '/users/private/profile'
      fullPath: '/users/private/profile'
      preLoaderRoute: typeof UsersPrivateProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/reset-password-request': typeof ResetPasswordRequestLazyRoute
  '/users/private/googleAuth': typeof UsersPrivateGoogleAuthLazyRoute
  '/users/public/detailPenerbangan': typeof UsersPublicDetailPenerbanganLazyRoute
  '/users/private/payment/$id': typeof UsersPrivatePaymentIdLazyRoute
  '/users/private/payment/success': typeof UsersPrivatePaymentSuccessLazyRoute
  '/users/private/checkout': typeof UsersPrivateCheckoutIndexLazyRoute
  '/users/private/order-history': typeof UsersPrivateOrderHistoryIndexLazyRoute
  '/users/private/profile': typeof UsersPrivateProfileIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/reset-password-request': typeof ResetPasswordRequestLazyRoute
  '/users/private/googleAuth': typeof UsersPrivateGoogleAuthLazyRoute
  '/users/public/detailPenerbangan': typeof UsersPublicDetailPenerbanganLazyRoute
  '/users/private/payment/$id': typeof UsersPrivatePaymentIdLazyRoute
  '/users/private/payment/success': typeof UsersPrivatePaymentSuccessLazyRoute
  '/users/private/checkout': typeof UsersPrivateCheckoutIndexLazyRoute
  '/users/private/order-history': typeof UsersPrivateOrderHistoryIndexLazyRoute
  '/users/private/profile': typeof UsersPrivateProfileIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/reset-password-request': typeof ResetPasswordRequestLazyRoute
  '/users/private/googleAuth': typeof UsersPrivateGoogleAuthLazyRoute
  '/users/public/detailPenerbangan': typeof UsersPublicDetailPenerbanganLazyRoute
  '/users/private/payment/$id': typeof UsersPrivatePaymentIdLazyRoute
  '/users/private/payment/success': typeof UsersPrivatePaymentSuccessLazyRoute
  '/users/private/checkout/': typeof UsersPrivateCheckoutIndexLazyRoute
  '/users/private/order-history/': typeof UsersPrivateOrderHistoryIndexLazyRoute
  '/users/private/profile/': typeof UsersPrivateProfileIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/notification'
    | '/otp'
    | '/register'
    | '/reset-password'
    | '/reset-password-request'
    | '/users/private/googleAuth'
    | '/users/public/detailPenerbangan'
    | '/users/private/payment/$id'
    | '/users/private/payment/success'
    | '/users/private/checkout'
    | '/users/private/order-history'
    | '/users/private/profile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/notification'
    | '/otp'
    | '/register'
    | '/reset-password'
    | '/reset-password-request'
    | '/users/private/googleAuth'
    | '/users/public/detailPenerbangan'
    | '/users/private/payment/$id'
    | '/users/private/payment/success'
    | '/users/private/checkout'
    | '/users/private/order-history'
    | '/users/private/profile'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/notification'
    | '/otp'
    | '/register'
    | '/reset-password'
    | '/reset-password-request'
    | '/users/private/googleAuth'
    | '/users/public/detailPenerbangan'
    | '/users/private/payment/$id'
    | '/users/private/payment/success'
    | '/users/private/checkout/'
    | '/users/private/order-history/'
    | '/users/private/profile/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  NotificationLazyRoute: typeof NotificationLazyRoute
  OtpLazyRoute: typeof OtpLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  ResetPasswordRequestLazyRoute: typeof ResetPasswordRequestLazyRoute
  UsersPrivateGoogleAuthLazyRoute: typeof UsersPrivateGoogleAuthLazyRoute
  UsersPublicDetailPenerbanganLazyRoute: typeof UsersPublicDetailPenerbanganLazyRoute
  UsersPrivatePaymentIdLazyRoute: typeof UsersPrivatePaymentIdLazyRoute
  UsersPrivatePaymentSuccessLazyRoute: typeof UsersPrivatePaymentSuccessLazyRoute
  UsersPrivateCheckoutIndexLazyRoute: typeof UsersPrivateCheckoutIndexLazyRoute
  UsersPrivateOrderHistoryIndexLazyRoute: typeof UsersPrivateOrderHistoryIndexLazyRoute
  UsersPrivateProfileIndexLazyRoute: typeof UsersPrivateProfileIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  NotificationLazyRoute: NotificationLazyRoute,
  OtpLazyRoute: OtpLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  ResetPasswordRequestLazyRoute: ResetPasswordRequestLazyRoute,
  UsersPrivateGoogleAuthLazyRoute: UsersPrivateGoogleAuthLazyRoute,
  UsersPublicDetailPenerbanganLazyRoute: UsersPublicDetailPenerbanganLazyRoute,
  UsersPrivatePaymentIdLazyRoute: UsersPrivatePaymentIdLazyRoute,
  UsersPrivatePaymentSuccessLazyRoute: UsersPrivatePaymentSuccessLazyRoute,
  UsersPrivateCheckoutIndexLazyRoute: UsersPrivateCheckoutIndexLazyRoute,
  UsersPrivateOrderHistoryIndexLazyRoute:
    UsersPrivateOrderHistoryIndexLazyRoute,
  UsersPrivateProfileIndexLazyRoute: UsersPrivateProfileIndexLazyRoute,
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
        "/notification",
        "/otp",
        "/register",
        "/reset-password",
        "/reset-password-request",
        "/users/private/googleAuth",
        "/users/public/detailPenerbangan",
        "/users/private/payment/$id",
        "/users/private/payment/success",
        "/users/private/checkout/",
        "/users/private/order-history/",
        "/users/private/profile/"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/notification": {
      "filePath": "notification.lazy.jsx"
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
    "/users/private/googleAuth": {
      "filePath": "users/private/googleAuth.lazy.jsx"
    },
    "/users/public/detailPenerbangan": {
      "filePath": "users/public/detailPenerbangan.lazy.jsx"
    },
    "/users/private/payment/$id": {
      "filePath": "users/private/payment/$id.lazy.jsx"
    },
    "/users/private/payment/success": {
      "filePath": "users/private/payment/success.lazy.jsx"
    },
    "/users/private/checkout/": {
      "filePath": "users/private/checkout/index.lazy.jsx"
    },
    "/users/private/order-history/": {
      "filePath": "users/private/order-history/index.lazy.jsx"
    },
    "/users/private/profile/": {
      "filePath": "users/private/profile/index.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
