// ============================================
// FICHIER 1: src/components/cart/CartItem.jsx
// Item du panier avec toutes les interactions
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Heart, Clock, AlertCircle } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Badge from '../common/Badge';
import { CONDITION_LABELS } from '../../utils/constants';

function CartItem({ item, onUpdateQuantity, onRemove, onSaveForLater }) {
  const { product, quantity } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(product.id);
    }, 300);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
    } else if (newQuantity <= product.stock) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const subtotal = product.price * quantity;
  const savings = product.originalPrice 
    ? (product.originalPrice - product.price) * quantity 
    : 0;

  return (
    <div className={`p-6 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100'}`}>
      <div className="flex gap-4">
        
        {/* Image produit */}
        <Link 
          to={`/product/${product.id}`}
          className="flex-shrink-0 group"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-primary transition-colors">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Infos produit */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex-1">
              <Link 
                to={`/product/${product.id}`}
                className="hover:text-primary transition-colors"
              >
                <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
              </Link>
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="default" size="sm">
                  {CONDITION_LABELS[product.condition] || 'Bon état'}
                </Badge>
                {product.stock < 5 && product.stock > 0 && (
                  <Badge variant="warning" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Plus que {product.stock} en stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Prix (desktop) */}
            <div className="hidden md:block text-right">
              <div className="flex items-baseline gap-2 justify-end mb-1">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-xs text-green-600 font-semibold">
                  Économie: {formatPrice(savings)}
                </p>
              )}
            </div>
          </div>

          {/* Prix (mobile) */}
          <div className="md:hidden mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-xs text-green-600 font-semibold">
                Économie: {formatPrice(savings)}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Sélecteur de quantité */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Diminuer la quantité"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 text-center font-semibold focus:outline-none"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Augmenter la quantité"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Sous-total */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-600">Sous-total:</span>
              <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
            </div>

            {/* Spacer pour pousser les boutons à droite sur desktop */}
            <div className="flex-1 hidden md:block" />

            {/* Boutons actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSaveForLater(item)}
                className="p-2 text-gray-600 hover:text-primary hover:bg-orange-50 rounded-lg transition-colors"
                title="Sauvegarder pour plus tard"
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                onClick={handleRemove}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sous-total mobile */}
          <div className="sm:hidden mt-3 pt-3 border-t flex justify-between items-center">
            <span className="text-sm text-gray-600">Sous-total:</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;