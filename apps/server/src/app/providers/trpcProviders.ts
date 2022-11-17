import { VerifyAuthToken } from "../http/middleware/Auth";
import { t } from "./context";

export const trpcRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(VerifyAuthToken);
