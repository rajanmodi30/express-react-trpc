import { Request, Response } from "express";
import { pagination } from "../../../../../utils/utils";
import dbConnection from "../../../../providers/db";
import {
  protectedProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { IdRequest } from "../../../requests/IdRequest";
import { PaginationRequest } from "../../../requests/PaginationRequest";
import { NotificationResponse } from "../../../responses/NotificationResponse";

export const NotificationController = trpcRouter({
  index: protectedProcedure
    .input(PaginationRequest)
    .query(async ({ ctx, input }) => {
      const { user } = ctx;
      const { page, perPage } = input;

      const totalCount = await dbConnection.notification.count({
        where: {
          userId: user.id,
        },
      });

      const notifications =
        totalCount > 0
          ? await dbConnection.notification.findMany({
              where: {
                userId: user.id,
              },
              skip: perPage * (page - 1),
              take: perPage,
            })
          : [];

      if (notifications.length > 0) {
        await dbConnection.notification.updateMany({
          where: {
            userId: user.id,
            readAt: null,
          },
          data: {
            readAt: new Date(),
          },
        });
      }

      return {
        status: true,
        data: NotificationResponse(notifications),
        pagination: pagination(totalCount, perPage, page),
      };
    }),
  delete: protectedProcedure
    .input(IdRequest)
    .mutation(async ({ ctx, input }) => {
      const { user, locales } = ctx;
      const { id } = input;

      await dbConnection.notification.deleteMany({
        where: {
          id: id,
          userId: user.id,
        },
      });

      return {
        status: true,
        message: locales("user.single_notification_deleted"),
      };
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const { user, locales } = ctx;

    await dbConnection.notification.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return {
      status: true,
      message: locales("user.single_notification_deleted"),
    };
  }),
});
