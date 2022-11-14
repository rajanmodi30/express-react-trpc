import { forwardRef } from "react";
import { RouterConfig } from "./router";
import { useAuthStore } from "./store/auth";
import { trpc } from "./utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useNavigate,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import { toast } from "react-toastify";

declare module "@mui/material/styles" {
  interface Palette {
    download: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    download?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    download: true;
  }
}

export const App = () => {
  const { token, removeAll } = useAuthStore();
  const navigate = useNavigate();

  const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
  >((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#844c7a",
      },
      secondary: {
        main: "#f50057",
      },
      download: {
        main: "#ACB3BD",
        contrastText: "#000",
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  const apiErrorHandler = (error: any) => {
    toast.error(error.message);
    if (error.data.httpStatus !== undefined && error.data.httpStatus === 401) {
      removeAll();
      navigate("/");
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: apiErrorHandler,
        networkMode: "always",
        retry: false,
      },
      mutations: {
        networkMode: "always",
        retry: false,
        onError: apiErrorHandler,
      },
    },
  });

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: import.meta.env.VITE_API_BASE_URL,
        headers: () => {
          return {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en",
          };
        },
      }),
    ],
  });

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RouterConfig />
          </ThemeProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
};
