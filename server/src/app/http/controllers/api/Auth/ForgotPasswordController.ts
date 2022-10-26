import { env } from "../../../../../env";
import dbConnection from "../../../../providers/db";
import jwt from "jsonwebtoken";
import { forgotPasswordEmailQueue } from "../../../../jobs/ForgotMailSend";
import bcrypt from "bcryptjs";
import {
  protectedProcedure,
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
    .mutation(async ({ input }) => {
      const { email } = input;

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
        // message: req.t("user.forgot_password_reset_link"),
        message: "Reset Password Link Sent",
      };
    }),
  checkResetToken: protectedProcedure
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
  resetPassword: protectedProcedure
    .input(ResetPasswordRequest)
    .mutation(async ({ ctx, input }) => {
      const { resetToken, password } = input;
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
            message: "Same Passwords",
            // message: req.t("user.reset_same_password"),
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

        //TODO delete all the previous devices and log out all devices

        return {
          status: true,
          message: "Password reset successfully",
          // message: req.t("user.password_reset_success"),
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message ?? "You are not authorized",
        });
      }
    }),
});
