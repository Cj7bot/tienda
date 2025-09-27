interface Product {
  id: number;
  id_producto: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
  estado: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

import { API_URL } from '$lib/config/api';

export class ProductsService {
  static async getProducts(): Promise<ApiResponse<Product[]>> {
    try {
      console.log('Fetching from:', `${API_URL}/catalog/by-category?category=all`);
      const response = await fetch(`${API_URL}/catalog/by-category?category=all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      const products = Array.isArray(data) ? data : data.products || data.member || [];
      console.log('Processed products:', products.length);
      
      return {
        data: products,
        error: undefined
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  static async getProduct(id: string): Promise<ApiResponse<Product | null>> {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        data: data || null,
        error: undefined
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }
}

export type { Product, ApiResponse };