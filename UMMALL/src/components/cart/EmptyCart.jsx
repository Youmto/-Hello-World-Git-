// ============================================
// FICHIER 3: src/components/cart/EmptyCart.jsx
// État vide avec suggestions
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Heart, Package } from 'lucide-react';
import Button from '../common/Button';

function EmptyCart() {
  const suggestions = [
    {
      icon: TrendingUp,
      title: "Articles populaires",
      description: "Découvrez nos meilleures ventes",
      link: "/trending"
    },
    {
      icon: Heart,
      title: "Vos favoris",
      description: "Retrouvez vos coups de cœur",
      link: "/favorites"
    },
    {
      icon: Package,
      title: "Nouvelles arrivées",
      description: "Les derniers produits ajoutés",
      link: "/new"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Icône et message principal */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 mb-6">
            <ShoppingBag className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Il est temps de le remplir avec des articles qui vous plaisent !
          </p>
        </div>

        {/* Bouton principal */}
        <Link to="/">
          <Button variant="primary" size="lg" className="mb-12">
            Découvrir nos produits
          </Button>
        </Link>

        {/* Suggestions */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {suggestions.map((suggestion, index) => (
            <Link key={index} to={suggestion.link}>
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all group">
                <suggestion.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-2">{suggestion.title}</h3>
                <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;