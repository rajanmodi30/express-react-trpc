import {
  protectedProcedure,
  publicProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { DeviceService } from "../../../../services/DeviceService";
import { LoginService } from "../../../../services/LoginService";
import { LoginRequest } from "../../../requests/LoginRequest";
import { UserResponse } from "../../../responses/UserResponse";
import { DeviceController } from "../Device/DeviceController";
import { UserController } from "../User/UserController";

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
  logOut: protectedProcedure.mutation(({ ctx }) => {
    const { device, user } = ctx;
    DeviceService.delete(device.id, user.id);
    return {
      status: true,
      message: "Logged out",
    };
  }),
  devices: DeviceController,
  users: UserController,
});
