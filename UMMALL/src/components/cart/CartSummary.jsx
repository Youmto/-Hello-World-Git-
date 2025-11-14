// ============================================
// FICHIER 2: src/components/cart/CartSummary.jsx
// Récapitulatif avec tous les calculs
// ============================================

import React from 'react';
import { Info, CheckCircle } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

function CartSummary({ subtotal, shipping, tax, discount = 0, total, itemCount }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-pink-500 p-4">
        <h2 className="text-xl font-bold text-white">Récapitulatif</h2>
      </div>

      <div className="p-6 space-y-4">
        
        {/* Sous-total */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Sous-total ({itemCount} article{itemCount > 1 ? 's' : ''})
          </span>
          <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        {/* Livraison */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Livraison</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Gratuite
              </span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">TVA (20%)</span>
          <span className="font-semibold text-gray-900">{formatPrice(tax)}</span>
        </div>

        {/* Réduction */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span className="font-semibold">Réduction</span>
            <span className="font-bold">-{formatPrice(discount)}</span>
          </div>
        )}

        {/* Séparateur */}
        <div className="border-t-2 border-gray-200 my-4" />

        {/* Total */}
        <div className="flex justify-between items-center text-xl">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-primary text-2xl">
            {formatPrice(total)}
          </span>
        </div>

        {/* Message économies */}
        {discount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-green-800">
              🎉 Vous économisez {formatPrice(discount)} !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSummary;