// ============================================
// FICHIER: src/pages/SearchPage.jsx
// Design Premium - Page recherche complète
// ============================================

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Grid,
  List,
  TrendingUp,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import ProductCard from '../components/home/ProductCard';
import Button from '../components/common/Button';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // États
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filtres
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    brands: [],
    sizes: [],
    colors: [],
    condition: [],
    rating: 0,
  });

  // Mock data - à remplacer par API
  const allProducts = useMemo(() => {
    // Simuler des produits
    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Produit ${i + 1} - ${searchQuery || 'Article'}`,
      brand: ['Nike', 'Adidas', 'Zara', 'H&M', 'Mango'][i % 5],
      price: Math.floor(Math.random() * 200) + 20,
      originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 300) + 50 : null,
      image: `https://picsum.photos/400/500?random=${i}`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500),
      category: ['Mode', 'Chaussures', 'Accessoires', 'Maison'][i % 4],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Noir', 'Blanc', 'Gris'],
      condition: ['Neuf', 'Comme neuf', 'Très bon état'][i % 3],
      stock: Math.floor(Math.random() * 50),
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : null,
    }));
  }, [searchQuery]);

  // Recherches récentes (localStorage)
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Suggestions de recherche
  const searchSuggestions = [
    'Nike Air Max',
    'Robe été',
    'Sneakers',
    'Sac à main',
    'Montre',
    'Lunettes de soleil',
  ];

  // Appliquer les filtres
  const filteredProducts = useMemo(() => {
    let results = [...allProducts];

    // Filtre par catégories
    if (filters.categories.length > 0) {
      results = results.filter(p => filters.categories.includes(p.category));
    }

    // Filtre par prix
    results = results.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filtre par marques
    if (filters.brands.length > 0) {
      results = results.filter(p => filters.brands.includes(p.brand));
    }

    // Filtre par condition
    if (filters.condition.length > 0) {
      results = results.filter(p => filters.condition.includes(p.condition));
    }

    // Filtre par note
    if (filters.rating > 0) {
      results = results.filter(p => parseFloat(p.rating) >= filters.rating);
    }

    return results;
  }, [allProducts, filters]);

  // Tri
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default: // relevance
        break;
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  // Effectuer la recherche
  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      setSearchQuery(trimmedQuery);
      setSearchParams({ q: trimmedQuery });
      
      // Ajouter aux recherches récentes
      const newRecent = [trimmedQuery, ...recentSearches.filter(s => s !== trimmedQuery)].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // Toggle filtre
  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const current = prev[filterType];
      if (Array.isArray(current)) {
        return {
          ...prev,
          [filterType]: current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value]
        };
      }
      return prev;
    });
  };

  // Clear filtres
  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      brands: [],
      sizes: [],
      colors: [],
      condition: [],
      rating: 0,
    });
  };

  // Nombre de filtres actifs
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.condition.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-neutral-50">
      
      {/* Header recherche */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          
          {/* Barre de recherche */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Rechercher des produits, marques..."
                className="
                  w-full pl-12 pr-12 py-4 rounded-xl
                  border-2 border-neutral-200 focus:border-primary-500
                  focus:outline-none focus:ring-4 focus:ring-primary-100
                  text-lg
                  transition-all duration-200
                "
              />
              
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              )}
            </div>

            {/* Suggestions et recherches récentes */}
            {!searchParams.get('q') && (
              <div className="mt-4 space-y-4">
                
                {/* Recherches récentes */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Recherches récentes</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, i) => (
                        <button
                          key={i}
                          onClick={() => handleSearch(search)}
                          className="
                            px-4 py-2 rounded-lg
                            bg-neutral-100 hover:bg-neutral-200
                            text-neutral-700 text-sm
                            transition-colors
                          "
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Recherches populaires</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearch(suggestion)}
                        className="
                          px-4 py-2 rounded-lg
                          bg-primary-50 hover:bg-primary-100
                          text-primary-700 text-sm
                          transition-colors
                        "
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats et actions */}
          {searchParams.get('q') && (
            <div className="max-w-7xl mx-auto mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Résultats */}
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  {isLoading ? 'Recherche...' : `${sortedProducts.length} résultats`}
                </h1>
                <p className="text-neutral-600 mt-1">
                  pour "{searchParams.get('q')}"
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                
                {/* Bouton filtres (mobile) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="
                    sm:hidden flex items-center gap-2 px-4 py-2 rounded-lg
                    border-2 border-neutral-200
                    hover:bg-neutral-50
                    transition-colors relative
                  "
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filtres</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                    px-4 py-2 rounded-lg
                    border-2 border-neutral-200
                    focus:border-primary-500 focus:outline-none
                    transition-colors
                  "
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Meilleures notes</option>
                  <option value="newest">Plus récents</option>
                </select>

                {/* Vue grid/list */}
                <div className="hidden sm:flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`
                      p-2 rounded-md transition-all
                      ${viewMode === 'grid' 
                        ? 'bg-white shadow-sm text-primary-600' 
                        : 'text-neutral-600 hover:text-neutral-900'
                      }
                    `}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`
                      p-2 rounded-md transition-all
                      ${viewMode === 'list' 
                        ? 'bg-white shadow-sm text-primary-600' 
                        : 'text-neutral-600 hover:text-neutral-900'
                      }
                    `}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      {searchParams.get('q') && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            
            {/* Sidebar filtres (desktop) */}
            <aside className={`
              w-80 shrink-0 space-y-6
              ${showFilters ? 'block' : 'hidden sm:block'}
            `}>
              
              {/* Header filtres */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary-600" />
                    Filtres
                  </h2>
                  
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Tout effacer
                    </button>
                  )}
                </div>

                {/* Catégories */}
                <FilterSection title="Catégories">
                  {['Mode', 'Chaussures', 'Accessoires', 'Maison'].map(cat => (
                    <FilterCheckbox
                      key={cat}
                      label={cat}
                      checked={filters.categories.includes(cat)}
                      onChange={() => toggleFilter('categories', cat)}
                    />
                  ))}
                </FilterSection>

                {/* Prix */}
                <FilterSection title="Prix">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-neutral-600">
                      <span>{filters.priceRange[0]}€</span>
                      <span>{filters.priceRange[1]}€</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                      }))}
                      className="w-full accent-primary-600"
                    />
                  </div>
                </FilterSection>

                {/* Marques */}
                <FilterSection title="Marques">
                  {['Nike', 'Adidas', 'Zara', 'H&M', 'Mango'].map(brand => (
                    <FilterCheckbox
                      key={brand}
                      label={brand}
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleFilter('brands', brand)}
                    />
                  ))}
                </FilterSection>

                {/* Condition */}
                <FilterSection title="État">
                  {['Neuf', 'Comme neuf', 'Très bon état'].map(cond => (
                    <FilterCheckbox
                      key={cond}
                      label={cond}
                      checked={filters.condition.includes(cond)}
                      onChange={() => toggleFilter('condition', cond)}
                    />
                  ))}
                </FilterSection>

                {/* Note minimum */}
                <FilterSection title="Note minimum">
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFilters(prev => ({ 
                          ...prev, 
                          rating: prev.rating === rating ? 0 : rating 
                        }))}
                        className={`
                          w-full px-3 py-2 rounded-lg text-sm text-left
                          transition-colors
                          ${filters.rating === rating
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'hover:bg-neutral-50 text-neutral-700'
                          }
                        `}
                      >
                        {'⭐'.repeat(rating)} et plus
                      </button>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Résultats */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-600">Recherche en cours...</p>
                  </div>
                </div>
              ) : sortedProducts.length > 0 ? (
                <div className={`
                  grid gap-6
                  ${viewMode === 'grid' 
                    ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                  }
                `}>
                  {sortedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      layout={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <NoResults 
                  query={searchParams.get('q')} 
                  onClearFilters={clearFilters}
                  hasActiveFilters={activeFiltersCount > 0}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant FilterSection
function FilterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-neutral-200 pb-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-3 hover:text-primary-600 transition-colors"
      >
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Composant FilterCheckbox
function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-2 border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
      />
      <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

// Composant NoResults
function NoResults({ query, onClearFilters, hasActiveFilters }) {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
        <AlertCircle className="w-12 h-12 text-neutral-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Aucun résultat trouvé
      </h2>
      
      <p className="text-neutral-600 mb-6">
        {hasActiveFilters 
          ? `Aucun produit ne correspond à vos critères pour "${query}"`
          : `Aucun produit trouvé pour "${query}"`
        }
      </p>

      {hasActiveFilters && (
        <Button
          onClick={onClearFilters}
          variant="primary"
          size="medium"
        >
          Effacer les filtres
        </Button>
      )}

      <div className="mt-8">
        <p className="text-sm text-neutral-600 mb-3">Suggestions :</p>
        <ul className="text-sm text-neutral-700 space-y-1">
          <li>• Vérifiez l'orthographe</li>
          <li>• Essayez des mots-clés plus généraux</li>
          <li>• Essayez moins de filtres</li>
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;