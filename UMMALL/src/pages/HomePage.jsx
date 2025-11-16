// ============================================
// HOME PAGE v2.0 - REDESIGN COMPLET
// Intégration de tous les composants premium
// ============================================

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FilterBar from '../components/home/FilterBar';
import ProductGrid from '../components/home/ProductGrid';
import { Sparkles, TrendingUp, Zap, Heart } from 'lucide-react';

// Import des données (à remplacer par API)
import { products } from '../data/products';

function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtrer les produits selon la catégorie
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      // Logique de filtrage (à adapter selon votre structure de données)
      const filtered = products.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  const handleFilterChange = (filters) => {
    if (filters.category) {
      setSelectedCategory(filters.category);
    }
  };

  // Séparer les produits en sections
  const newProducts = products.slice(0, 8);
  const trendingProducts = products.slice(8, 16);
  const allProducts = filteredProducts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Filter Bar */}
      <FilterBar 
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />

      {/* Trust Section */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="container-fluid mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-sm text-neutral-600 font-semibold">
                Articles disponibles
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                12K+
              </div>
              <div className="text-sm text-neutral-600 font-semibold">
                Vendeurs actifs
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-sm text-neutral-600 font-semibold">
                Satisfaction client
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                4.9★
              </div>
              <div className="text-sm text-neutral-600 font-semibold">
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nouveautés Section */}
      <ProductGrid 
        products={newProducts}
        title="Nouveautés"
        subtitle="Découvrez les derniers articles ajoutés"
        showViewToggle={false}
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
      />

      {/* CTA Banner - Vendre */}
      <section className="py-20 relative overflow-hidden">
        {/* Background avec gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-pink-500 to-purple-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container-fluid mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 animate-pulse-glow">
              <Zap className="w-10 h-10" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Vendez vos articles en quelques clics
            </h2>
            
            {/* Description */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Transformez votre garde-robe en revenus. C'est simple, rapide et sécurisé.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-white text-neutral-900 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3">
                <span>Commencer à vendre</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
                En savoir plus
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">2 min</div>
                <div className="text-sm text-white/80">Pour publier</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">0€</div>
                <div className="text-sm text-white/80">Frais d'inscription</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24h</div>
                <div className="text-sm text-white/80">Paiement rapide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tendances Section */}
      <ProductGrid 
        products={trendingProducts}
        title="Tendances du moment"
        subtitle="Les articles les plus populaires"
        featured={true}
        showViewToggle={false}
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
      />

      {/* Categories Highlight */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-fluid mx-auto">
          
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Explorer par catégorie
            </h2>
            <p className="text-xl text-neutral-600">
              Trouvez exactement ce que vous cherchez
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Femme', emoji: '👗', color: 'from-pink-500 to-rose-500', count: '15K' },
              { name: 'Homme', emoji: '👔', color: 'from-blue-500 to-indigo-500', count: '12K' },
              { name: 'Enfants', emoji: '🧸', color: 'from-purple-500 to-pink-500', count: '8K' },
              { name: 'Chaussures', emoji: '👟', color: 'from-orange-500 to-red-500', count: '10K' },
              { name: 'Accessoires', emoji: '👜', color: 'from-teal-500 to-emerald-500', count: '7K' },
              { name: 'Beauté', emoji: '💄', color: 'from-rose-500 to-pink-500', count: '5K' },
            ].map((category, index) => (
              <button
                key={index}
                className="group relative p-8 bg-white rounded-3xl border-2 border-neutral-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                    {category.emoji}
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 group-hover:text-white mb-2 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-600 group-hover:text-white/90 transition-colors">
                    {category.count} articles
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <ProductGrid 
        products={allProducts}
        title="Tous les articles"
        subtitle={`${allProducts.length} articles disponibles`}
        showViewToggle={true}
        defaultView="grid"
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
      />

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white border-y border-neutral-200">
        <div className="container-fluid mx-auto max-w-4xl text-center">
          
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Restez informé des nouveautés
          </h2>
          
          {/* Description */}
          <p className="text-lg text-neutral-600 mb-8">
            Recevez nos offres exclusives et les dernières tendances directement dans votre boîte mail
          </p>

          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 bg-white border-2 border-neutral-200 rounded-2xl focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all text-neutral-900 placeholder-neutral-500"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-2xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105"
            >
              S'abonner
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-sm text-neutral-500">
            En vous inscrivant, vous acceptez notre politique de confidentialité. 
            Pas de spam, promis ! 🤝
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container-fluid mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Paiement Sécurisé
              </h3>
              <p className="text-neutral-600">
                Transactions 100% sécurisées avec SSL et 3D Secure
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Livraison Rapide
              </h3>
              <p className="text-neutral-600">
                Expédition sous 24h et livraison suivie
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Support 7j/7
              </h3>
              <p className="text-neutral-600">
                Une équipe à votre écoute pour vous accompagner
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;