// ============================================
// FICHIER: src/pages/SearchPage.jsx
// Design Premium inspiré de Amazon, Google, Algolia
// ============================================

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  TrendingUp,
  Clock,
  Grid,
  List,
  Filter,
  ArrowUpDown,
  AlertCircle,
  Sparkles
} from 'lucide-react';

import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import Badge from "../components/common/Badge";
import { formatPrice } from '../utils/formatters';
import { products } from '../data/products';

// Composants spécifiques
import SearchBar from '../components/search/SearchBar';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import SearchSuggestions from '../components/search/SearchSuggestions';
import PopularSearches from '../components/search/PopularSearches';
import NoResults from '../components/search/NoResults';

function SearchPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // États
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  
  // Filtres
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    condition: [],
    brands: [],
    rating: 0,
    inStock: false
  });

  // Vue et tri
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search query
  const debouncedQuery = useDebounce(query, 300);

  // Charger l'historique depuis localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history.slice(0, 10)); // Max 10 items
  }, []);

  // Recherche quand query change
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
      setSearchParams({ q: debouncedQuery });
    } else {
      setResults([]);
      setSearchParams({});
    }
  }, [debouncedQuery]);

  // Fonction de recherche
  const performSearch = async (searchQuery) => {
    setIsSearching(true);

    try {
      // TODO: Remplacer par appel API réel
      // const data = await productService.search(searchQuery, filters);
      
      // Simulation recherche avec données mockées
      await new Promise(resolve => setTimeout(resolve, 400));

      const searchResults = products.filter(product => {
        const searchLower = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category?.name?.toLowerCase().includes(searchLower)
        );
      });

      setResults(searchResults);

      // Sauvegarder dans l'historique si non vide
      if (searchQuery.trim() && searchResults.length > 0) {
        saveToHistory(searchQuery);
      }

    } catch (error) {
      toast.error('Erreur lors de la recherche');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  // Sauvegarder dans l'historique
  const saveToHistory = (searchTerm) => {
    const newHistory = [
      searchTerm,
      ...searchHistory.filter(item => item !== searchTerm)
    ].slice(0, 10);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Supprimer de l'historique
  const removeFromHistory = (term) => {
    const newHistory = searchHistory.filter(item => item !== term);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Vider l'historique
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
    toast.info('Historique effacé');
  };

  // Appliquer les filtres
  const filteredResults = useMemo(() => {
    let filtered = [...results];

    // Filtrer par catégories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(item =>
        filters.categories.includes(item.category?.slug)
      );
    }

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
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'relevance':
      default:
        // Garder l'ordre de pertinence
        break;
    }

    return filtered;
  }, [results, filters, sortBy]);

  // Compter les filtres actifs
  const activeFiltersCount = 
    filters.categories.length +
    filters.condition.length +
    filters.brands.length +
    (filters.inStock ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  // Suggestions populaires
  const popularSearches = [
    'Nike Air Max',
    'iPhone 13',
    'Canapé',
    'Vélo électrique',
    'PlayStation 5',
    'Sac à main'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Barre de recherche sticky */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => performSearch(query)}
            isSearching={isSearching}
            showSuggestions={showSuggestions}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && query.trim() === '' && (
            <SearchSuggestions
              searchHistory={searchHistory}
              popularSearches={popularSearches}
              onSelectSearch={(term) => {
                setQuery(term);
                setShowSuggestions(false);
              }}
              onRemoveFromHistory={removeFromHistory}
              onClearHistory={clearHistory}
            />
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        
        {/* Si recherche vide - Afficher popularités */}
        {!query.trim() && (
          <div className="max-w-4xl mx-auto">
            <PopularSearches
              searches={popularSearches}
              onSelectSearch={(term) => setQuery(term)}
            />
          </div>
        )}

        {/* Résultats de recherche */}
        {query.trim() && (
          <>
            {/* En-tête résultats */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Résultats pour "{query}"
                  </h1>
                  <p className="text-gray-600">
                    {isSearching ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        Recherche en cours...
                      </span>
                    ) : (
                      <>
                        {filteredResults.length} résultat{filteredResults.length > 1 ? 's' : ''}
                        {filteredResults.length !== results.length && 
                          ` (${results.length} avant filtrage)`
                        }
                      </>
                    )}
                  </p>
                </div>

                {/* Actions rapides */}
                {filteredResults.length > 0 && (
                  <div className="flex items-center gap-2">
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
                      <span className="hidden sm:inline">Filtres</span>
                      {activeFiltersCount > 0 && (
                        <Badge variant="white" size="sm">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Badges filtres actifs */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">Filtres actifs :</span>
                  {filters.categories.map((cat) => (
                    <Badge key={cat} variant="primary" size="sm">
                      {cat}
                      <button
                        onClick={() => setFilters({
                          ...filters,
                          categories: filters.categories.filter(c => c !== cat)
                        })}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {filters.inStock && (
                    <Badge variant="success" size="sm">
                      En stock
                      <button
                        onClick={() => setFilters({ ...filters, inStock: false })}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  <button
                    onClick={() => setFilters({
                      categories: [],
                      priceRange: [0, 1000],
                      condition: [],
                      brands: [],
                      rating: 0,
                      inStock: false
                    })}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Réinitialiser tout
                  </button>
                </div>
              )}
            </div>

            {/* Barre de tri et vue */}
            {filteredResults.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Tri */}
                  <div className="flex items-center gap-3">
                    <ArrowUpDown className="w-5 h-5 text-gray-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="relevance">Pertinence</option>
                      <option value="price_asc">Prix croissant</option>
                      <option value="price_desc">Prix décroissant</option>
                      <option value="rating">Meilleures notes</option>
                      <option value="newest">Plus récents</option>
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* GAUCHE: Filtres (Desktop) */}
              {showFilters && filteredResults.length > 0 && (
                <div className="lg:col-span-1">
                  <SearchFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    availableResults={results}
                  />
                </div>
              )}

              {/* DROITE: Résultats */}
              <div className={showFilters && filteredResults.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
                {filteredResults.length > 0 ? (
                  <SearchResults
                    results={filteredResults}
                    viewMode={viewMode}
                    query={query}
                  />
                ) : !isSearching && query.trim() ? (
                  <NoResults
                    query={query}
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
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;