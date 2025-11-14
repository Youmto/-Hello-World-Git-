// ============================================
// FICHIER 4: src/components/home/ProductCard.jsx (MISE À JOUR)
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../common/Toast';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const toast = useToast();
  
  const isProductFavorite = isFavorite(product.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    
    if (isProductFavorite) {
      toast.info('Retiré des favoris');
    } else {
      toast.success('Ajouté aux favoris');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('Ajouté au panier');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="card w-full bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden group">
        <figure className="relative">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Bouton favori */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isProductFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Badge si promotion */}
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              PROMO
            </div>
          )}
        </figure>

        <div className="p-4">
          <p className="text-gray-600 text-xs mb-1">{product.brand}</p>
          <h3 className="text-base font-semibold mb-1 truncate text-text-dark">
            {product.title}
          </h3>

          {/* Prix */}
          <div className="flex items-center space-x-2 mb-3">
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </p>
            )}
            <p className="text-lg font-bold text-primary">{product.price}</p>
          </div>

          {/* Bouton Ajouter au panier (apparaît au hover) */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-600"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;