import React from 'react';
import type { Product } from '../types';

interface ProductBadgeProps {
  product: Product;
}

export function ProductBadge({ product }: ProductBadgeProps): JSX.Element {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 5;

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        isOutOfStock ? 'bg-red-100 text-red-700' : '',
        isLowStock ? 'bg-yellow-100 text-yellow-700' : '',
        !isOutOfStock && !isLowStock ? 'bg-green-100 text-green-700' : '',
      ].join(' ')}
    >
      {isOutOfStock ? 'Out of stock' : `${product.stock} left`}
    </span>
  );
}
