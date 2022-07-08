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
        path: "teachers",
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
            <UsersPage />
          </AuthGuard>
        ),
      },
    ],
  },
];

export default routes;
