import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { RouterConfig } from "./router";
import { useAuthStore } from "./store/auth";
import { axios } from "./utils/axios";
import { trpc } from "./utils/trpc";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

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
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    })
  );
  // type mutationData = {
  //   axios: AxiosInstance;
  //   token: string | null;
  // };

  // const { user, token } = useAuthStore();
  // const { data, isSuccess } = trpc.hello.useQuery();

  // if (isSuccess) {
  //   console.log("data", data);
  // }

  // useEffect(() => {
  //   if (user) {
  //     const data: mutationData = { axios, token };
  //     mutation.mutate(data);
  //   }
  // }, [user]);

  // const mutation = useMutation((data: mutationData) => {
  //   return data.axios.get("profile", {
  //     headers: {
  //       authorization: `Bearer ${data.token}`,
  //     },
  //   });
  // });

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
