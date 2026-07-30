import type { User, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export class UserService {
  async getById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch user ${id}`);
    const json: ApiResponse<User> = await response.json();
    return json.data;
  }

  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const json: ApiResponse<User[]> = await response.json();
    return json.data;
  }

  async update(id: string, payload: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Failed to update user ${id}`);
    const json: ApiResponse<User> = await response.json();
    return json.data;
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete user ${id}`);
  }
}

export const userService = new UserService();
