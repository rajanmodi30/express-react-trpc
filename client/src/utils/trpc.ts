// @filename: server.ts
import type { AppRouter } from "../../../server/src/routes/api/router";
import type { GetInferenceHelpers } from "@trpc/server";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
export type AppRouterTypes = GetInferenceHelpers<AppRouter>;
