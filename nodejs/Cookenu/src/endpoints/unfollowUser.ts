import { Request, Response } from "express";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";
import findTable from "../data/findTable";
import connection from "../connection";
import getUserById from '../data/getUserById';
import unfollow from './../data/unfollow';

const unfollowUser = async (req: Request, res: Response) => {
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
    const followersTb: string = `cookenu_followers_${followingId}`;
    const findFollowingTb = await findTable(followingsTb);
    if (!findFollowingTb){
      res.statusCode = 404;
      throw new Error(`This user is following nobody!`);
    }

    // Se usuário já está sendo seguido
    const findFollowing = await connection.raw(`
    SELECT * FROM ${followingsTb} WHERE following_id = "${followingId}"
    `);
    if (!findFollowing[0][0]){
      res.statusCode = 404
      throw new Error(`This user is not following ${followingId}!`);
    }

    // Enviando pro BD
    await unfollow(followingsTb, followingId, followersTb, tokenData.id);

    res
      .status(200)
      .send({ status: "Success!", message: `Unfollow ${followingUser.name}!` });
  } catch (error) {
    console.log(error.message)
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};

export default unfollowUser;
