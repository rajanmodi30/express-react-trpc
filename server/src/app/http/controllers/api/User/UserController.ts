import { Prisma } from "@prisma/client";
import {
  pagination,
  randomPasswordGenerator,
} from "../../../../../utils/utils";
import dbConnection from "../../../../providers/db";
import {
  protectedProcedure,
  trpcRouter,
} from "../../../../providers/trpcProviders";
import { SignUpService } from "../../../../services/SignUpService";
import { PaginationRequest } from "../../../requests/PaginationRequest";
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
      const userAlreadyExists = await SignUpService.checkIfUserExists(email);
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
});
