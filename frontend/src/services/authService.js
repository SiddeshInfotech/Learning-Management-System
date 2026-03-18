import api from '../lib/api';
import { API_ENDPOINTS } from '../constants/api';
export const authService = {
    async login(credentials) {
        const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
        return response.data;
    },
    async logout() {
        await api.post(API_ENDPOINTS.LOGOUT);
    },
    async refreshToken() {
        const response = await api.post(API_ENDPOINTS.REFRESH);
        return response.data;
    },
};
