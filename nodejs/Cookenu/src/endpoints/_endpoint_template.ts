import { Request, Response } from "express";

const endpoint_template = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default endpoint_template;
