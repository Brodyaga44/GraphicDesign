import axios from 'axios';
import { RegisterFormData, AuthResponse } from '../model/types';

const API_URL = 'http://localhost:3000';

export const authApi = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/users`, {
      ...data,
      id: Math.random().toString(36).substring(2, 6), // Генерируем случайный ID
      directions: [],
      works: [],
    });
    
    // In a real app, you would get a token from the server
    const token = 'dummy-token-' + Math.random();
    
    return {
      user: response.data,
      token,
    };
  },
}; 