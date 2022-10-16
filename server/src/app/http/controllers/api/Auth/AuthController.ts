import { Request, Response } from "express";
import { DeviceService } from "../../../../services/DeviceService";
import { LoginService } from "../../../../services/LoginService";
import { SignUpService } from "../../../../services/SignUpService";
import { UserResponse } from "../../../responses/UserResponse";

export class AuthController {
  public static async signUp(req: Request, res: Response) {
    const validatedData = req.body;
    const userExists = await SignUpService.checkIfUserExists(
      validatedData.email
    );

    if (userExists) {
      return res.status(400).send({
        status: false,
        message: req.t("user.user_already_exists"),
      });
    }

    const user = await SignUpService.signUp(validatedData);
    const { deviceType, fcmToken, metaData } = validatedData;
    const device = await DeviceService.create(
      user.id,
      deviceType,
      fcmToken ?? null,
      metaData ?? {}
    );

    return res.send({
      status: true,
      data: UserResponse(user),
      accessToken: device.authToken,
      message: req.t("user.user_created"),
    });
  }

  public static async login(req: Request, res: Response) {
    const { email, password, deviceType, fcmToken, metaData } =
      req.body.validatedData;
    const user = await LoginService.login(email, password);

    if (user === null) {
      return res.status(400).json({
        status: false,
        message: req.t("user.wrong_email_or_password"),
      });
    }

    const device = await DeviceService.create(
      user.id,
      deviceType,
      fcmToken ?? null,
      metaData ?? {}
    );

    return res.json({
      status: true,
      data: UserResponse(user),
      accessToken: device.authToken,
      message: req.t("user.logged_in"),
    });
  }

  public static async profile(req: Request, res: Response) {
    const { user } = req.body.auth;
    if (user === null) {
      return res.status(401).json({
        status: false,
        message: req.t("user.user_not_found"),
      });
    }

    return res.json({
      status: true,
      data: UserResponse(user),
    });
  }

  public static async logOut(req: Request, res: Response) {
    const { device, user } = req.body.auth;
    DeviceService.delete(device.id, user.id);

    return res.json({
      status: true,
      message: req.t("user.logged_out"),
    });
  }
}
