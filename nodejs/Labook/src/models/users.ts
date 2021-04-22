import { post } from "./posts";

export enum USER_ROLES {
  NORMAL = "normal",
  ADMIN = "admin",
}

export interface authenticationData {
  id: string;
  role: USER_ROLES;
}

export interface user extends authenticationData {
  name: string;
  email: string;
  password: string;
  posts?: post[];
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export interface signupInputDTO {
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
}

export interface loginInputDTO {
  email: string;
  password: string;
}

export interface friendship {
  id: string;
  userId: string;
  friendId: string;
}

export interface findFriendInput {
  userId: string;
  friendId: string;
}

export interface friendshipInputDTO {
  friendId: string;
  token: string;
}

export interface friend {
  id: string;
  friend_id: string;
}
