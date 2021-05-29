import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import userBusiness from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            const {email, password, name, role} = req.body

            const input: UserInputDTO = { email, password, name, role };

            const token = await userBusiness.signUp(input);

            res.status(201).send({ token });

        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const {email, password} = req.body

            const input: LoginInputDTO = { email, password };

            const token = await userBusiness.login(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}