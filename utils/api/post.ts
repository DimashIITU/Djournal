import { AxiosInstance } from 'axios';
import { PostDto, CreatePostDto, SearchDto } from './types';
export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<any, { data: PostDto }>('posts');
    return data;
  },
  async create(post: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostDto }>('posts', post);
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<any, { data: PostDto }>(`posts/${id}`);
    return data;
  },
  async update(id: number, dto) {
    const { data } = await instance.patch(`posts/${id}`, dto);
  },
  async search(query: SearchDto) {
    const { data } = await instance.get('posts/search', { params: query });
    return data;
  },
});
