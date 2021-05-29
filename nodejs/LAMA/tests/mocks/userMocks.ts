import { User, USER_ROLE } from "../../src/model/User";

export const normalUserMock = new User(
  "id",
  "normal",
  "normal@lama.com",
  "123456",
  USER_ROLE.NORMAL
); 

export const adminUserMock = new User(
  "id",
  "admin",
  "admin@lama.com",
  "123456",
  USER_ROLE.ADMIN
); 