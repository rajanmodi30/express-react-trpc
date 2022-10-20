import { Navigate, useRoutes } from "react-router-dom";
import { lazyImport } from "./utils/lazyImport";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Admin } from "./layouts/Admin";
import { Auth } from "./layouts/Auth";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { useAuthStore } from "./store/auth";

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
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
