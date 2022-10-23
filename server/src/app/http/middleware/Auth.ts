import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { env } from "../../../env";
import { DeviceWithUser } from "../../../utils/types";
import dbConnection from "../../providers/db";
import { middleware } from "../../providers/trpc";

export const VerifyAuthToken = middleware(async ({ next, ctx }) => {
  try {
    if (ctx.bearerToken === undefined) {
      throw "Invalid Token";
    }
    let user: null | User = null,
      device: DeviceWithUser = null;

    const decoded = jwt.verify(ctx.bearerToken, env.auth.secret);
    if (typeof decoded !== "string") {
      device = await dbConnection.device.findFirst({
        where: {
          authToken: ctx.bearerToken,
          deletedAt: null,
        },
        include: {
          user: true,
        },
      });
      if (!device) {
        throw "Invalid Token";
      }
      if (!device.user) {
        throw "Invalid Token";
      }
      user = device.user;
    } else {
      throw "Invalid Token";
    }

    return next({
      ctx: {
        ...ctx,
        user: user,
        device: device,
      },
    });
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized",
    });
  }
});

export const VerifyResetToken = async (resetToken: undefined | string) => {
  if (typeof resetToken === "undefined") {
    throw "Invalid Link";
  }

  const decoded = jwt.verify(resetToken, env.auth.secret);

  if (typeof decoded === "string") {
    throw "Link Expired";
    // message: req.t("user.link_expired"),
  }

  const user = await dbConnection.user.findFirst({
    where: {
      forgotPasswordToken: resetToken,
    },
  });

  if (!user) {
    throw "Link Expired";
    // message: req.t("user.link_expired"),
  }

  return user;
};
