// ============================================
// FICHIER: src/pages/CartPage.jsx
// Design Premium inspiré de Amazon, Zalando, ASOS
// ============================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  Heart,
  AlertCircle,
  CheckCircle,
  Gift,
  Sparkles
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { formatPrice } from '../utils/formatters';

// Composants spécifiques
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import PromoCode from '../components/cart/PromoCode';
import RecommendedProducts from '../components/cart/RecommendedProducts';
import SaveForLater from '../components/cart/SaveForLater';

function CartPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  
  const {
    cartItems,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [savedForLater, setSavedForLater] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  // Calculer les économies totales
  const totalSavings = cartItems.reduce((total, item) => {
    if (item.product.originalPrice) {
      return total + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return total;
  }, 0);

  // Calcul du montant manquant pour la livraison gratuite
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info('Veuillez vous connecter pour continuer');
      // Ouvrir modal de connexion (à implémenter)
      return;
    }
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      setIsClearing(true);
      setTimeout(() => {
        clearCart();
        setIsClearing(false);
        toast.success('Panier vidé');
      }, 500);
    }
  };

  const handleSaveForLater = (item) => {
    setSavedForLater([...savedForLater, item]);
    removeFromCart(item.product.id);
    toast.success('Article sauvegardé pour plus tard');
  };

  const handleMoveToCart = (item) => {
    // Logique pour remettre dans le panier
    setSavedForLater(savedForLater.filter(i => i.product.id !== item.product.id));
    toast.success('Article remis dans le panier');
  };

  // Si le panier est vide
  if (cartItems.length === 0 && savedForLater.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Mon Panier
            </h1>
            <p className="text-gray-600">
              {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
            </p>
          </div>
          
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Vider le panier
            </button>
          )}
        </div>

        {/* Progress bar - Livraison gratuite */}
        {remainingForFreeShipping > 0 && cartItems.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 mb-6 border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">
                  Plus que {formatPrice(remainingForFreeShipping)} pour la livraison gratuite !
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {formatPrice(subtotal)} / {formatPrice(freeShippingThreshold)}
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Économies totales */}
        {totalSavings > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold text-green-900">
                Vous économisez {formatPrice(totalSavings)} sur cette commande ! 🎉
              </p>
              <p className="text-sm text-green-700">
                Grâce aux promotions en cours
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GAUCHE: Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Articles dans le panier */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    Articles ({cartItems.length})
                  </h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sauvegardés pour plus tard */}
            {savedForLater.length > 0 && (
              <SaveForLater
                items={savedForLater}
                onMoveToCart={handleMoveToCart}
                onRemove={(item) => {
                  setSavedForLater(savedForLater.filter(i => i.product.id !== item.product.id));
                  toast.info('Article supprimé');
                }}
              />
            )}

            {/* Code promo (mobile) */}
            <div className="lg:hidden">
              <PromoCode
                code={promoCode}
                onCodeChange={setPromoCode}
                onApply={(discount) => {
                  setPromoDiscount(discount);
                  toast.success('Code promo appliqué !');
                }}
              />
            </div>

            {/* Produits recommandés */}
            <RecommendedProducts />
          </div>

          {/* DROITE: Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              
              {/* Code promo (desktop) */}
              <div className="hidden lg:block">
                <PromoCode
                  code={promoCode}
                  onCodeChange={setPromoCode}
                  onApply={(discount) => {
                    setPromoDiscount(discount);
                    toast.success('Code promo appliqué !');
                  }}
                />
              </div>

              {/* Récapitulatif */}
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={promoDiscount}
                total={total - promoDiscount}
                itemCount={itemCount}
              />

              {/* Bouton Commander */}
              <Button
                onClick={handleCheckout}
                variant="primary"
                size="lg"
                fullWidth
                className="text-lg font-bold py-4"
                icon={ArrowRight}
                iconPosition="right"
              >
                Passer la commande
              </Button>

              {/* Trust badges */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 space-y-3 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Paiement 100% sécurisé</p>
                    <p className="text-xs text-gray-600">SSL & 3D Secure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Livraison suivie</p>
                    <p className="text-xs text-gray-600">Tracking en temps réel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Retours gratuits</p>
                    <p className="text-xs text-gray-600">14 jours pour changer d'avis</p>
                  </div>
                </div>
              </div>

              {/* Besoin d'aide */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 mb-1">Besoin d'aide ?</p>
                <p className="text-xs text-gray-600 mb-3">
                  Notre équipe est là pour vous
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Contacter le support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;