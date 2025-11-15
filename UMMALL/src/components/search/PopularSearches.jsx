// ============================================
// FICHIER 5: src/components/search/PopularSearches.jsx
// Recherches populaires (page vide)
// ============================================

import React from 'react';
import { TrendingUp, Tag, Sparkles } from 'lucide-react';

function PopularSearches({ searches, onSelectSearch }) {
  const categories = [
    { name: 'Mode', icon: '👔', color: 'from-pink-400 to-purple-500' },
    { name: 'Tech', icon: '💻', color: 'from-blue-400 to-cyan-500' },
    { name: 'Maison', icon: '🏠', color: 'from-green-400 to-emerald-500' },
    { name: 'Sports', icon: '⚽', color: 'from-orange-400 to-red-500' }
  ];

  return (
    <div className="py-8">
      
      {/* Message de bienvenue */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-pink-500 mb-4">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Que cherchez-vous aujourd'hui ?
        </h1>
        <p className="text-lg text-gray-600">
          Des milliers de produits vous attendent
        </p>
      </div>

      {/* Catégories populaires */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Tag className="w-6 h-6 text-primary" />
          Catégories populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => onSelectSearch(cat.name)}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-gray-100 hover:border-primary"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cat.color} mx-auto mb-3 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <p className="font-semibold text-gray-900">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recherches tendances */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Recherches tendances
        </h2>
        <div className="flex flex-wrap gap-3">
          {searches.map((term, index) => (
            <button
              key={index}
              onClick={() => onSelectSearch(term)}
              className="px-6 py-3 bg-white rounded-full border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all font-semibold text-gray-700 hover:text-primary shadow-sm hover:shadow-md"
            >
              🔥 {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularSearches;
