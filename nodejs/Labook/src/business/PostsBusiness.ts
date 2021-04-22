import { CustomError } from "../errors/CustomError";
import { IdGenerator } from "../services/IdGenerator";
import {
  checkURL,
  commentInputTDO,
  commentTDO,
  createPostInputTDO,
  getPostByIdDTO,
  likeInputTDO,
  likeTDO,
  post,
  POST_TYPE,
} from "./../models/posts";
import { Auth } from "./../services/Auth";
import { PostsDB } from "./../data/PostsDB";

export class PostsBusiness {
  async createPost(input: createPostInputTDO): Promise<void> {
    try {
      const { photo, description, type = POST_TYPE.NORMAL, token } = input;

      const auth = new Auth();
      const tokenData: any = auth.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized or JWT not found!");
      }

      if (!photo || !description || !type) {
        throw new CustomError(417, "Missing input. Check body request.");
      }

      const isValidPhoto = checkURL(photo);
      if (!isValidPhoto) {
        throw new CustomError(422, "Photo url must contain a jpeg, jpg, gif or png file!");
      }

      if (description.length < 3) {
        throw new CustomError(
          422,
          "Description must be at least 3 characters!"
        );
      }

      if (!(type.toUpperCase() in POST_TYPE)) {
        throw new CustomError(422, "Type must be 'event' or 'normal'!");
      }

      const idGenerator = new IdGenerator();
      const id: string = idGenerator.generateId();

      const post: post = {
        id,
        photo,
        description,
        createdAt: new Date(),
        type,
        authorId: tokenData?.id!,
      };

      const postsDB = new PostsDB();
      await postsDB.insertPost(post);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPostById(input: getPostByIdDTO): Promise<post> {
    try {
      const { id, token } = input;

      const auth = new Auth();
      const tokenData: any = auth.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized or JWT not found!");
      }

      const postsDB = new PostsDB();
      const post = await postsDB.getPostById(id);
      if (!post) {
        throw new CustomError(404, "Post not found!");
      }
      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getFeed(token: string, page: number): Promise<any> {
    try {
      const auth = new Auth();
      const tokenData: any = auth.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized or JWT not found!");
      }

      const postsDB = new PostsDB();
      const feed = await postsDB.getFeed(tokenData.id, page);

      return feed;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPostByType(type: string): Promise<any> {
    try {
      console.log("type", type);
      if (type.toLowerCase() !== "normal" && type.toLowerCase() !== "event") {
        throw new CustomError(
          422,
          "Invalid post type. Choose between 'normal or 'event'!"
        );
      }

      const postsDB = new PostsDB();
      const feed = await postsDB.getPostsByType(type);
      if (!feed) {
        throw new CustomError(404, "Posts not found!");
      }
      return feed;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async insertLike(input: likeInputTDO): Promise<void> {
    try {
      const { postId, token } = input;

      const auth = new Auth();
      const tokenData: any = auth.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized or JWT not found!");
      }

      if (!postId) {
        throw new CustomError(417, "Missing input. Check body request.");
      }

      const postsDB = new PostsDB();
      const post = await postsDB.getPostById(postId);
      if (!post) {
        throw new CustomError(404, "Post not found!");
      }

      const isLiked = await postsDB.checkLike({ postId, userId: tokenData.id });
      if (isLiked) {
        throw new CustomError(409, "You already liked this post!");
      }

      const like: likeTDO = {
        postId,
        userId: tokenData.id,
      };

      await postsDB.insertLike(like);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteLike(input: likeInputTDO): Promise<void> {
    try {
      const { postId, token } = input;

      const auth = new Auth();
      const tokenData: any = auth.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized or JWT not found!");
      }

      if (!postId) {
        throw new CustomError(417, "Missing input. Check body request.");
      }

      const postsDB = new PostsDB();
      const post = await postsDB.getPostById(postId);
      if (!post) {
        throw new CustomError(404, "Post not found!");
      }

      const isLiked = await postsDB.checkLike({ postId, userId: tokenData.id });
      if (!isLiked) {
        throw new CustomError(409, "You didn't like this post yet!");
      }

      const like: likeTDO = {
        postId,
        userId: tokenData.id,
      };

      await postsDB.deleteLike(like);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createComment(input: commentInputTDO): Promise<void> {
    try {
      const { postId, comment, token } = input;

      const auth = new Auth();
      const tokenData: any = auth.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(401, "Unauthorized or JWT not found!");
      }

      if (!comment) {
        throw new CustomError(417, "Missing input. Check body request.");
      }

      const idGenerator = new IdGenerator();
      const id: string = idGenerator.generateId();

      const userComment: commentTDO = {
        id,
        postId,
        comment,
        createdAt: new Date(),
        authorId: tokenData.id,
      };

      const postsDB = new PostsDB();
      await postsDB.insertComment(userComment);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
