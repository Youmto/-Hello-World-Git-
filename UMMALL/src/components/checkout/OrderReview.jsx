// ============================================
// FICHIER 4: src/components/checkout/OrderReview.jsx
// Page de vérification avant paiement
// ============================================

import React from 'react';
import { Package, MapPin, CreditCard, AlertCircle, Shield } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Badge from '../common/Badge';

function OrderReview({ 
  shippingData, 
  shippingMethod, 
  paymentMethod, 
  cartItems, 
  total,
  acceptTerms,
  onAcceptTermsChange
}) {
  const shippingMethodLabels = {
    standard: 'Livraison Standard (3-5 jours)',
    express: 'Livraison Express (1-2 jours)',
    pickup: 'Retrait en magasin'
  };

  const paymentMethodLabels = {
    card: 'Carte bancaire',
    mobile_money: 'Mobile Money',
    paypal: 'PayPal',
    bank_transfer: 'Virement bancaire'
  };

  return (
    <div className="space-y-6">
      
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vérification de la commande</h2>
            <p className="text-sm text-gray-600">Vérifiez vos informations avant de payer</p>
          </div>
        </div>

        {/* Adresse de livraison */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-900">Adresse de livraison</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold text-gray-900">
              {shippingData.firstName} {shippingData.lastName}
            </p>
            <p className="text-gray-700">{shippingData.address}</p>
            {shippingData.address2 && <p className="text-gray-700">{shippingData.address2}</p>}
            <p className="text-gray-700">
              {shippingData.postalCode} {shippingData.city}
            </p>
            <p className="text-gray-700">{shippingData.country}</p>
            <p className="text-gray-600 mt-2">
              📧 {shippingData.email}
            </p>
            <p className="text-gray-600">
              📞 {shippingData.phone}
            </p>
            <div className="mt-3">
              <Badge variant="info" size="sm">
                {shippingMethodLabels[shippingMethod]}
              </Badge>
            </div>
          </div>
        </div>

        {/* Mode de paiement */}
        <div className="border-t pt-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-900">Mode de paiement</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <Badge variant="primary">{paymentMethodLabels[paymentMethod]}</Badge>
          </div>
        </div>

        {/* Articles commandés */}
        <div className="border-t pt-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-900">
              Articles ({cartItems.length})
            </h3>
          </div>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-gray-50 rounded-lg p-3">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{item.product.title}</p>
                  <p className="text-xs text-gray-600">{item.product.brand}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Quantité: {item.quantity} × {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conditions générales */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => onAcceptTermsChange(e.target.checked)}
            className="mt-1 w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            J'accepte les{' '}
            <a href="/terms" className="text-primary hover:underline font-semibold">
              conditions générales de vente
            </a>
            {' '}et la{' '}
            <a href="/privacy" className="text-primary hover:underline font-semibold">
              politique de confidentialité
            </a>
            {' '}d'UMMALL. *
          </span>
        </label>
      </div>

      {/* Avertissement */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold mb-1">Paiement sécurisé</p>
          <p>
            En cliquant sur "Payer maintenant", vous autorisez UMMALL à débiter{' '}
            <span className="font-bold">{formatPrice(total)}</span> sur votre mode de paiement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderReview;