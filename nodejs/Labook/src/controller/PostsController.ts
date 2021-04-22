import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import {
  commentInputTDO,
  createPostInputTDO,
  getPostByIdDTO,
  likeInputTDO,
  post,
} from "./../models/posts";

export class PostsController {
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "Success!";
      const token: string = req.headers.authorization as string;
      const { photo, description, type } = req.body;
      const input: createPostInputTDO = { photo, description, type, token };

      const postsBusiness = new PostsBusiness();
      await postsBusiness.createPost(input);

      res.status(201).send({ message });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "Success!";
      const token: string = req.headers.authorization as string;
      const { postId } = req.params;
      const input: getPostByIdDTO = { id: postId, token };

      const postsBusiness = new PostsBusiness();
      const post: post = await postsBusiness.getPostById(input);

      res.send({ message, post });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }

  async getFeed(req: Request, res: Response): Promise<any> {
    try {
      let message: string = "Success!";
      const token: string = req.headers.authorization as string;
      const {page} = req.query

      const postsBusiness = new PostsBusiness();
      const feed: post[] = await postsBusiness.getFeed(token,Number(page));

      res.status(201).send({ message, feed });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }

  async getPostByType(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "Success!";
      const { type } = req.query;

      const postsBusiness = new PostsBusiness();
      const feed: post = await postsBusiness.getPostByType(type!.toString());

      res.send({ message, feed });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }

  async insertLike(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "Success!";
      const token: string = req.headers.authorization as string;
      const { postId } = req.body;
      const input: likeInputTDO = { postId, token };

      const postsBusiness = new PostsBusiness();
      await postsBusiness.insertLike(input);

      res.send({ message });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }

  async deleteLike(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "Success!";
      const token: string = req.headers.authorization as string;
      const { postId } = req.body;
      const input: likeInputTDO = { postId, token };

      const postsBusiness = new PostsBusiness();
      await postsBusiness.deleteLike(input);

      res.send({ message });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }

  async createComment(req: Request, res: Response): Promise<void> {
    try {
      let message: string = "Success!";
      const token: string = req.headers.authorization as string;
      const { postId } = req.params;
      const { comment } = req.body;
      const input: commentInputTDO = { postId, comment, token };

      const postsBusiness = new PostsBusiness();
      await postsBusiness.createComment(input);

      res.status(201).send({ message });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;
      res.send({ message });
    }
  }
}
