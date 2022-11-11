import {
  protectedProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { UploadRequest } from "../../../requests/UploadRequest";
import { GetSignedUrl } from "../../../../../libs/s3/s3";

export const UploadController = trpcRouter({
  linkGenerate: protectedProcedure
    .input(UploadRequest)
    .mutation(async ({ input }) => {
      const { destination, name, type } = input;
      const { key, url } = await GetSignedUrl(`${destination}\\${name}`, type);

      return {
        status: true,
        data: {
          key,
          url,
        },
      };
    }),
});
