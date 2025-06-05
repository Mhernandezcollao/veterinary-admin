import './index.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { AuthContext, AuthProvider } from "./modules/auth/context/AuthContext";
import { AppBackground, AuthModals, AuthNavbar, Loading, NotAuthModals, NotAuthNavbar } from "./modules/core/components";
import { DepositInProgressProvider } from "./modules/transaction/context";
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { bsc } from '@reown/appkit/networks'
import { ModalProvider, ThemeProvider } from "./modules/core/context";
import { initReactI18next, useTranslation } from 'react-i18next';
import { TranslationConfig } from "./modules/core/utils/TranslationConfig";
import { MultimatrixProvider } from './modules/dashboard/context/MultimatrixContext';
import i18n from 'i18next';
import {HeroUIProvider} from "@heroui/react";
import { BranchesFormPage, BranchesPage } from './modules/branches/pages';
import { LoginPage, RegisterPage, RestorePasswordPage } from './modules/auth/pages';
import { WorkerAttendanceControlPage, WorkerNotificationsPage, WorkerSchedulePage, WorkersFormPage, WorkersPage } from './modules/workers/pages';
import { VeterinarySchedulePage } from './modules/veterinary-schedule/pages';
import { HairSalonSchedulePage } from './modules/hair-salon-schedule/pages';
import { LodgingSchedulePage } from './modules/lodging-schedule/pages';
import { ServicesFormPage, ServicesPage } from './modules/services/pages';
import { FinancesPage } from './modules/finances/pages';
import { ReportsPage } from './modules/reports/pages';
import { NotificationsPage } from './modules/notifications/pages';
import { SecurityAndPermissionsPage } from './modules/security-and-permissions/pages';
import { FeedbackPage } from './modules/feedback/pages';
import { SocialNetworksPage } from './modules/social-networks/pages';
import { InventoryPage } from './modules/inventory/pages';
import { AdministratorActivityPage, AdministratorsFormPage, AdministratorsPage } from './modules/administrators/pages';
import { WorkerActivityPage } from './modules/workers/pages/WorkerActivityPage';
import { ClientsFormPage, ClientsPage, PetsFormPage, PetsPage, ServiceRecordPage, VeterinaryRecordPage } from './modules/clients/pages';
import { SupplyRecordPage } from './modules/services/pages/SupplyRecordPage';
import { StockFormPage } from './modules/inventory/pages/StockFormPage';
import { SuppliersFormPage } from './modules/inventory/pages/SuppliersFormPage';
import { SeeAllPage } from './modules/inventory/pages/SeeAllPage';
import { SettingNotificationsPage } from './modules/setting-notifications/pages';


/* The `const notAuthenticatedRoutes` is creating a routing configuration for routes that are
accessible to users who are not authenticated or logged in. In this specific case, it is defining a
single route with the path `'*'`, which acts as a wildcard matching any path that has not been
matched by other routes. When a user accesses a path that is not matched by any other route, the
`Login` component will be rendered, prompting the user to log in or authenticate before accessing
the protected routes. */
const notAuthenticatedRoutes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppBackground>
        <NotAuthNavbar />
          <Outlet />
        <NotAuthModals />
      </AppBackground>
    ),
    children: [
      {
        path: '',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'restore-password',
        element: <RestorePasswordPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

/* The `authenticatedRoutes` constant is creating a routing configuration for authenticated users in a
React application using the `createBrowserRouter` function. It defines different paths and their
corresponding components that should be rendered when the user navigates to those paths within the
authenticated section of the application. */
const authenticatedRoutes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppBackground>
        <AuthNavbar />
        <Outlet />
        <AuthModals />
      </AppBackground>
    ),
    children: [
      {
        path: '/',
        element: <BranchesPage />
      },
      {
        path: 'branches/:action',
        element: <BranchesFormPage />
      },
      {
        path: 'admins',
        element: <AdministratorsPage />
      },
      {
        path: 'admins/:action',
        element: <AdministratorsFormPage />
      },
      {
        path: 'admins/activity',
        element: <AdministratorActivityPage />
      },
      {
        path: 'workers',
        element: <WorkersPage/>
      },
      {
        path: 'workers/:action',
        element: <WorkersFormPage/>
      },
      {
        path: 'attendance-control',
        element: <WorkerAttendanceControlPage/>
      },
      {
        path: 'attendance-control/:action',
        element: <WorkerSchedulePage/>
      },
      {
        path: 'workers/activity',
        element: <WorkerActivityPage />
      },
      {
        path: 'workers-notifications',
        element: <WorkerNotificationsPage/>
      },
      {
        path: 'clients',
        element: <ClientsPage />
      },
      {
        path: 'clients/:action',
        element: <ClientsFormPage />
      },
      {
        path: 'clients/service-record',
        element: <ServiceRecordPage />
      },
      {
        path: 'pets',
        element: <PetsPage />
      },
      {
        path: 'pets/:action',
        element: <PetsFormPage />
      },
      {
        path: 'pets/veterinary-record',
        element: <VeterinaryRecordPage/>
      },
      {
        path: 'veterinary-schedule',
        element: <VeterinarySchedulePage />
      },
      {
        path: 'hair-salon-schedule',
        element: <HairSalonSchedulePage />
      },
      {
        path: 'lodging-schedule',
        element: <LodgingSchedulePage />
      },
      {
        path: 'services',
        element: <ServicesPage />
      },
      {
        path: 'services/:action',
        element: <ServicesFormPage />
      },
      {
        path: 'services/supply-record',
        element: <SupplyRecordPage />
      },
      {
        path: 'finances',
        element: <FinancesPage />
      },
      {
        path: 'reports',
        element: <ReportsPage />
      },
      {
        path: 'notifications',
        element: <NotificationsPage />
      },
      {
        path: 'setting-notifications',
        element: <SettingNotificationsPage />
      },
      {
        path: 'security-and-permissions',
        element: <SecurityAndPermissionsPage />
      },
      {
        path: 'social-networks',
        element: <SocialNetworksPage />
      },
      {
        path: 'feedback',
        element: <FeedbackPage />
      },
      {
        path: 'inventory',
        element: <InventoryPage />
      },
      {
        path: 'inventory/stock/:action',
        element: <StockFormPage/>
      },
      {
        path: 'inventory/suppliers/:action',
        element: <SuppliersFormPage/>
      },
      {
        path: 'inventory/supplies-per-service/see-all',
        element: <SeeAllPage/>
      },
    ]
  }
]);

const Navigation = () => {

  const { status } = React.useContext(AuthContext);
  const { t} = useTranslation();

  switch (status) {
    case 'checking':
      return <Loading message={t('verifying_account')} />;

    case 'not-authenticated':
      return <RouterProvider router={notAuthenticatedRoutes} />

    case 'authenticated':
      return <RouterProvider router={authenticatedRoutes} />
  }
};

const documentRoot: any = document.getElementById('root');
ReactDOM.createRoot(documentRoot).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ThemeProvider>
        <ModalProvider>
          <AuthProvider>
            <MultimatrixProvider>
              <DepositInProgressProvider>
                <Navigation />
              </DepositInProgressProvider>
            </MultimatrixProvider>
          </AuthProvider>
        </ModalProvider>
      </ThemeProvider>
    </HeroUIProvider>
  </React.StrictMode>
);
