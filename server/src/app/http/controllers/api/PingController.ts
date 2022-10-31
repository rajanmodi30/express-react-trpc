import { publicProcedure, trpcRouter } from "../../../providers/trpcProviders";

export const PingController = trpcRouter({
  pong: publicProcedure.query(({ ctx }) => {
    const { translator } = ctx;
    return {
      status: true,
      message: translator("pong"),
    };
  }),
});
