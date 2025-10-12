interface Product {
  id: number;
  id_producto?: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: string | number;  // ← Puede ser string o number
  stock: number;
  categoria: string;
  imagen: string | null;    // ← Puede ser null
  estado?: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

import { API_URL } from '$lib/config/api';

export class ProductsService {
  static async getProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(`${API_URL}/catalog/by-category?category=all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const products = Array.isArray(data) ? data : data.products || data.member || [];
      
      return {
        data: products,
        error: undefined
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // 🔧 FALLBACK: Usar datos mock si el backend no está disponible
      if (error instanceof Error && error.message.includes('fetch')) {
        return {
          data: this.getMockProducts(),
          error: undefined
        };
      }
      
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // 🔧 DATOS MOCK TEMPORALES
  private static getMockProducts(): Product[] {
    return [
      {
        id: 1,
        id_producto: 1,
        codigo: 'MOCK001',
        nombre: 'Producto Demo 1',
        descripcion: 'Este es un producto de demostración mientras configuras tu backend',
        precio: 29.99,
        stock: 100,
        categoria: 'superfood_powders',
        imagen: '/placeholder-product.jpg',
        estado: 'activo'
      },
      {
        id: 2,
        id_producto: 2,
        codigo: 'MOCK002',
        nombre: 'Producto Demo 2',
        descripcion: 'Otro producto de demostración',
        precio: 39.99,
        stock: 50,
        categoria: 'capsules',
        imagen: '/placeholder-product.jpg',
        estado: 'activo'
      },
      {
        id: 3,
        id_producto: 3,
        codigo: 'MOCK003',
        nombre: 'Producto Demo 3',
        descripcion: 'Tercer producto de demostración',
        precio: 19.99,
        stock: 75,
        categoria: 'herbal_teas',
        imagen: '/placeholder-product.jpg',
        estado: 'activo'
      }
    ];
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