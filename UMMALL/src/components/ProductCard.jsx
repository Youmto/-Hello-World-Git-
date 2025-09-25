// src/components/ProductCard.jsx
import React from 'react';
import { Heart } from 'lucide-react';

function ProductCard({ product }) {
  return (
    <div className="card w-full bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <figure className="relative">
        <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex items-center bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-sm font-semibold">
          <Heart className="w-4 h-4 mr-1 text-white fill-current" />
          <span>{product.likes}</span>
        </div>
      </figure>
      <div className="p-4">
        <p className="text-gray-600 text-xs mb-1">{product.brand}</p>
        <h3 className="text-base font-semibold mb-1 truncate text-text-dark">{product.title}</h3>
        {/* Ajout de la logique du prix barré */}
        <div className="flex items-center space-x-2">
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {product.originalPrice}
            </p>
          )}
          <p className="text-lg font-bold text-primary">
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;