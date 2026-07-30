import { useState, useCallback } from 'react';
import type { Product } from '../types';
import { productService } from '../services/ProductService';

interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  hasError: boolean;
  fetchProduct: (id: string) => Promise<void>;
  updateStock: (id: string, delta: number) => Promise<void>;
}

export function useProduct(): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchProduct = useCallback(async (id: string) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const result = await productService.getById(id);
      setProduct(result);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStock = useCallback(async (id: string, delta: number) => {
    try {
      const updated = await productService.updateStock(id, delta);
      setProduct(updated);
    } catch {
      setHasError(true);
    }
  }, []);

  return { product, isLoading, hasError, fetchProduct, updateStock };
}
