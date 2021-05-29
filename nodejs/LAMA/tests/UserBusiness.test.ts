import { UserDatabase } from "../src/data/UserDatabase";
import { USER_ROLE } from "../src/model/User";
import { UserBusiness } from "./../src/business/UserBusiness";
import authenticatorMock from "./mocks/authenticatorMock";
import hashManagerMock from "./mocks/hashManagerMock";
import idGeneratorMock from "./mocks/idGeneratorMock";
import userDatabaseMock from "./mocks/userDatabaseMock";

const userBusiness = new UserBusiness(
  idGeneratorMock,
  authenticatorMock,
  hashManagerMock,
  userDatabaseMock as UserDatabase
);

describe("SignUp", () => {
  it("Should throw error when name is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        name: "",
        email: "admin@lama.com",
        password: "123456",
        role: USER_ROLE.ADMIN,
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when email is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        name: "admin",
        email: "",
        password: "123456",
        role: USER_ROLE.ADMIN,
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when password is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        name: "admin",
        email: "admin@lama.com",
        password: "",
        role: USER_ROLE.ADMIN,
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when password is invalid", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        name: "admin",
        email: "admin@lama.com",
        password: "123*456",
        role: USER_ROLE.NORMAL,
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Password must be at least 6 characters with letters and/or numbers and/or @,&,#,!"
      );
    }
  });

  it("Should throw error when role is invalid", async () => {
    expect.assertions(2);
    try {
      await userBusiness.signUp({
        name: "admin",
        email: "admin@lama.com",
        password: "123456",
        role: "USER",
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe(
        "Invalid user role. Choose between 'NORMAL' or 'ADMIN'"
      );
    }
  });

  it("Success", async () => {
    expect.assertions(1);
    try {
      const token = await userBusiness.signUp({
        name: "admin",
        email: "admin@lama.com",
        password: "123456",
        role: USER_ROLE.ADMIN,
      });

      expect(token).toBe("token");
    } catch (error) {
    }
  });
});

describe("login", () => {
  it("Should throw error when email is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({ email: "", password: "123456" });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when password is blank", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({ email: "admin@lama.com", password: "" });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe("Missing input");
    }
  });

  it("Should throw error when email is not found", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({ email: "abc@lama.com", password: "123456" });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Invalid credentials");
    }
  });

  it("Should throw error when password is incorrect", async () => {
    expect.assertions(2);
    try {
      await userBusiness.login({ email: "normal@lama.com", password: "blablabla" });
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Invalid credentials");
    }
  });

  it("Success", async () => {
    expect.assertions(1);
    try {
      const token = await userBusiness.login({ email: "normal@lama.com", password: "123456" });
      expect(token).toBe("token")
    } catch (error) {
    }
  });
});
