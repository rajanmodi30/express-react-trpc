import { useRoutes } from "react-router-dom";
import { lazyImport } from "./utils/lazyImport";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Admin } from "./layouts/Admin";
import { Auth } from "./layouts/Auth";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword";

export const RouterConfig = () => {
  return useRoutes([
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: <Admin />,
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
