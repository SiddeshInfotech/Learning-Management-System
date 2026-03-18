export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
  token: string | null;
}