// ============================================
// FICHIER 2: src/components/favorites/EmptyFavorites.jsx
// État vide avec suggestions
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Sparkles, ShoppingBag } from 'lucide-react';
import Button from '../common/Button';

function EmptyFavorites() {
  const suggestions = [
    {
      icon: TrendingUp,
      title: "Articles populaires",
      description: "Découvrez les coups de cœur du moment",
      link: "/",
      color: "from-orange-400 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Nouvelles arrivées",
      description: "Les derniers produits ajoutés",
      link: "/new",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: ShoppingBag,
      title: "Toutes les catégories",
      description: "Explorez notre catalogue complet",
      link: "/",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Icône et message */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-red-100 mb-6">
            <Heart className="w-16 h-16 text-red-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Aucun favori pour le moment
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Commencez à sauvegarder vos produits préférés en cliquant sur le cœur ❤️
          </p>
        </div>

        {/* Bouton principal */}
        <Link to="/">
          <Button variant="primary" size="lg" className="mb-12">
            Découvrir nos produits
          </Button>
        </Link>

        {/* Suggestions */}
        <div className="grid md:grid-cols-3 gap-6">
          {suggestions.map((suggestion, index) => (
            <Link key={index} to={suggestion.link}>
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all group">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${suggestion.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <suggestion.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{suggestion.title}</h3>
                <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-blue-900">
            💡 <strong>Astuce :</strong> Ajoutez des produits à vos favoris pour les retrouver facilement 
            et être notifié des baisses de prix !
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyFavorites;
