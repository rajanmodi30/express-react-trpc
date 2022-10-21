import { Router } from "express";
import { PingController } from "../../app/http/controllers/api/PingController";
import { verifyToken } from "../../app/http/middleware/Auth";
import devicesRouter from "./device";
import NotificationRouter from "./notification";
import authRouter from "./auth";
// import { publicProcedure, trpcRouter } from "../../app/providers/trpc";

// //ROUTES IMPORT

// const appRouter = trpcRouter({
//   greeting: publicProcedure.query(() => "hello tRPC v10!"),
// });

const router = Router();

router.get("/", PingController.pong);

router.use("/", authRouter);

router.use("/devices", verifyToken, devicesRouter);

router.use("/notifications", verifyToken, NotificationRouter);

//ROUTERS USE ADD HERE
export default router;

// Export only the **type** of a router to avoid importing server code on the client
// export type AppRouter = typeof appRouter;
