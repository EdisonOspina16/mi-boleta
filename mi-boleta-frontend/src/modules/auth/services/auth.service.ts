import { api } from './api';
import { AuthResponse } from '@/types';

export const authService = {
  login: async (credentials: any) => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data.data;
  },
  register: async (userData: any) => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    return data.data;
  },
};
