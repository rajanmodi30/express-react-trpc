import { Router } from "express";
import { SocialLoginRequest } from "../../app/http/requests/SocialLoginRequest";
import { publicProcedure, trpcRouter } from "../../app/providers/trpc";
import { LoginService } from "../../app/services/LoginService";
import { DeviceService } from "../../app/services/DeviceService";
import { UserResponse } from "../../app/http/responses/UserResponse";
import { LoginRequest } from "../../app/http/requests/LoginRequest";
// import { AuthController } from "../../app/http/controllers/api/Auth/AuthController";
// import { RequestValidator } from "../../app/http/middleware/RequestValidator";
// import { SignUpRequest } from "../../app/http/requests/SignUpRequest";
// import { verifyResetToken, verifyToken } from "../../app/http/middleware/Auth";
// import { ForgotPasswordController } from "../../app/http/controllers/api/Auth/ForgotPasswordController";
// import { ForgotPasswordRequest } from "../../app/http/requests/ForgotPasswordRequest";
// import { ResetPasswordRequest } from "../../app/http/requests/ResetPasswordRequest";
// import { SocialLoginController } from "../../app/http/controllers/api/Auth/SocialLoginController";
// import { verifySocialLogin } from "../../app/http/middleware/SocialAuth";

const router = Router();

export const authRouter = trpcRouter({
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
});

// router.post("/login", RequestValidator(LoginRequest), AuthController.login);

// router.post("/signup", RequestValidator(SignUpRequest), AuthController.signUp);

// router.get("/profile", verifyToken, AuthController.profile);

// router.post(
//   "/social-login",
//   RequestValidator(SocialLoginRequest),
//   verifySocialLogin,
//   SocialLoginController.socialLogin
// );

// router.post(
//   "/forgot-password",
//   RequestValidator(ForgotPasswordRequest),
//   ForgotPasswordController.forgot
// );

// router.get(
//   "/reset-password",
//   verifyResetToken,
//   ForgotPasswordController.checkResetToken
// );

// router.post(
//   "/reset-password",
//   RequestValidator(ResetPasswordRequest),
//   verifyResetToken,
//   ForgotPasswordController.resetPassword
// );

// router.get("/logout", verifyToken, AuthController.logOut);

export default router;
