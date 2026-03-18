import api from '../lib/api';
import { LoginRequest, LoginResponse } from '../types/auth';
import { API_ENDPOINTS } from '../constants/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post(API_ENDPOINTS.LOGOUT);
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post(API_ENDPOINTS.REFRESH);
    return response.data;
  },
};