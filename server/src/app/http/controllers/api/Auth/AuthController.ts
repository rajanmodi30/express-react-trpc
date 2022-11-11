import {
  protectedProcedure,
  publicProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { DeviceService } from "../../../../services/DeviceService";
import { LoginService } from "../../../../services/LoginService";
import { ChangePasswordRequest } from "../../../requests/ChangePasswordRequest";
import { LoginRequest } from "../../../requests/LoginRequest";
import { UserResponse } from "../../../responses/UserResponse";
import { DeviceController } from "../Device/DeviceController";
import { UserController } from "../User/UserController";
import bcrypt from "bcryptjs";
import dbConnection from "../../../../providers/db";
import { ProfileUpdateRequest } from "../../../requests/ProfileUpdateRequest";

export const AuthController = trpcRouter({
  login: publicProcedure.input(LoginRequest).mutation(async ({ input }) => {
    const { email, password, deviceType, fcmToken } = input;
    const user = await LoginService.login(email, password);

    if (user === null) {
      return {
        status: false,
        message: "Wrong Email Or Password",
      };
    }

    const device = await DeviceService.create(
      user.id,
      deviceType,
      fcmToken ?? undefined,
      {}
    );

    return {
      status: true,
      data: UserResponse(user),
      accessToken: device.authToken,
      message: "Logged In Successfully",
    };
  }),
  profile: protectedProcedure.mutation(({ ctx }) => {
    return {
      status: true,
      user: UserResponse(ctx.user),
    };
  }),
  changePassword: protectedProcedure
    .input(ChangePasswordRequest)
    .mutation(async ({ input, ctx }) => {
      const { user, locales } = ctx;
      const { oldPassword, newPassword } = input;
      const isValid = bcrypt.compareSync(oldPassword, user.password ?? "");
      if (!isValid) {
        return {
          status: false,
          message: locales("user.reset_invalid_password"),
        };
      }

      const newAndOldPasswordSame = bcrypt.compareSync(
        newPassword,
        user.password ?? ""
      );

      if (newAndOldPasswordSame) {
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
          password: bcrypt.hashSync(newPassword),
        },
      });

      return {
        status: true,
        message: locales("user.password_changed"),
      };
    }),
  logOut: protectedProcedure.mutation(({ ctx }) => {
    const { device, user } = ctx;
    DeviceService.delete(device.id, user.id);
    return {
      status: true,
      message: "Logged out",
    };
  }),
  updateProfile: protectedProcedure
    .input(ProfileUpdateRequest)
    .mutation(async ({ ctx, input }) => {
      const { user, locales } = ctx;
      const newUserDetails = await dbConnection.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...input,
        },
      });

      return {
        status: true,
        message: locales("user.profile_updated"),
        data: UserResponse(newUserDetails),
      };
    }),
  devices: DeviceController,
  users: UserController,
});
