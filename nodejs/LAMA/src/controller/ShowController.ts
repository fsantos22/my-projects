import { Request, Response } from "express";
import showBusiness from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { registerShowInputDTO } from "../model/Show";

export class ShowController {
  async registerShow(req: Request, res: Response) {
    try {
      const { bandId, day, startTime, endTime } = req.body;
      const token: string = req.headers.authorization!;
      const input: registerShowInputDTO = {
        bandId,
        day,
        startTime,
        endTime,
        token,
      };
      await showBusiness.registerShow(input);
      res.status(201).send({ message: "Success!" });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }

  async getShowsByDay(req: Request, res: Response) {
    try {
      const { day } = req.params;

      const shows = await showBusiness.getShowsByDay(day);
      res.status(200).send({ shows });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}
