import { AxiosInstance } from 'axios';
import { ResponseUser, SignInDto, SignUpDto } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: SignInDto) {
    const { data } = await instance.post<SignInDto, { data: ResponseUser }>('auth/register', dto);
    return data;
  },
  async login(dto: SignUpDto) {
    const { data } = await instance.post<SignUpDto, { data: ResponseUser }>('auth/login', dto);
    return data;
  },
  async preAuth() {
    const { data } = await instance.get<any, { data: ResponseUser }>('users/me');
    return data;
  },
  async getAll() {
    const { data } = await instance.get<any, { data: ResponseUser }>('users');
    return data;
  },
});
