import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/register", bandController.registerBand);
bandRouter.get("/search", bandController.searchBand);
