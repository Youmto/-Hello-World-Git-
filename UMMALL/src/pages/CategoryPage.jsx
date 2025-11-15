// ============================================
// FICHIER: src/pages/CategoryPage.jsx
// Design Premium - Réutilise beaucoup de SearchPage
// ============================================

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronRight,
  Tag,
  TrendingUp,
  Sparkles
} from 'lucide-react';

import { useToast } from '../components/common/Toast';
import Badge from '../components/common/Badge';
import Breadcrumb from '../components/common/Breadcrumb';
import { formatPrice } from '../utils/formatters';
import { products } from '../data/products';
import { categories } from '../data/categories';

// Réutilisation composants
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import NoResults from '../components/search/NoResults';

function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // Trouver la catégorie
  const category = categories.find(cat => cat.slug === slug);

  // États
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filtres (même structure que SearchPage)
  const [filters, setFilters] = useState({
    categories: [], // Sous-catégories si applicable
    priceRange: [0, 1000],
    condition: [],
    brands: [],
    rating: 0,
    inStock: false
  });

  // Charger les produits de la catégorie
  useEffect(() => {
    if (!category) {
      toast.error('Catégorie introuvable');
      navigate('/');
      return;
    }

    loadCategoryProducts();
  }, [slug]);

  const loadCategoryProducts = async () => {
    setIsLoading(true);

    try {
      // TODO: Remplacer par appel API
      // const data = await productService.getByCategory(slug);

      // Simulation avec données mockées
      await new Promise(resolve => setTimeout(resolve, 400));

      // Filtrer les produits par catégorie
      const filtered = products.filter(
        product => product.category?.slug === slug
      );

      setCategoryProducts(filtered);

    } catch (error) {
      toast.error('Erreur lors du chargement');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Appliquer les filtres et tri (même logique que SearchPage)
  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Filtrer par prix
    filtered = filtered.filter(item =>
      item.price >= filters.priceRange[0] &&
      item.price <= filters.priceRange[1]
    );

    // Filtrer par condition
    if (filters.condition.length > 0) {
      filtered = filtered.filter(item =>
        filters.condition.includes(item.condition)
      );
    }

    // Filtrer par marques
    if (filters.brands.length > 0) {
      filtered = filtered.filter(item =>
        filters.brands.includes(item.brand)
      );
    }

    // Filtrer par stock
    if (filters.inStock) {
      filtered = filtered.filter(item => item.stock > 0);
    }

    // Trier
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
    }

    return filtered;
  }, [categoryProducts, filters, sortBy]);

  // Compter filtres actifs
  const activeFiltersCount =
    filters.condition.length +
    filters.brands.length +
    (filters.inStock ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  if (!category) {
    return null;
  }

  const breadcrumbItems = [
    { label: category.name }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Header Catégorie */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-pink-500 rounded-2xl p-8 md:p-12 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{category.icon}</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {category.name}
                </h1>
                <p className="text-white text-opacity-90">
                  {isLoading ? (
                    'Chargement...'
                  ) : (
                    <>
                      {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Sous-catégories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {category.subcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    onClick={() => navigate(`/category/${subcat.slug}`)}
                    className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full font-semibold transition-all backdrop-blur-sm"
                  >
                    {subcat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats rapides */}
          {!isLoading && categoryProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <p className="text-sm text-gray-600">Prix moyen</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(
                    categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length
                  )}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">En stock</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {categoryProducts.filter(p => p.stock > 0).length}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">Marques</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(categoryProducts.map(p => p.brand)).size}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <p className="text-sm text-gray-600">Nouveautés</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {categoryProducts.filter(p => {
                    const daysSinceCreated = (Date.now() - new Date(p.createdAt)) / (1000 * 60 * 60 * 24);
                    return daysSinceCreated < 7;
                  }).length}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Barre de tri et filtres */}
        {filteredProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Filtres */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
                  ${showFilters
                    ? 'bg-primary text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-primary hover:bg-orange-50'
                  }
                `}
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge variant={showFilters ? 'white' : 'primary'} size="sm">
                    {activeFiltersCount}
                  </Badge>
                )}
              </button>

              {/* Tri */}
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-5 h-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">Plus populaires</option>
                  <option value="newest">Plus récents</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Meilleures notes</option>
                </select>
              </div>

              {/* Toggle vue */}
              <div className="flex items-center gap-1 border-2 border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`
                    p-2 rounded transition-colors
                    ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`
                    p-2 rounded transition-colors
                    ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* GAUCHE: Filtres */}
          {showFilters && filteredProducts.length > 0 && (
            <div className="lg:col-span-1">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableResults={categoryProducts}
              />
            </div>
          )}

          {/* DROITE: Résultats */}
          <div className={showFilters && filteredProducts.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <SearchResults
                results={filteredProducts}
                viewMode={viewMode}
                query={category.name}
              />
            ) : (
              <NoResults
                query={category.name}
                onClearFilters={() => setFilters({
                  categories: [],
                  priceRange: [0, 1000],
                  condition: [],
                  brands: [],
                  rating: 0,
                  inStock: false
                })}
                hasActiveFilters={activeFiltersCount > 0}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;