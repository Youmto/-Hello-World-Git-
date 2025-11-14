// ============================================
// FICHIER 6: src/components/cart/SaveForLater.jsx
// Section "Sauvegardé pour plus tard"
// ============================================

import React from 'react';
import { Clock, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import Button from '../common/Button';

function SaveForLater({ items, onMoveToCart, onRemove }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-gray-600" />
          Sauvegardé pour plus tard ({items.length})
        </h2>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div key={item.product.id} className="p-6">
            <div className="flex gap-4">
              <Link to={`/product/${item.product.id}`}>
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </Link>

              <div className="flex-1">
                <Link 
                  to={`/product/${item.product.id}`}
                  className="hover:text-primary transition-colors"
                >
                  <p className="text-xs text-gray-600 mb-1">{item.product.brand}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.product.title}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-primary mb-3">
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onMoveToCart(item)}
                    variant="primary"
                    size="sm"
                    icon={ShoppingBag}
                  >
                    Ajouter au panier
                  </Button>
                  <Button
                    onClick={() => onRemove(item)}
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaveForLater;