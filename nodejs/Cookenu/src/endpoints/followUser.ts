import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";
import findTable from "./../data/findTable";
import addFollower from "./../data/addFollower";
import { generateId } from "./../services/generateId";
import connection from "./../connection";
import getUserById from './../data/getUserById';

const followUser = async (req: Request, res: Response) => {
  try {
    // Body
    const { followingId } = req.body;

    // Token
    const token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(token);
    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Unauthorized!");
    }

    // Se usuário encontra-se no BD
    const followingUser = await getUserById(followingId);
    if (!followingUser) {
      res.statusCode = 404;
      throw new Error(`User not found!`);
    }

    // Tabela de usuários seguidos e de seguidores
    const followingsTb: string = `cookenu_following_${tokenData?.id}`;
    const findFollowingTb = await findTable(followingsTb);
    if (!findFollowingTb) {
      await connection.raw(`
      CREATE TABLE cookenu_following_${tokenData?.id} 
      (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES cookenu_users(user_id)
        ON DELETE CASCADE
        )
      `);
    }

    const followersTb: string = `cookenu_followers_${followingId}`;
    const findFollowersTb = await findTable(followersTb);
    if (!findFollowersTb) {
      await connection.raw(`
      CREATE TABLE cookenu_followers_${followingId} 
      (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES cookenu_users(user_id)
        ON DELETE CASCADE
        )
      `);
    }

    // Se usuário já está sendo seguido
    const findFollowing = await connection.raw(`
    SELECT * FROM ${followingsTb} WHERE user_id = "${followingId}"
    `);
    if (findFollowing[0][0]){
      res.statusCode = 409
      throw new Error("This user has already been followed!")
    }
    
    // Gerando ID aleatório
    const actionId: string = generateId();

    // Enviando pro BD
    await addFollower(followingsTb, actionId, followingId);
    await addFollower(followersTb, actionId, tokenData?.id!);

    res
      .status(201)
      .send({ status: "Success!", message: `Following ${followingUser.name}!` });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default followUser;
