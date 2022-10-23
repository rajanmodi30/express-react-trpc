import { AuthController } from "../../app/http/controllers/api/Auth/AuthController";
import { ForgotPasswordController } from "../../app/http/controllers/api/Auth/ForgotPasswordController";
import { trpcRouter } from "../../app/providers/trpc";

export const appRouter = trpcRouter({
  auth: AuthController,
  forgotPassword: ForgotPasswordController,
});

export type AppRouter = typeof appRouter;
