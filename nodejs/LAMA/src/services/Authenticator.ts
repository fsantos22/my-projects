import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
  private static expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!;

  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}

export default new Authenticator();
