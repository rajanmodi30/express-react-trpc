// @filename: server.ts
import type { AppRouter } from "../../../server/src/routes/api/router";
import type { GetInferenceHelpers } from "@trpc/server";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
export type AppRouterTypes = GetInferenceHelpers<AppRouter>;
export type UsersListResponse =
  AppRouterTypes["auth"]["users"]["list"]["output"];

// export type Users= UsersListResponse
export type UsersList = UsersListResponse["data"]; //  "myValue1" | "myValue2"
