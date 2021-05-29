import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";
import getUserById from "./../data/getUserById";
import delUser from "./../data/delUser";
import delTable from "./../data/delTable";
import findTable from "./../data/findTable";

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(token);

    if (!tokenData || tokenData?.role !== "admin") {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    const user = await getUserById(id);
    if (!user) {
      res.statusCode = 404;
      throw new Error("User not found!");
    }

    // Enviando pro BD
    const followingTable = await findTable(`cookenu_following_${id}`);
    if (followingTable) {
      await delTable(id);
    }
    await delUser(id);

    res.status(200).send({ status: "Success!", message: `User ${user.name} removed!` });
  } catch (error) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default deleteUser;
