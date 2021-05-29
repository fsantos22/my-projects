import { Request, Response } from "express";
import bandBusiness from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { registerBandInputDTO } from "../model/Band";

export class BandController {
  async registerBand(req: Request, res: Response) {
    try {
      const { name, genre, responsible } = req.body;
      const token = req.headers.authorization!;

      const input: registerBandInputDTO = { name, genre, responsible, token };

      await bandBusiness.registerBand(input);

      res.status(201).send({ message: "Band registered!" });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async searchBand(req: Request, res: Response) {
    try {
      const { id, name } = req.query;
      const result = await bandBusiness.searchBand(
        id as string,
        name as string
      );
      res.status(200).send({ result });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
