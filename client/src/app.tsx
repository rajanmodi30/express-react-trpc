import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import { RouterConfig } from "./router";

export const App = () => {
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

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <RouterConfig />
        </QueryClientProvider>
      </Suspense>
    </>
  );
};
