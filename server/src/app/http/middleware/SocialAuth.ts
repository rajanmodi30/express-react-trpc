import { SocialTypes } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { env } from "../../../env";
import { middleware } from "../../providers/context";

export const VerifySocialLogin = middleware(async ({ next, ctx }) => {
  const { socialType, socialToken } = ctx;

  try {
    let auth = null;
    if (socialType === SocialTypes.GOOGLE) {
      auth = await verifyGoogleLogin(socialToken);
    } else if (socialType === SocialTypes.APPLE) {
      auth = await verifyAppleLogin(socialToken);
    } else {
      throw "Invalid Social Type";
    }

    const configuredValues = {
      sub: typeof auth !== "string" ? auth.sub ?? "" : "",
      email: typeof auth !== "string" ? auth.email ?? "" : null,
    };

    return next({
      ctx: {
        ...ctx,
        auth: configuredValues,
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid Token",
    });
  }
});

const verifyGoogleLogin = async (socialToken: string) => {
  const client = new OAuth2Client(env.oauth.google.clientId);
  const ticket = await client.verifyIdToken({
    idToken: socialToken,
    audience: env.oauth.google.clientId,
  });

  const payload = ticket.getPayload();

  if (typeof payload === "undefined") {
    throw "Invalid Token";
  }
  return payload;
};

const verifyAppleLogin = async (socialToken: string) => {
  const json = jwt.decode(socialToken, { complete: true });
  const kid = json?.header?.kid;
  if (!kid) {
    throw "Invalid Token";
  }

  const client = new JwksClient({
    jwksUri: `https://appleid.apple.com/auth/keys`,
  });

  const appleKey = await (await client.getSigningKey(kid)).getPublicKey();
  if (!appleKey) {
    throw "Invalid Token";
  }

  const payload = jwt.verify(socialToken, appleKey);

  if (!payload) {
    throw "Invalid Token";
  }
  return payload;
};
