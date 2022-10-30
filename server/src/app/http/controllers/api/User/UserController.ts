import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  pagination,
  randomPasswordGenerator,
} from "../../../../../utils/utils";
import dbConnection from "../../../../providers/db";
import {
  protectedProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { PaginationRequest } from "../../../requests/PaginationRequest";
import { UpdateUserRequest } from "../../../requests/UpdateUserRequest";
import { UserDetailsRequest } from "../../../requests/UserDetailsRequest";
import { UserStoreRequest } from "../../../requests/UserStoreRequest";
import {
  UserResponse,
  UserListResponse,
} from "../../../responses/UserResponse";

export const UserController = trpcRouter({
  list: protectedProcedure
    .input(PaginationRequest)
    .query(async ({ input, ctx }) => {
      const { user } = ctx;
      const { perPage, page, sortBy, sortType, search } = input;
      console.log(perPage, page);

      let sort: any = {
        id: "desc",
      };

      let searchQuery: Prisma.UserWhereInput = {
        deletedAt: null,
        NOT: {
          id: user.id,
        },
      };

      // if (status !== undefined) {
      //   if (status === "ALL") {
      //     status = [ACCOUNT_STATUS.ACTIVE, ACCOUNT_STATUS.INACTIVE];
      //   } else {
      //     status = [status];
      //   }

      //   searchQuery = {
      //     ...searchQuery,
      //     status: {
      //       in: status,
      //     },
      //   };
      // }

      if (
        search !== undefined &&
        typeof search === "string" &&
        search.length !== 0
      ) {
        searchQuery = {
          ...searchQuery,
          AND: {
            OR: [
              {
                firstName: {
                  contains: search,
                },
              },
              {
                lastName: {
                  contains: search,
                },
              },
              {
                email: {
                  contains: search,
                },
              },
            ],
          },
        };
      }

      const totalCount = await dbConnection.user.count({
        where: searchQuery,
      });
      if (sortBy !== undefined) {
        sort = {
          [sortBy]: sortType,
        };
      }

      let findManyQuery: Prisma.UserFindManyArgs = {
        where: searchQuery,
        orderBy: sort,
      };

      // if (exportType === undefined) {
      findManyQuery = {
        ...findManyQuery,
        skip: perPage * page,
        take: perPage,
      };
      // }

      const users: any =
        totalCount > 0 ? await dbConnection.user.findMany(findManyQuery) : [];

      // if (exportType !== undefined) {
      //   const buffer = await ExportUsersList(exportType, users);

      //   res.statusCode = 200;
      //   res.setHeader(
      //     "Content-Disposition",
      //     `attachment; filename="export.${exportType}"`
      //   );
      //   res.setHeader("Content-Type", `${exportContentType(exportType)}`);
      //   return res.send(buffer);
      // }
      return {
        status: true,
        data: UserListResponse(users),
        pagination: pagination(totalCount, perPage, page),
      };
    }),
  store: protectedProcedure
    .input(UserStoreRequest)
    .mutation(async ({ input }) => {
      const { email } = input;
      const userAlreadyExists = await dbConnection.user.findFirst({
        where: {
          email,
        },
      });

      console.log(userAlreadyExists);

      if (userAlreadyExists) {
        return {
          status: false,
          message: "User Exists",
        };
      }
      const password = randomPasswordGenerator();
      const user = await dbConnection.user.create({
        data: {
          ...input,
          password,
        },
      });

      return {
        status: true,
        message: "User Added",
        user: UserResponse(user),
      };
    }),
  details: protectedProcedure
    .input(UserDetailsRequest)
    .query(async ({ input }) => {
      const { id } = input;

      const findUser = await dbConnection.user.findFirst({
        where: {
          id,
        },
      });

      if (!findUser) {
        throw new TRPCError({
          message: "User not found",
          code: "BAD_REQUEST",
        });
      }

      return {
        status: true,
        data: UserResponse(findUser),
      };
    }),
  update: protectedProcedure
    .input(UpdateUserRequest)
    .mutation(async ({ input }) => {
      const { id, firstName, lastName, email } = input;

      const findUser = await dbConnection.user.findFirst({
        where: {
          id,
        },
      });

      if (!findUser) {
        throw new TRPCError({
          message: "User not found",
          code: "BAD_REQUEST",
        });
      }

      const updatedUser = await dbConnection.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          email,
        },
      });

      return {
        status: true,
        message: "User updated",
        data: UserResponse(updatedUser),
      };
    }),
});
