import { User } from "@prisma/client";

export const UserListResponse = (data: User[]) => {
  return data.map((d) => UserResponse(d));
};

export const UserResponse = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    fullName: user.firstName + " " + user.lastName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
