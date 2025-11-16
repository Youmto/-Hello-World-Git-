// ============================================
// PRODUCT CARD v2.0 - NIVEAU MONDIAL
// Micro-interactions + Animations fluides
// Inspirations: Farfetch, SSENSE
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Zap, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../common/Toast';

function ProductCard({ product, featured = false }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const toast = useToast();
  
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isProductFavorite = isFavorite(product.id);

  // Calculer la réduction
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice.replace(/[^0-9.]/g, '') - product.price.replace(/[^0-9.]/g, '')) / product.originalPrice.replace(/[^0-9.]/g, '')) * 100)
    : 0;

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    
    if (isProductFavorite) {
      toast.info('Retiré des favoris');
    } else {
      toast.success('Ajouté aux favoris ❤️');
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('Ajouté au panier 🛍️');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <article 
        className={`
          group relative bg-white rounded-3xl overflow-hidden
          transition-all duration-500 ease-out
          ${featured 
            ? 'shadow-xl hover:shadow-2xl' 
            : 'shadow-sm hover:shadow-xl'
          }
          ${isHovered ? 'scale-[1.02] -translate-y-2' : 'scale-100'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          
          {/* Main Image */}
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-all duration-700 ease-out
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          />

          {/* Gradient Overlay on Hover */}
          <div 
            className={`
              absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0
              transition-opacity duration-500
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {/* Discount Badge */}
            {discount > 0 && (
              <div 
                className={`
                  bg-gradient-to-br from-red-500 to-pink-600 text-white 
                  px-3 py-1.5 rounded-full font-bold text-xs shadow-lg
                  flex items-center gap-1
                  transform transition-all duration-500
                  ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
                `}
              >
                <Zap className="w-3 h-3" />
                -{discount}%
              </div>
            )}

            {/* Featured Badge */}
            {featured && (
              <div className="bg-gradient-to-br from-primary-500 to-orange-600 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Tendance
              </div>
            )}
          </div>

          {/* Favorite Button - Top Right */}
          <button
            onClick={handleToggleFavorite}
            className={`
              absolute top-4 right-4 z-20
              w-11 h-11 rounded-full flex items-center justify-center
              backdrop-blur-md border-2
              transition-all duration-300 transform
              ${isProductFavorite 
                ? 'bg-red-500 border-red-500 scale-110' 
                : 'bg-white/90 border-white/40 hover:bg-white hover:scale-110'
              }
              ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}
          >
            <Heart
              className={`
                w-5 h-5 transition-all duration-300
                ${isProductFavorite 
                  ? 'fill-white text-white scale-110' 
                  : 'text-neutral-700 hover:text-red-500'
                }
              `}
            />
          </button>

          {/* Quick Actions - Bottom (Appear on Hover) */}
          <div 
            className={`
              absolute bottom-0 left-0 right-0 p-4
              flex gap-2
              transform transition-all duration-500 ease-out
              ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
            `}
          >
            {/* Quick View */}
            <button 
              className="flex-1 bg-white/95 backdrop-blur-sm hover:bg-white text-neutral-900 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Open quick view modal
              }}
            >
              <Eye className="w-4 h-4" />
              Aperçu
            </button>

            {/* Quick Add to Cart */}
            <button 
              onClick={handleQuickAdd}
              className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
            >
              <ShoppingBag className="w-4 h-4" />
              Ajouter
            </button>
          </div>

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer" />
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3">
          
          {/* Brand */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {product.brand}
            </span>
            
            {/* Rating (if available) */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-neutral-700">
                  {product.rating}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-neutral-900 text-base leading-snug line-clamp-2 min-h-[3rem] group-hover:text-primary-600 transition-colors duration-300">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline gap-3 pt-2">
            {/* Current Price */}
            <div className={`
              font-bold text-2xl
              ${discount > 0 
                ? 'bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent' 
                : 'text-neutral-900'
              }
            `}>
              {product.price}
            </div>

            {/* Original Price */}
            {product.originalPrice && (
              <div className="text-neutral-400 line-through text-sm font-medium">
                {product.originalPrice}
              </div>
            )}
          </div>

          {/* Likes / Stock Info */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            {product.likes !== undefined && (
              <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                <Heart className="w-4 h-4" />
                <span className="font-medium">{product.likes}</span>
              </div>
            )}
            
            {product.stock !== undefined && product.stock < 5 && (
              <div className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                Plus que {product.stock} !
              </div>
            )}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div 
          className={`
            absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500 
            rounded-3xl opacity-0 blur-xl -z-10
            transition-opacity duration-500
            ${isHovered ? 'opacity-20' : 'opacity-0'}
          `}
        />
      </article>
    </Link>
  );
}

export default ProductCard;