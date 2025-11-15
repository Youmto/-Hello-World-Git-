// ============================================
// FICHIER 1: src/components/search/SearchBar.jsx
// Barre de recherche avec auto-complete
// ============================================

import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

function SearchBar({ 
  query, 
  onQueryChange, 
  onSearch, 
  isSearching,
  showSuggestions,
  onFocus,
  onBlur
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch();
    }
  };

  const handleClear = () => {
    onQueryChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-6 h-6 text-gray-400" />
        
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Rechercher des produits, marques, catégories..."
          className="w-full pl-14 pr-28 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          autoComplete="off"
        />

        <div className="absolute right-2 flex items-center gap-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Recherche...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Rechercher</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;