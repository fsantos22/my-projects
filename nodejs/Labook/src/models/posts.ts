export enum POST_TYPE {
  NORMAL = "normal",
  EVENT = "event",
}

export interface post {
  id: string;
  photo: string;
  description: string;
  createdAt: Date;
  type: POST_TYPE;
  authorId: string;
}

export interface createPostInputTDO {
  photo: string;
  description: string;
  type: POST_TYPE;
  token: string;
}

export const checkURL = (url:string):boolean => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export interface getPostByIdDTO {
  id: string;
  token: string;
}

export interface likeTDO {
  postId: string;
  userId: string;
}

export interface likeInputTDO {
  postId: string;
  token: string;
}

export interface commentTDO {
  id: string;
  postId: string;
  comment: string;
  createdAt: Date;
  authorId: string;
}

export interface commentInputTDO {
  postId: string;
  comment: string;
  token: string;
}
