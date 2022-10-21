import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const trpcRouter = t.router;
export const publicProcedure = t.procedure;

const greetingRouter = trpcRouter({
  hello: publicProcedure.query(() => {
    return { msg: "hello tRPC v10!" };
  }),
});

export const appRouter = trpcRouter({
  hello: publicProcedure.query(() => {
    return {
      msg: "Hello",
    };
  }),
});

export type AppRouter = typeof appRouter;
