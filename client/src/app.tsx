import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Suspense, useEffect } from "react";
import { Loader } from "./components/Loader";
import { RouterConfig } from "./router";
import { useAuthStore } from "./store/auth";
import { axios } from "./utils/axios";

export const App = () => {
  type mutationData = {
    axios: AxiosInstance;
    token: string | null;
  };

  const { user, token } = useAuthStore();

  useEffect(() => {
    if (user) {
      const data: mutationData = { axios, token };
      mutation.mutate(data);
    }
  }, [user]);

  const mutation = useMutation((data: mutationData) => {
    return data.axios.get("profile", {
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    });
  });

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterConfig />
      </Suspense>
    </>
  );
};
