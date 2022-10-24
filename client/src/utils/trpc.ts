// @filename: server.ts
import type { AppRouter } from "../../../server/src/routes/api/router";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
