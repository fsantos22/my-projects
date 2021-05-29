import {
  UserInputDTO,
  LoginInputDTO,
  validatePassword,
  User,
} from "../model/User";
import userDatabase, { UserDatabase } from "../data/UserDatabase";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import hashManager, { HashManager } from "../services/HashManager";
import authenticator, { Authenticator } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";
import { validateEmail } from "./../model/User";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private userDatabase: UserDatabase
  ) {}

  async signUp(user: UserInputDTO) {
    try {
      const { name, email, password, role } = user;

      if (!name || !email || !password) {
        throw new CustomError(422, "Missing input");
      }

      if (!validateEmail(email)) {
        throw new CustomError(422, "Invalid e-mail type");
      }

      if (!validatePassword(password) || password.length < 6) {
        throw new CustomError(
          422,
          "Password must be at least 6 characters with letters and/or numbers and/or @,&,#,!"
        );
      }

      const id = this.idGenerator.generate();

      const hashPassword = await this.hashManager.hash(user.password);

      await this.userDatabase.signUp(
        new User(id, name, email, hashPassword, User.stringToUSER_ROLE(role))
      );

      const token = this.authenticator.generateToken({
        id,
        role,
      });
      return token;

    } catch (error) {
      if (error.message.includes("key 'email'")) {
        throw new CustomError(409, "Email already in use");
      }

      throw new CustomError(error.statusCode, error.message);
    }
  }

  async login(user: LoginInputDTO) {
    try {
      const { email, password } = user;
      if (!email || !password) {
        throw new CustomError(422, "Missing input");
      }
      const userFromDB = await this.userDatabase.getUserByEmail(email);

      if (userFromDB === undefined) {
        throw new CustomError(401, "Invalid credentials");
      }

      const hashCompare = await this.hashManager.compare(
        user.password,
        userFromDB.getPassword()
      );

      if (!hashCompare) {
        throw new CustomError(401, "Invalid credentials")
      }

      const token = this.authenticator.generateToken({
        id: userFromDB.getId(),
        role: userFromDB.getRole(),
      });

      return token;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new UserBusiness(
  idGenerator,
  authenticator,
  hashManager,
  userDatabase
);
