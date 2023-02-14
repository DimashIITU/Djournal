import { AxiosInstance } from 'axios';
import { CommentDto, CreateCommentDto } from './types';
export const CommentsApi = (instance: AxiosInstance) => ({
  async getAll(postId?: number) {
    const { data } = await instance.get<number, { data: CommentDto[] }>('comments', {
      params: { postId },
    });
    return data;
  },
  async create(obj: CreateCommentDto) {
    const { data } = await instance.post<CreateCommentDto, { data: CommentDto }>('comments', obj);
    return data;
  },
  async delete(id: number) {
    await instance.delete<any, { data: CommentDto }>(`comments/${id}`);
  },
  //   async getOne(id: number) {
  //     const { data } = await instance.get<any, { data: PostDto }>(`posts/${id}`);
  //     return data;
  //   },
  //   async update(id: number, dto) {
  //     const { data } = await instance.patch(`posts/${id}`, dto);
  //   },
});
