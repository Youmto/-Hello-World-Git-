// ============================================
// FICHIER: src/components/cart/EmptyCart.jsx
// Design Premium - Panier vide
// ============================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, TrendingUp, Heart } from 'lucide-react';
import Button from '../common/Button';
import ProductCard from '../home/ProductCard';

function EmptyCart({ recentlyViewed = [], popularProducts = [] }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      
      {/* Main Empty State */}
      <div className="text-center max-w-md mx-auto space-y-6">
        
        {/* Icon avec gradient */}
        <div className="relative inline-block">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-20 animate-pulse" />
          
          {/* Icon */}
          <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-primary-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Textes */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-neutral-900">
            Votre panier est vide
          </h1>
          <p className="text-lg text-neutral-600">
            Découvrez nos produits et ajoutez vos coups de cœur pour commencer vos achats
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            size="large"
            icon={<Sparkles className="w-5 h-5" />}
          >
            Découvrir nos produits
          </Button>

          <Button
            onClick={() => navigate('/favorites')}
            variant="outline"
            size="large"
            icon={<Heart className="w-5 h-5" />}
          >
            Voir mes favoris
          </Button>
        </div>
      </div>

      {/* Suggestions de produits */}
      {(popularProducts.length > 0 || recentlyViewed.length > 0) && (
        <div className="w-full max-w-7xl mx-auto mt-16 space-y-12">
          
          {/* Produits populaires */}
          {popularProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Tendances du moment
                    </h2>
                    <p className="text-sm text-neutral-600">
                      Nos produits les plus populaires
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {popularProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Derniers vus */}
          {recentlyViewed.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Récemment consultés
                    </h2>
                    <p className="text-sm text-neutral-600">
                      Vos derniers produits vus
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {recentlyViewed.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Benefits bar */}
      <div className="w-full max-w-5xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">
                Livraison gratuite
              </h3>
              <p className="text-sm text-neutral-600">
                Dès 50€ d'achat
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-error-500" />
              </div>
              <h3 className="font-semibold text-neutral-900">
                Retour gratuit
              </h3>
              <p className="text-sm text-neutral-600">
                Sous 30 jours
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">
                Paiement sécurisé
              </h3>
              <p className="text-sm text-neutral-600">
                100% protégé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;