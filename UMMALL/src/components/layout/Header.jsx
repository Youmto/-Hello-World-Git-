// ============================================
// FICHIER 3: src/components/layout/Header.jsx (MISE À JOUR)
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Gift, ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();
  const { isAuthenticated, user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-background sticky top-0 z-40 shadow-sm">
      {/* Conteneur principal du header */}
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Partie gauche: Logo et Catégories */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-primary text-3xl font-bold tracking-tighter">
            UMMALL
          </Link>
          <button className="btn btn-ghost btn-sm text-text-dark hidden lg:flex items-center">
            <Menu className="h-5 w-5 mr-2" />
            Catégories
          </button>
        </div>

        {/* Partie centrale: Barre de recherche */}
        <form onSubmit={handleSearch} className="flex-grow max-w-2xl mx-auto">
          <div className="relative flex items-center rounded-full border border-gray-400 overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Cherchez ce que vous voulez..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 py-2 pr-16 text-gray-800 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full w-14 flex items-center justify-center bg-primary text-white rounded-r-full hover:bg-orange-600 transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>

        {/* Partie droite: Icônes et "Se connecter" */}
        <div className="flex items-center space-x-4 ml-4">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="hidden sm:flex items-center space-x-2 text-text-dark font-semibold whitespace-nowrap hover:text-primary"
            >
              <User className="h-5 w-5" />
              <span>{user?.firstName}</span>
            </Link>
          ) : (
            <button className="hidden sm:block text-text-dark font-semibold whitespace-nowrap hover:text-primary">
              Se connecter
            </button>
          )}

          <Link to="/favorites" className="text-text-dark hover:text-primary relative">
            <Heart className="h-6 w-6" />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="text-text-dark hover:text-primary relative">
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Deuxième barre: Catégories secondaires */}
      <div className="border-t border-gray-200 py-2">
        <div className="container mx-auto flex justify-center text-sm space-x-6 px-4 text-text-dark">
          <div className="flex items-center space-x-1">
            <Gift className="h-4 w-4" />
            <Link to="/category/cadeaux" className="hover:underline">
              Cadeaux
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <Link to="/favorites" className="hover:underline">
              Favoris d'Halloween
            </Link>
          </div>
          <Link to="/category/deco" className="hover:underline">
            Articles de déco
          </Link>
          <Link to="/category/mode" className="hover:underline">
            Articles de mode
          </Link>
          <Link to="/category/cadeaux" className="hover:underline">
            Liste de cadeaux
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;