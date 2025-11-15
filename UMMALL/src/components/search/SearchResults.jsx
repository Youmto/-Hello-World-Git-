// ============================================
// FICHIER 4: src/components/search/SearchResults.jsx
// Affichage des résultats
// ============================================

import React from 'react';
import ProductCard from '../home/ProductCard';

function SearchResults({ results, viewMode, query }) {
  // Highlight du terme recherché dans le titre
  const highlightQuery = (text) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {results.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default SearchResults;