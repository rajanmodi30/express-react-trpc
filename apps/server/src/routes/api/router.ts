import { AuthController } from "../../app/http/controllers/api/Auth/AuthController";
import { ForgotPasswordController } from "../../app/http/controllers/api/Auth/ForgotPasswordController";
import { PingController } from "../../app/http/controllers/api/PingController";
import { trpcRouter } from "../../app/providers/trpcProviders";

export const appRouter = trpcRouter({
  ping: PingController,
  auth: AuthController,
  forgotPassword: ForgotPasswordController,
});

export type AppRouter = typeof appRouter;
