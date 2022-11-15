import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC } from "@trpc/server";
import i18next from "i18next";

// created for each request
export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn

  let bearerToken = req.headers["authorization"];
  const language = req.headers["accept-language"];
  if (bearerToken) {
    bearerToken = bearerToken.split(" ")[1];
  }

  let resetToken = undefined;
  if (
    req.query.resetToken !== "undefined" &&
    typeof req.query.resetToken === "string"
  ) {
    resetToken = req.query.resetToken;
  } else if (
    req.body.resetToken !== "undefined" &&
    typeof req.body.resetToken === "string"
  ) {
    resetToken = req.body.resetToken;
  }

  const locales = (string: string) => {
    if (language !== undefined) {
      i18next.changeLanguage(language);
    }
    return i18next.t(string);
  };

  const { socialType, socialToken } = req.body;

  return {
    bearerToken,
    resetToken,
    language,
    locales,
    socialType,
    socialToken,
  };
}

//Context that can be imported everywhere
export type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
