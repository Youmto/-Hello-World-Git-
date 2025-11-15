// ============================================
// FICHIER 6: src/components/search/NoResults.jsx
// Aucun résultat
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Lightbulb, Home } from 'lucide-react';
import Button from '../common/Button';

function NoResults({ query, onClearFilters, hasActiveFilters }) {
  const suggestions = [
    'Vérifiez l\'orthographe',
    'Utilisez des mots-clés plus généraux',
    'Essayez des synonymes',
    'Supprimez certains filtres'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <SearchX className="w-20 h-20 text-gray-300 mx-auto mb-6" />
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Aucun résultat pour "{query}"
      </h2>
      
      {hasActiveFilters ? (
        <p className="text-gray-600 mb-6">
          Essayez de retirer certains filtres pour élargir votre recherche
        </p>
      ) : (
        <p className="text-gray-600 mb-6">
          Nous n'avons trouvé aucun produit correspondant à votre recherche
        </p>
      )}

      {/* Suggestions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Suggestions :</h3>
        </div>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-primary">•</span>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant="primary">
            Supprimer les filtres
          </Button>
        )}
        <Link to="/">
          <Button variant="outline" icon={Home}>
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NoResults;