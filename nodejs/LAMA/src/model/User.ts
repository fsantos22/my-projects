import { CustomError } from "../error/CustomError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLE = USER_ROLE.NORMAL
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setRole(role: USER_ROLE) {
    this.role = role;
  }

  static stringToUSER_ROLE(input: string): USER_ROLE {
    switch (input.toUpperCase()) {
      case "NORMAL":
        return USER_ROLE.NORMAL;
      case "ADMIN":
        return USER_ROLE.ADMIN;
      default:
        throw new CustomError(422,"Invalid user role. Choose between 'NORMAL' or 'ADMIN'");
    }
  }

  static toUserModel(user?: any): User | undefined {
    return (user && new User(
      user.user_id,
      user.name,
      user.email,
      user.password,
      User.stringToUSER_ROLE(user.role)
    ))
  }
}

export interface UserInputDTO {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export enum USER_ROLE {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export const validateEmail = (email: string):boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validatePassword = (password:string):boolean => {
    const regex = /^[^*|\":<>[\]{}`\\/()';\s]+$/;
    return regex.test(password);
}
