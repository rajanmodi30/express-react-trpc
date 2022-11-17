import { SocialTypes } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  publicProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { DeviceService } from "../../../../services/DeviceService";
import { SocialService } from "../../../../services/SocialService";
import { VerifySocialLogin } from "../../../middleware/SocialAuth";
import { SocialLoginRequest } from "../../../requests/SocialLoginRequest";
import { UserResponse } from "../../../responses/UserResponse";

export const SocialLoginController = trpcRouter({
  socialLogin: publicProcedure
    .input(SocialLoginRequest)
    .use(VerifySocialLogin)
    .mutation(async ({ ctx, input }) => {
      const { locales, auth } = ctx;
      const {
        socialType,
        deviceType,
        fcmToken,
        firstName,
        lastName,
        metaData,
      } = input;
      let email = null;

      if (socialType === SocialTypes.APPLE) {
        const appleAccountDetails = await SocialService.getAppleDetails(
          auth.sub
        );

        if (!appleAccountDetails && !auth.email) {
          return new TRPCError({
            code: "BAD_REQUEST",
            message: locales("user.apple_error"),
          });
        }

        if (!appleAccountDetails) {
          email = auth.email;
          await SocialService.createAppleDetails(
            firstName,
            lastName,
            email,
            auth.sub
          );
        } else {
          email = appleAccountDetails.email;
        }
      } else {
        email = auth?.email;
      }

      const user = await SocialService.socialLogin(
        auth.sub,
        socialType,
        email,
        firstName,
        lastName
      );
      const device = await DeviceService.create(
        user.id,
        deviceType,
        fcmToken,
        metaData ?? {}
      );

      return {
        status: true,
        data: UserResponse(user),
        accessToken: device.authToken,
        message: locales("user.logged_in"),
      };
    }),
});
