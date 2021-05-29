export type authenticationData = {
  id: string;
  role: string;
};

export type signUpType = {
  email: string;
  name: string;
  password: string;
  role: string;
}

export enum signUpBody {
  email = "email",
  name = "name",
  password = "password"
}

export type loginType = {
  email: string;
  password: string;
};

export enum loginBody {
  email = "email",
  password = "password",
}

export type recipeType = {
  title: string;
  description: string;
};

export enum recipeBody {
  title = "email",
  description = "password"
}