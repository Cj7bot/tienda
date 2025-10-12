import { writable, derived } from 'svelte/store';
import { ProductsService, type Product, type ApiResponse } from '$lib/services/productsService';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedCategory: 'all'
};

export const productsStore = writable<ProductsState>(initialState);

export const products = derived(productsStore, ($store) => $store.products);
export const loading = derived(productsStore, ($store) => $store.loading);
export const error = derived(productsStore, ($store) => $store.error);
export const selectedCategory = derived(productsStore, ($store) => $store.selectedCategory);

export const filteredProducts = derived(
  [productsStore],
  ([$store]) => {
    if ($store.selectedCategory === 'all') {
      return $store.products;
    }
    return $store.products.filter(product => 
      product.categoria === $store.selectedCategory
    );
  }
);

export async function loadProducts(): Promise<void> {
  productsStore.update(state => ({ ...state, loading: true, error: null }));
  
  try {
    const response: ApiResponse<Product[]> = await ProductsService.getProducts();
    
    if (response.error) {
      productsStore.update(state => ({
        ...state,
        loading: false,
        error: response.error || 'Error al cargar productos'
      }));
      return;
    }

    productsStore.update(state => ({
      ...state,
      products: response.data,
      loading: false,
      error: null
    }));
  } catch (err) {
    console.error('Error in loadProducts:', err);
    productsStore.update(state => ({
      ...state,
      loading: false,
      error: err instanceof Error ? err.message : 'Error inesperado'
    }));
  }
}

export function setSelectedCategory(category: string): void {
  productsStore.update(state => ({ ...state, selectedCategory: category }));
}

export function clearError(): void {
  productsStore.update(state => ({ ...state, error: null }));
}