import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

const USERS: Prisma.UserCreateInput[] = [];

export async function createUser(): Promise<Prisma.UserCreateInput> {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: await bcrypt.hashSync("12345678"),
    createdAt: faker.date.between(
      dayjs().subtract(10, "y").toISOString(),
      dayjs().toISOString()
    ),
  };
}

export const users = async (count: number) => {
  for (let i = 0; i < count; i++) {
    USERS.push(await createUser());
  }
  return USERS;
};
