// ============================================
// FICHIER 6: src/components/checkout/OrderSummaryPanel.jsx
// Panel récapitulatif collé à droite
// ============================================

import React from 'react';
import { Package, Truck, Info } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

function OrderSummaryPanel({ cartItems, shippingCost, shippingMethod, total }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const tax = (subtotal + shippingCost) * 0.2;

  const shippingMethodLabels = {
    standard: 'Standard',
    express: 'Express',
    pickup: 'Retrait'
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5" />
            Récapitulatif ({cartItems.length})
          </h3>
        </div>

        {/* Articles */}
        <div className="p-4 max-h-64 overflow-y-auto">
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-gray-600">Qté: {item.quantity}</p>
                  <p className="text-sm font-bold text-primary mt-1">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculs */}
        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sous-total</span>
            <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Livraison</span>
              {shippingMethod && (
                <span className="text-xs text-gray-500">
                  ({shippingMethodLabels[shippingMethod]})
                </span>
              )}
            </div>
            <span className="font-semibold text-gray-900">
              {shippingCost === 0 ? (
                <span className="text-green-600">Gratuite</span>
              ) : (
                formatPrice(shippingCost)
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">TVA (20%)</span>
              <Info className="w-3 h-3 text-gray-400" />
            </div>
            <span className="font-semibold text-gray-900">{formatPrice(tax)}</span>
          </div>

          {/* Total */}
          <div className="pt-3 border-t-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Trust message */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-t">
          <div className="flex items-start gap-2">
            <Truck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700">
              <p className="font-semibold mb-1">Livraison suivie incluse</p>
              <p>Vous recevrez un numéro de suivi par email</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs font-semibold text-gray-900">Paiement</p>
            <p className="text-xs text-gray-600">Sécurisé</p>
          </div>
          <div>
            <div className="text-2xl mb-1">✅</div>
            <p className="text-xs font-semibold text-gray-900">Garantie</p>
            <p className="text-xs text-gray-600">Satisfait</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryPanel;