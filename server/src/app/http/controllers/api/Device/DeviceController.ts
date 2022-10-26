import {
  protectedProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { DeviceService } from "../../../../services/DeviceService";
import { DeleteDeviceRequest } from "../../../requests/DeleteDeviceRequest";
import { PaginationRequest } from "../../../requests/PaginationRequest";
import { DevicesListResponse } from "../../../responses/DevicesListResponse";

export const DeviceController = trpcRouter({
  list: protectedProcedure.input(PaginationRequest).query(async ({ ctx }) => {
    const { user } = ctx;
    const device = await DeviceService.devices(user.id);

    return {
      status: true,
      data: DevicesListResponse(device),
    };
  }),
  delete: protectedProcedure
    .input(DeleteDeviceRequest)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { id } = input;
      const response = await DeviceService.delete(id, user.id);

      if (response.count === 0) {
        return {
          status: false,
          message: "device.device_not_found",
          // message: req.t("device.device_not_found"),
        };
      }

      return {
        status: true,
        message: "device.device_deleted",
        // message: req.t("device.device_deleted"),
      };
    }),
});
