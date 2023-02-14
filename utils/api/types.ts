import { OutputData } from '@editorjs/editorjs';
export type SignInDto = {
  fullName: string;
} & SignUpDto;

export type SignUpDto = {
  email: string;
  password: string;
};

export type ResponseUser = {
  commentsCount?: number;
  email: string;
  fullName: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  access_token: string;
};
export type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
  tags?: string | null;
};
export type PostDto = {
  view: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  id: number;
  user: ResponseUser;
} & CreatePostDto;

export type SearchDto = {
  id?: number;
  text?: string;
  title?: string;
};

export type CommentDto = {
  id: number;
  user: ResponseUser;
  post: PostDto;
  text: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateCommentDto = {
  text: string;
  postId: number;
};
