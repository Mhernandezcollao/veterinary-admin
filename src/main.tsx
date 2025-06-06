import './index.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { AuthProvider } from './modules/auth/context/AuthContext';
import { BranchesPage } from './modules/branches/pages';
import { DashboardPage } from './modules/dashboard/pages';
import { MyLayout } from './modules/core/components';



/* The `const notAuthenticatedRoutes` is creating a routing configuration for routes that are
accessible to users who are not authenticated or logged in. In this specific case, it is defining a
single route with the path `'*'`, which acts as a wildcard matching any path that has not been
matched by other routes. When a user accesses a path that is not matched by any other route, the
`Login` component will be rendered, prompting the user to log in or authenticate before accessing
the protected routes. */

// const notAuthenticatedRoutes = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <Outlet />
//     ),
//     children: [
//       {
//         path: '',
//         element: <LoginPage />
//       },
//       {
//         path: 'register',
//         element: <RegisterPage />
//       },
//       {
//         path: 'restore-password',
//         element: <RestorePasswordPage />
//       },
//       {
//         path: '*',
//         element: <Navigate to="/" replace />
//       }
//     ]
//   }
// ]);

/* The `authenticatedRoutes` constant is creating a routing configuration for authenticated users in a
React application using the `createBrowserRouter` function. It defines different paths and their
corresponding components that should be rendered when the user navigates to those paths within the
authenticated section of the application. */
const authenticatedRoutes = createBrowserRouter([
  {
    path: '/',
    element: (
      <MyLayout />
    ),
    children: [
      {
        path: '',
        element: <BranchesPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
    ]
  }
]);

const Navigation = () => {

  // const { status } = React.useContext(AuthContext);
  // const { t} = useTranslation();

  // switch (status) {
  //   case 'checking':
  //     return <Loading message={t('verifying_account')} />;

  //   case 'not-authenticated':
  //     return <RouterProvider router={notAuthenticatedRoutes} />

  //   case 'authenticated':
  //     return <RouterProvider router={authenticatedRoutes} />
  // }
  return <RouterProvider router={authenticatedRoutes} />
};

const documentRoot: any = document.getElementById('root');
ReactDOM.createRoot(documentRoot).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </HeroUIProvider>
  </React.StrictMode>
);
