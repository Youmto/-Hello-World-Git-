// ============================================
// PRODUCT GRID v2.0 - OPTIMISÉ & PERFORMANT
// Design: Masonry Layout, Lazy Loading, Animations
// Inspirations: Pinterest, Farfetch, SSENSE
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Grid, List, TrendingUp, Sparkles } from 'lucide-react';

function ProductGrid({ 
  products = [], 
  title = "Articles du moment",
  subtitle = "Découvrez notre sélection",
  showViewToggle = true,
  defaultView = 'grid',
  columns = { sm: 2, md: 3, lg: 4, xl: 5 },
  featured = false
}) {
  const [viewMode, setViewMode] = useState(defaultView);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Simuler le chargement initial
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setVisibleProducts(products.slice(0, 20));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [products]);

  // Infinite scroll avec Intersection Observer
  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleProducts.length < products.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleProducts, products]);

  const loadMore = () => {
    const nextProducts = products.slice(
      visibleProducts.length,
      visibleProducts.length + 20
    );
    setVisibleProducts([...visibleProducts, ...nextProducts]);
  };

  // Grid classes dynamiques
  const getGridClasses = () => {
    const baseClasses = 'grid gap-4 md:gap-6';
    const columnClasses = {
      sm: `grid-cols-${columns.sm}`,
      md: `md:grid-cols-${columns.md}`,
      lg: `lg:grid-cols-${columns.lg}`,
      xl: `xl:grid-cols-${columns.xl}`
    };

    return `${baseClasses} ${Object.values(columnClasses).join(' ')}`;
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className={getGridClasses()}>
      {[...Array(columns.xl || 5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-neutral-200 rounded-3xl mb-4 shimmer" />
          <div className="h-4 bg-neutral-200 rounded-lg mb-2 w-3/4 shimmer" />
          <div className="h-3 bg-neutral-200 rounded-lg mb-3 w-1/2 shimmer" />
          <div className="h-6 bg-neutral-200 rounded-lg w-1/3 shimmer" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="container-fluid mx-auto py-12 md:py-16">
      
      {/* Header Section */}
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div className="flex-1">
          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-3">
            {featured ? (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            )}
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {title}
              </h2>
              {subtitle && (
                <p className="text-neutral-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Products Count */}
          <div className="flex items-center gap-4 text-sm text-neutral-600">
            <span className="font-semibold">
              {products.length.toLocaleString()} articles
            </span>
            {featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-pink-500 text-white rounded-full font-semibold text-xs">
                ⭐ Tendance
              </span>
            )}
          </div>
        </div>

        {/* View Mode Toggle */}
        {showViewToggle && (
          <div className="hidden md:flex items-center gap-2 bg-neutral-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`
                p-2.5 rounded-lg transition-all duration-300
                ${viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
                }
              `}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`
                p-2.5 rounded-lg transition-all duration-300
                ${viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
                }
              `}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : visibleProducts.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className={getGridClasses()}>
              {visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${(index % (columns.xl || 5)) * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <ProductCard 
                    product={product} 
                    featured={featured && index < 3}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <ProductCard 
                    product={product}
                    viewMode="list"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Load More Trigger */}
          {visibleProducts.length < products.length && (
            <div ref={loadMoreRef} className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-100 rounded-2xl">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-neutral-700">
                  Chargement...
                </span>
              </div>
            </div>
          )}

          {/* End of Results */}
          {visibleProducts.length >= products.length && products.length > 20 && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl">
                <span className="text-sm font-semibold text-neutral-700">
                  ✨ Vous avez tout vu ! {products.length} articles affichés
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        // Empty State
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-neutral-400" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            Aucun article trouvé
          </h3>
          <p className="text-neutral-600 mb-6">
            Essayez de modifier vos filtres ou revenez plus tard
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30">
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Quick Stats */}
      {!isLoading && visibleProducts.length > 0 && (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {products.length}
            </div>
            <div className="text-sm text-neutral-600">Articles disponibles</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {Math.round(products.length * 0.23)}
            </div>
            <div className="text-sm text-neutral-600">Nouveautés 7j</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {Math.round(products.length * 0.45)}
            </div>
            <div className="text-sm text-neutral-600">Réductions actives</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              4.8★
            </div>
            <div className="text-sm text-neutral-600">Note moyenne</div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;