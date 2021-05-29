import { CustomError } from "../../src/error/CustomError";

export class AuthenticatorMock {
  public generateToken(input: AuthenticationData): string {
    return 'token';
  }

  public getData(token: string): AuthenticationData {
    if (!token) throw new CustomError(401, "Unauthorized!");
    return {
      id: "id",
      role: token === "ADMIN" ? "ADMIN" : "NORMAL",
    };
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}

export default new AuthenticatorMock()