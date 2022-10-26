import { Suspense, useEffect, useState, forwardRef } from "react";
import { Loader } from "./components/Loader";
import { RouterConfig } from "./router";
import { useAuthStore } from "./store/auth";
import { trpc } from "./utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

export const App = () => {
  const { token } = useAuthStore();

  const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
  >((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    console.log("heree");
    return <RouterLink ref={ref} to={href} {...other} />;
  });

  const theme = createTheme({
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

  //TODO auto logout and logout right after login issues fix
  //TODO dashboard sidebar active route link
  //TODO lazy loading
  //TODO trpc download trick

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "always",
        retry: false,
      },
      mutations: {
        networkMode: "always",
        retry: false,
      },
    },
  });

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_API_BASE_URL,
          headers() {
            console.log("token here", token);
            return {
              Authorization: `Bearer ${token ?? ""}`,
            };
          },
        }),
      ],
    })
  );

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <RouterConfig />
            </ThemeProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </Suspense>
    </>
  );
};
