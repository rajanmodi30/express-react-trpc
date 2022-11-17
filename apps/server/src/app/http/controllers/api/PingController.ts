import { publicProcedure, trpcRouter } from "../../../providers/trpcProviders";

export const PingController = trpcRouter({
  pong: publicProcedure.query(({ ctx }) => {
    const { locales } = ctx;
    return {
      status: true,
      message: locales("pong"),
    };
  }),
});
