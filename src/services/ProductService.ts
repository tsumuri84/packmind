import type { Product, PaginatedResponse, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export class ProductService {
  async getAll(page = 1, pageSize = 20): Promise<PaginatedResponse<Product>> {
    const response = await fetch(
      `${API_BASE_URL}/products?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error(`Product ${id} not found`);
    const json: ApiResponse<Product> = await response.json();
    return json.data;
  }

  async create(payload: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create product');
    const json: ApiResponse<Product> = await response.json();
    return json.data;
  }

  async updateStock(id: string, delta: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta }),
    });
    if (!response.ok) throw new Error(`Failed to update stock for ${id}`);
    const json: ApiResponse<Product> = await response.json();
    return json.data;
  }
}

export const productService = new ProductService();
