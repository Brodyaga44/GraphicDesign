export interface User {
  id: string;
  login: string;
  password: string;
  name: string;
  about?: string;
  skills?: string;
  directions?: string[];
  works?: any[];
}

export interface RegisterFormData {
  login: string;
  password: string;
  name: string;
  about?: string;
  skills?: string;
  directions?: string[];
  works?: any[];
}

export interface AuthResponse {
  user: User;
  token: string;
} 