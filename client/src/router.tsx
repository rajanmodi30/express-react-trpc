import { Navigate, useRoutes } from "react-router-dom";
import { lazyImport } from "./utils/lazyImport";
import { useAuthStore } from "./store/auth";
import { Admin } from "./layouts/Admin";
import { Auth } from "./layouts/Auth";
import { ChangePassword } from "./pages/Users/ChangePassword";
const { ResetPassword } = lazyImport(
  () => import("./pages/ResetPassword"),
  "ResetPassword"
);
const { Users } = lazyImport(() => import("./pages/Users/List"), "Users");
const { AddUser } = lazyImport(() => import("./pages/Users/Add"), "AddUser");
const { EditUser } = lazyImport(() => import("./pages/Users/Edit"), "EditUser");
const { NotFound } = lazyImport(() => import("./pages/NotFound"), "NotFound");
const { Login } = lazyImport(() => import("./pages/Login"), "Login");
const { ForgotPassword } = lazyImport(
  () => import("./pages/ForgotPassword"),
  "ForgotPassword"
);
const { Dashboard } = lazyImport(
  () => import("./pages/Dashboard"),
  "Dashboard"
);

export const RouterConfig = () => {
  const { user } = useAuthStore();

  return useRoutes([
    {
      path: "/",
      element: user ? <Navigate to="/admin" /> : <Auth />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: user ? <Admin /> : <Navigate to="/" />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "users/add",
          element: <AddUser />,
        },
        {
          path: "users/change-password",
          element: <ChangePassword />,
        },
        {
          path: "users/edit/:id",
          element: <EditUser />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
