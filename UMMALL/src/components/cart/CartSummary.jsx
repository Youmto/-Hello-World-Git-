// ============================================
// FICHIER: src/components/cart/CartSummary.jsx
// Design Premium - Récapitulatif prix panier
// ============================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  Tag, 
  Shield, 
  CreditCard,
  TrendingUp 
} from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Button from '../common/Button';

function CartSummary({ 
  subtotal, 
  shipping, 
  tax, 
  discount = 0, 
  promoCode = null,
  total,
  itemCount,
  onCheckout 
}) {
  const navigate = useNavigate();

  // Seuil livraison gratuite
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = remainingForFreeShipping === 0;

  // Total économisé
  const totalSavings = discount;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="sticky top-24 space-y-6">
      
      {/* CARD PRINCIPALE */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900">
            Récapitulatif
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        {/* Body - Calculs */}
        <div className="p-6 space-y-4">
          
          {/* Sous-total */}
          <div className="flex items-center justify-between text-base">
            <span className="text-neutral-700">Sous-total</span>
            <span className="font-semibold text-neutral-900">
              {formatPrice(subtotal)}
            </span>
          </div>

          {/* Réduction promo */}
          {discount > 0 && promoCode && (
            <div className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-success-600" />
                <span className="text-success-700">
                  Promo "{promoCode}"
                </span>
              </div>
              <span className="font-semibold text-success-600">
                -{formatPrice(discount)}
              </span>
            </div>
          )}

          {/* Livraison */}
          <div className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-600" />
              <span className="text-neutral-700">Livraison</span>
            </div>
            <span className={`font-semibold ${hasFreeShipping ? 'text-success-600' : 'text-neutral-900'}`}>
              {hasFreeShipping ? 'GRATUIT' : formatPrice(shipping)}
            </span>
          </div>

          {/* Progress bar livraison gratuite */}
          {!hasFreeShipping && remainingForFreeShipping > 0 && (
            <div className="bg-neutral-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600">
                  Encore <span className="font-bold text-primary-600">{formatPrice(remainingForFreeShipping)}</span> pour la livraison gratuite !
                </span>
                <span className="text-neutral-500">
                  {Math.round((subtotal / freeShippingThreshold) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* TVA */}
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>TVA (20%)</span>
            <span>{formatPrice(tax)}</span>
          </div>

          <div className="border-t border-neutral-200 my-4" />

          {/* TOTAL */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-neutral-900">
              Total
            </span>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {formatPrice(total)}
              </div>
              {totalSavings > 0 && (
                <div className="text-xs text-success-600 font-medium">
                  Économie: {formatPrice(totalSavings)}
                </div>
              )}
            </div>
          </div>

          {/* Bouton Checkout */}
          <Button
            onClick={handleCheckout}
            variant="primary"
            size="large"
            className="w-full mt-4"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Procéder au paiement
          </Button>

          {/* Continuer shopping */}
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="medium"
            className="w-full"
          >
            Continuer mes achats
          </Button>
        </div>
      </div>

      {/* BADGES CONFIANCE */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
        <h3 className="font-semibold text-neutral-900 text-sm mb-3">
          Achat en toute confiance
        </h3>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-3 text-neutral-700">
            <div className="w-8 h-8 rounded-lg bg-success-50 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-success-600" />
            </div>
            <span>Paiement 100% sécurisé</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-700">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-primary-600" />
            </div>
            <span>Livraison sous 2-5 jours</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-700">
            <div className="w-8 h-8 rounded-lg bg-secondary-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-secondary-700" />
            </div>
            <span>Retour gratuit sous 30 jours</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-700">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-neutral-600" />
            </div>
            <span>Paiement en 3x sans frais</span>
          </div>
        </div>
      </div>

      {/* AIDE */}
      <div className="text-center text-sm text-neutral-600">
        <p>
          Besoin d'aide ? {' '}
          <a 
            href="/contact" 
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
}

export default CartSummary;