// ============================================
// FICHIER 1: src/components/favorites/FavoriteCard.jsx
// Carte produit favori avec actions
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../common/Toast';
import Badge from '../common/Badge';
import { formatPrice } from '../../utils/formatters';
import { CONDITION_LABELS } from '../../utils/constants';

function FavoriteCard({ item, viewMode = 'grid', isSelected, isSelectionMode, onSelect }) {
  const toast = useToast();
  const { removeFromFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(item.id);
    toast.info('Retiré des favoris');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.stock > 0) {
      addToCart(item, 1);
      toast.success('Ajouté au panier');
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(item.id);
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/product/${item.id}`}>
        <div className={`
          bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-4 
          ${isSelected ? 'ring-2 ring-primary' : ''}
        `}>
          <div className="flex gap-4">
            
            {/* Checkbox sélection */}
            {isSelectionMode && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleSelect}
                  className="w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
            />

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1">{item.brand}</p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="default" size="sm">
                      {CONDITION_LABELS[item.condition]}
                    </Badge>
                    {item.stock === 0 ? (
                      <Badge variant="danger" size="sm">Épuisé</Badge>
                    ) : item.stock < 5 ? (
                      <Badge variant="warning" size="sm">Plus que {item.stock}</Badge>
                    ) : (
                      <Badge variant="success" size="sm">En stock</Badge>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!isSelectionMode && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={item.stock === 0 || isInCart(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="hidden md:inline">
                        {isInCart(item.id) ? 'Dans le panier' : 'Ajouter'}
                      </span>
                    </button>
                    <button
                      onClick={handleRemove}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Vue grille
  return (
    <Link to={`/product/${item.id}`}>
      <div className={`
        relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}>
        
        {/* Checkbox sélection */}
        {isSelectionMode && (
          <div className="absolute top-2 left-2 z-10">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelect}
              className="w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary bg-white"
            />
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-square">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay actions */}
          {!isSelectionMode && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={handleAddToCart}
                disabled={item.stock === 0 || isInCart(item.id)}
                className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Ajouter au panier"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button
                onClick={handleRemove}
                className="p-3 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
                title="Retirer des favoris"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          )}

          {/* Badge stock */}
          {item.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Épuisé
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="p-4">
          <p className="text-xs text-gray-600 mb-1">{item.brand}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
            {item.title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" size="sm">
              {CONDITION_LABELS[item.condition]}
            </Badge>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FavoriteCard;