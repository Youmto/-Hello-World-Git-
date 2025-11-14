// ============================================
// FICHIER 5: src/components/cart/RecommendedProducts.jsx
// Cross-sell intelligent
// ============================================

import React from 'react';
import { Sparkles } from 'lucide-react';
import ProductCard from '../home/ProductCard';
import { products } from '../../data/products';

function RecommendedProducts() {
  // Prendre 4 produits aléatoires (mockés)
  const recommended = products.slice(0, 4);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-gray-900">
          Vous pourriez aussi aimer
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommended.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;