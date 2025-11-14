// ============================================
// FICHIER 5: src/components/product/RelatedProducts.jsx
// Produits similaires avec scroll horizontal
// ============================================

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../home/ProductCard';
import { products } from '../../data/products';

function RelatedProducts({ currentProductId, categoryId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Filtrer les produits de la même catégorie (mockés pour la démo)
    const related = products
      .filter(p => p.id !== currentProductId)
      .slice(0, 8);
    setRelatedProducts(related);
  }, [currentProductId, categoryId]);

  const scroll = (direction) => {
    const container = document.getElementById('related-products-scroll');
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Produits similaires</h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        id="related-products-scroll"
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {relatedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;