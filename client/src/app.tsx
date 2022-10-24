import { Suspense, useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { RouterConfig } from "./router";
import { useAuthStore } from "./store/auth";
import { trpc } from "./utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

export const App = () => {
  const { token } = useAuthStore();

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
            <RouterConfig />
          </QueryClientProvider>
        </trpc.Provider>
      </Suspense>
    </>
  );
};
