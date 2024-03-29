import AuthGuard from "Components/AuthGuard";
import GuestGuard from "Components/GuestGuard";
import LoadingScreen from "Components/LoadingScreen";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import MainLayout from "./layout/MainLayout";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const UsersPage = Loadable(lazy(() => import("./pages/users")));
const DashboardPage = Loadable(lazy(() => import("./pages/dashboard")));
const StudentsPage = Loadable(lazy(() => import("./pages/students")));
const StudentProfilePage = Loadable(
  lazy(() => import("./pages/students/Profile"))
);
const PaymentsPage = Loadable(lazy(() => import("./pages/payments")));
const SettingsPage = Loadable(lazy(() => import("./pages/settings")));
const BranchesPage = Loadable(lazy(() => import("./pages/branches")));
const TeachersPage = Loadable(lazy(() => import("./pages/teachers")));
const RegisterStudentPage = Loadable(
  lazy(() => import("./pages/students/Register"))
);

const routes: RouteObject[] = [
  {
    path: "authentication",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: "users",
        element: (
          <AuthGuard>
            <UsersPage />
          </AuthGuard>
        ),
      },
      {
        path: "branches",
        element: (
          <AuthGuard>
            <BranchesPage />
          </AuthGuard>
        ),
      },
      {
        path: "students",
        element: (
          <AuthGuard>
            <StudentsPage />
          </AuthGuard>
        ),
      },
      {
        path: "students/register",
        element: (
          <AuthGuard>
            <RegisterStudentPage />
          </AuthGuard>
        ),
      },
      {
        path: "students/:id/profile",
        element: (
          <AuthGuard>
            <StudentProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: "teachers",
        element: (
          <AuthGuard>
            <TeachersPage />
          </AuthGuard>
        ),
      },
      {
        path: "branches",
        element: (
          <AuthGuard>
            <UsersPage />
          </AuthGuard>
        ),
      },
      {
        path: "payments",
        element: (
          <AuthGuard>
            <PaymentsPage />
          </AuthGuard>
        ),
      },
      {
        path: "settings",
        element: (
          <AuthGuard>
            <SettingsPage />
          </AuthGuard>
        ),
      },
    ],
  },
];

export default routes;
