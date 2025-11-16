// ============================================
// HEADER v2.0 - NAVIGATION PREMIUM
// Design: Minimal, Élégant, Fonctionnel
// Inspirations: Apple, SSENSE, Farfetch
// ============================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, User, Menu, X,
  Gift, Sparkles, TrendingUp, Bell
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();
  const { isAuthenticated, user } = useAuth();

  // Detect scroll for header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Nouveautés', icon: Sparkles, path: '/new' },
    { name: 'Tendances', icon: TrendingUp, path: '/trending' },
    { name: 'Cadeaux', icon: Gift, path: '/gifts' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
          : 'bg-white/80 backdrop-blur-md shadow-sm'
        }
      `}
    >
      {/* Top Bar - Announcement (Optional) */}
      <div className="bg-gradient-to-r from-primary-600 via-pink-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Livraison gratuite dès 50€ d'achat</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-neutral-100">
        <div className="container-fluid mx-auto">
          <div className="flex items-center justify-between h-20">
            
            {/* LEFT: Logo + Categories */}
            <div className="flex items-center gap-8">
              
              {/* Logo */}
              <Link 
                to="/" 
                className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow duration-300">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent hidden lg:block">
                  UMMALL
                </span>
              </Link>

              {/* Desktop Categories */}
              <nav className="hidden lg:flex items-center gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="group px-4 py-2 rounded-xl hover:bg-neutral-50 transition-all duration-300 flex items-center gap-2"
                  >
                    <category.icon className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                    <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CENTER: Search Bar */}
            <form 
              onSubmit={handleSearch} 
              className="hidden md:block flex-1 max-w-2xl mx-8"
            >
              <div 
                className={`
                  relative flex items-center bg-neutral-50 rounded-2xl 
                  transition-all duration-300
                  ${isSearchFocused 
                    ? 'ring-2 ring-primary-500 bg-white shadow-lg' 
                    : 'hover:bg-neutral-100'
                  }
                `}
              >
                <Search className={`
                  absolute left-4 w-5 h-5 transition-colors duration-300
                  ${isSearchFocused ? 'text-primary-500' : 'text-neutral-400'}
                `} />
                
                <input
                  type="text"
                  placeholder="Rechercher des articles, marques..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none text-sm font-medium"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 p-1 hover:bg-neutral-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-500" />
                  </button>
                )}
              </div>
            </form>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              
              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative group p-2 lg:p-3 hover:bg-neutral-50 rounded-xl transition-all duration-300"
              >
                <Heart className="w-6 h-6 text-neutral-700 group-hover:text-red-500 transition-colors duration-300" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative group p-2 lg:p-3 hover:bg-neutral-50 rounded-xl transition-all duration-300"
              >
                <ShoppingBag className="w-6 h-6 text-neutral-700 group-hover:text-primary-500 transition-colors duration-300" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary-500 to-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center gap-2 pl-3 pr-4 py-2 hover:bg-neutral-50 rounded-xl transition-all duration-300 group"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-200 group-hover:ring-primary-500 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.firstName?.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900 hidden lg:block">
                    {user?.firstName}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  Se connecter
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-neutral-50 rounded-xl transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-neutral-700" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`
          lg:hidden overflow-hidden transition-all duration-500 ease-out
          ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="container-fluid mx-auto py-6 space-y-4 border-t border-neutral-100">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center bg-neutral-50 rounded-2xl">
              <Search className="absolute left-4 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none text-sm font-medium rounded-2xl focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </form>

          {/* Mobile Categories */}
          <nav className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-xl transition-all duration-300"
              >
                <category.icon className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-neutral-700">
                  {category.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Auth */}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-sm"
            >
              <User className="w-4 h-4" />
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;