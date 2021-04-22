import express from "express";
import { UsersController } from '../controller/UsersController';

export const usersRouter = express.Router();
const userController = new UsersController()

usersRouter.post("/signup", userController.signup);
usersRouter.post("/login", userController.login);
usersRouter.post("/friend", userController.makeFriendship);
usersRouter.delete("/unfriend", userController.undoFriendship);
