// ============================================
// FICHIER: src/components/cart/CartItem.jsx
// Design Premium - Article dans le panier
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, AlertCircle, Tag } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Badge from '../common/Badge';

function CartItem({ item, onQuantityChange, onRemove }) {
  const { product, quantity, selectedSize, selectedColor } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  // Prix total pour cet article
  const totalPrice = product.price * quantity;
  
  // Économie si prix original existe
  const savings = product.originalPrice 
    ? (product.originalPrice - product.price) * quantity 
    : 0;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };

  // Stock warning
  const showStockWarning = product.stock < 3;
  const isOutOfStock = product.stock === 0;

  return (
    <div 
      className={`
        bg-white rounded-xl border border-neutral-200 p-4 lg:p-6
        transition-all duration-300
        hover:shadow-md hover:border-neutral-300
        ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        {/* IMAGE */}
        <Link 
          to={`/product/${product.id}`}
          className="relative group shrink-0"
        >
          <div className="w-full lg:w-28 h-32 lg:h-28 rounded-lg overflow-hidden bg-neutral-100">
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Badge promo sur l'image */}
          {product.discount && (
            <Badge
              variant="error"
              className="absolute top-2 right-2"
            >
              -{product.discount}%
            </Badge>
          )}
        </Link>

        {/* INFOS PRINCIPALES */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            
            {/* Titre + Marque */}
            <div>
              <Link 
                to={`/product/${product.id}`}
                className="text-lg font-semibold text-neutral-900 hover:text-primary-500 transition-colors line-clamp-2"
              >
                {product.title}
              </Link>
              
              {product.brand && (
                <p className="text-sm text-neutral-600 mt-0.5">
                  {product.brand}
                </p>
              )}
            </div>

            {/* Variantes sélectionnées */}
            <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
              {selectedSize && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Taille:</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">
                    {selectedSize}
                  </span>
                </span>
              )}
              
              {selectedColor && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Couleur:</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">
                    {selectedColor}
                  </span>
                </span>
              )}
            </div>

            {/* Prix unitaire */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neutral-900">
                {formatPrice(product.price)}
              </span>
              
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock warning */}
            {showStockWarning && !isOutOfStock && (
              <div className="flex items-center gap-1.5 text-warning-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">
                  Plus que {product.stock} en stock !
                </span>
              </div>
            )}

            {isOutOfStock && (
              <div className="flex items-center gap-1.5 text-error-600 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>Rupture de stock</span>
              </div>
            )}

            {/* Économies */}
            {savings > 0 && (
              <div className="flex items-center gap-1.5 text-success-600 text-sm">
                <Tag className="w-4 h-4" />
                <span className="font-medium">
                  Vous économisez {formatPrice(savings)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PRIX + ACTIONS (Desktop à droite, Mobile en bas) */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 lg:min-w-[160px]">
          
          {/* Prix total */}
          <div className="text-right">
            <div className="text-2xl font-bold text-neutral-900">
              {formatPrice(totalPrice)}
            </div>
            <div className="text-xs text-neutral-600">
              {quantity} × {formatPrice(product.price)}
            </div>
          </div>

          {/* Contrôles quantité */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isOutOfStock}
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                transition-all duration-200
                ${quantity <= 1 || isOutOfStock
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 active:scale-95'
                }
              `}
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="w-12 text-center">
              <span className="text-lg font-semibold text-neutral-900">
                {quantity}
              </span>
            </div>

            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock || isOutOfStock}
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                transition-all duration-200
                ${quantity >= product.stock || isOutOfStock
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white active:scale-95'
                }
              `}
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Bouton supprimer */}
          <button
            onClick={handleRemove}
            className="
              p-2 rounded-lg
              text-neutral-600 hover:text-error-600
              hover:bg-error-50
              transition-all duration-200
              active:scale-95
            "
            aria-label="Supprimer du panier"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;