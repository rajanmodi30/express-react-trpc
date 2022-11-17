import { env } from "../../../../../env";
import dbConnection from "../../../../providers/db";
import jwt from "jsonwebtoken";
import { forgotPasswordEmailQueue } from "../../../../jobs/ForgotMailSend";
import bcrypt from "bcryptjs";
import {
  publicProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { ForgotPasswordRequest } from "../../../requests/ForgotPasswordRequest";
import { VerifyResetToken } from "../../../middleware/Auth";
import { UserResponse } from "../../../responses/UserResponse";
import { ResetPasswordRequest } from "../../../requests/ResetPasswordRequest";
import { ResetTokenRequest } from "../../../requests/ResetTokenRequest";
import { TRPCError } from "@trpc/server";

export const ForgotPasswordController = trpcRouter({
  forgot: publicProcedure
    .input(ForgotPasswordRequest)
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      const { locales } = ctx;

      const user = await dbConnection.user.findFirst({
        where: {
          email: email,
          deletedAt: null,
        },
      });

      if (!user) {
        return {
          status: false,
          message: "User not found",
        };
      }

      if (user.socialId) {
        return {
          status: false,
          message: "Please login with your social account",
        };
      }

      const token = await jwt.sign({ userId: user.id }, env.auth.secret, {
        expiresIn: env.auth.forgotPasswordExpiredIn,
      });

      await dbConnection.user.update({
        where: {
          id: user.id,
        },
        data: {
          forgotPasswordToken: token,
        },
      });

      const url = `${env.app.client_url}/reset-password?token=${token}`;
      const subject = "Reset your password";
      const data = {
        email,
        url,
        subject,
      };

      forgotPasswordEmailQueue.add("sendForgotPasswordEmail", data);

      return {
        status: true,
        message: locales("user.forgot_password_reset_link"),
      };
    }),
  checkResetToken: publicProcedure
    .input(ResetTokenRequest)
    .query(async ({ input }) => {
      const { resetToken } = input;
      try {
        const user = await VerifyResetToken(resetToken);
        return {
          status: true,
          user: UserResponse(user),
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message ?? "You are not authorized",
        });
      }
    }),
  resetPassword: publicProcedure
    .input(ResetPasswordRequest)
    .mutation(async ({ ctx, input }) => {
      const { resetToken, password } = input;
      const { locales } = ctx;
      try {
        const user = await VerifyResetToken(resetToken);
        if (!user.password) {
          return {
            status: false,
            message: "",
          };
        }
        const passwordsAreSame = bcrypt.compareSync(password, user.password);

        if (passwordsAreSame) {
          return {
            status: false,
            message: locales("user.reset_same_password"),
          };
        }

        await dbConnection.user.update({
          where: {
            id: user.id,
          },
          data: {
            forgotPasswordToken: null,
            password: await bcrypt.hashSync(password),
          },
        });

        await dbConnection.device.deleteMany({
          where: {
            userId: user.id,
          },
        });

        return {
          status: true,
          message: locales("user.password_reset_success"),
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message ?? "You are not authorized",
        });
      }
    }),
});
