import express from "express";
import { PostsController } from './../controller/PostsController';

export const postsRouter = express.Router()
const postsController = new PostsController()

postsRouter.post("/", postsController.createPost)
postsRouter.get("/feed", postsController.getFeed);
postsRouter.get("/filter", postsController.getPostByType);
postsRouter.post("/like", postsController.insertLike);
postsRouter.delete("/dislike", postsController.deleteLike);
postsRouter.post("/:postId/comment", postsController.createComment);
postsRouter.get("/show/:postId", postsController.getPostById);