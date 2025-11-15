// ============================================
// FICHIER 2: src/components/search/SearchSuggestions.jsx
// Suggestions et historique
// ============================================

import React from 'react';
import { Clock, TrendingUp, X, Trash2 } from 'lucide-react';

function SearchSuggestions({ 
  searchHistory, 
  popularSearches, 
  onSelectSearch,
  onRemoveFromHistory,
  onClearHistory
}) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top duration-200">
      
      {/* Historique de recherche */}
      {searchHistory.length > 0 && (
        <div className="border-b">
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Recherches récentes</h3>
            </div>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              Effacer
            </button>
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => onSelectSearch(term)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{term}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromHistory(term);
                  }}
                  className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recherches populaires */}
      <div>
        <div className="flex items-center gap-2 p-4 border-b bg-gray-50">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900">Recherches populaires</h3>
        </div>
        
        <div className="p-3 flex flex-wrap gap-2">
          {popularSearches.map((term, index) => (
            <button
              key={index}
              onClick={() => onSelectSearch(term)}
              className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full text-sm font-semibold transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchSuggestions;
