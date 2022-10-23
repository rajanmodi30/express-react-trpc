import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const trpcRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure;
