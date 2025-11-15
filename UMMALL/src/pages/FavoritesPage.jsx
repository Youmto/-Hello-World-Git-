// ============================================
// FICHIER: src/pages/FavoritesPage.jsx
// Design Premium inspiré de Pinterest, Etsy, Vinted
// ============================================

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Trash2,
  Share2,
  ShoppingBag,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles
} from 'lucide-react';

import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import Badge from "../components/common/Badge";
import { formatPrice } from '../utils/formatters';

// Composants spécifiques
import FavoriteCard from '../components/favorites/FavoriteCard';
import EmptyFavorites from '../components/favorites/EmptyFavorites';
import FavoritesStats from '../components/favorites/FavoritesStats';
import FilterPanel from '../components/favorites/FilterPanel';

function FavoritesPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { favorites, clearFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  // États de vue et filtres
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'price_asc', 'price_desc', 'name'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Filtres
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    condition: [],
    availability: 'all' // 'all', 'available', 'sold'
  });

  // Statistiques
  const stats = useMemo(() => {
    const totalValue = favorites.reduce((sum, item) => sum + item.price, 0);
    const available = favorites.filter(item => item.stock > 0).length;
    const avgPrice = favorites.length > 0 ? totalValue / favorites.length : 0;

    return {
      total: favorites.length,
      totalValue,
      available,
      soldOut: favorites.length - available,
      avgPrice
    };
  }, [favorites]);

  // Appliquer les filtres et le tri
  const filteredAndSortedFavorites = useMemo(() => {
    let result = [...favorites];

    // Filtrer par catégories
    if (filters.categories.length > 0) {
      result = result.filter(item => 
        filters.categories.includes(item.category?.slug)
      );
    }

    // Filtrer par prix
    result = result.filter(item => 
      item.price >= filters.priceRange[0] && 
      item.price <= filters.priceRange[1]
    );

    // Filtrer par condition
    if (filters.condition.length > 0) {
      result = result.filter(item => 
        filters.condition.includes(item.condition)
      );
    }

    // Filtrer par disponibilité
    if (filters.availability === 'available') {
      result = result.filter(item => item.stock > 0);
    } else if (filters.availability === 'sold') {
      result = result.filter(item => item.stock === 0);
    }

    // Trier
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
      default:
        // Garder l'ordre d'ajout (plus récent en premier)
        break;
    }

    return result;
  }, [favorites, filters, sortBy]);

  // Sélection multiple
  const handleSelectAll = () => {
    if (selectedItems.length === filteredAndSortedFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedFavorites.map(item => item.id));
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Actions groupées
  const handleAddSelectedToCart = () => {
    const itemsToAdd = favorites.filter(item => 
      selectedItems.includes(item.id) && item.stock > 0
    );

    itemsToAdd.forEach(item => addToCart(item, 1));
    
    toast.success(`${itemsToAdd.length} article(s) ajouté(s) au panier`);
    setSelectedItems([]);
    setIsSelectionMode(false);
  };

  const handleRemoveSelected = () => {
    if (window.confirm(`Supprimer ${selectedItems.length} favori(s) ?`)) {
      selectedItems.forEach(id => removeFromFavorites(id));
      toast.success(`${selectedItems.length} favori(s) supprimé(s)`);
      setSelectedItems([]);
      setIsSelectionMode(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Supprimer tous vos favoris ?')) {
      clearFavorites();
      toast.success('Tous les favoris ont été supprimés');
    }
  };

  // Partager la liste
  const handleShare = async () => {
    const shareData = {
      title: 'Mes favoris UMMALL',
      text: `Découvrez ma sélection de ${favorites.length} produits !`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      toast.info('Lien copié dans le presse-papiers');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Si aucun favori
  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                Mes Favoris
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredAndSortedFavorites.length} article{filteredAndSortedFavorites.length > 1 ? 's' : ''} 
                {filteredAndSortedFavorites.length !== favorites.length && 
                  ` sur ${favorites.length}`
                }
              </p>
            </div>

            {/* Actions principales */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all font-semibold text-gray-700"
              >
                <Share2 className="w-5 h-5" />
                Partager
              </button>

              {favorites.length > 0 && (
                <button
                  onClick={() => setIsSelectionMode(!isSelectionMode)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
                    ${isSelectionMode
                      ? 'bg-primary text-white'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-primary hover:bg-orange-50'
                    }
                  `}
                >
                  <CheckCircle className="w-5 h-5" />
                  {isSelectionMode ? 'Annuler' : 'Sélectionner'}
                </button>
              )}
            </div>
          </div>

          {/* Mode sélection - Actions groupées */}
          {isSelectionMode && (
            <div className="bg-primary text-white rounded-xl p-4 flex items-center justify-between animate-in slide-in-from-top">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  {selectedItems.length === filteredAndSortedFavorites.length
                    ? 'Tout désélectionner'
                    : 'Tout sélectionner'
                  }
                </button>
                
                {selectedItems.length > 0 && (
                  <span className="font-semibold">
                    {selectedItems.length} sélectionné{selectedItems.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddSelectedToCart}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Ajouter au panier
                  </button>
                  <button
                    onClick={handleRemoveSelected}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Statistiques */}
        <FavoritesStats stats={stats} />

        {/* Barre de filtres et tri */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Filtres */}
            <div className="flex items-center gap-3">
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
                Filtres
                {(filters.categories.length > 0 || 
                  filters.condition.length > 0 || 
                  filters.availability !== 'all') && (
                  <Badge variant="primary" size="sm">
                    {filters.categories.length + filters.condition.length + 
                     (filters.availability !== 'all' ? 1 : 0)}
                  </Badge>
                )}
              </button>

              {/* Badges filtres actifs */}
              <div className="hidden md:flex items-center gap-2">
                {filters.availability !== 'all' && (
                  <Badge variant="info" size="sm">
                    {filters.availability === 'available' ? 'Disponibles' : 'Épuisés'}
                  </Badge>
                )}
              </div>
            </div>

            {/* Tri et vue */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recent">Plus récents</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
              </select>

              {/* Toggle vue */}
              <div className="hidden sm:flex items-center gap-1 border-2 border-gray-200 rounded-lg p-1">
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

          {/* Panel de filtres */}
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              availableFavorites={favorites}
            />
          )}
        </div>

        {/* Grille de produits */}
        {filteredAndSortedFavorites.length > 0 ? (
          <div className={`
            ${viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
              : 'space-y-4'
            }
          `}>
            {filteredAndSortedFavorites.map((item) => (
              <FavoriteCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                isSelected={selectedItems.includes(item.id)}
                isSelectionMode={isSelectionMode}
                onSelect={handleSelectItem}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aucun résultat
            </h3>
            <p className="text-gray-600 mb-6">
              Aucun favori ne correspond à vos filtres
            </p>
            <Button
              onClick={() => setFilters({
                categories: [],
                priceRange: [0, 1000],
                condition: [],
                availability: 'all'
              })}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Actions du bas */}
        {favorites.length > 5 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold"
            >
              <Trash2 className="w-5 h-5" />
              Tout supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;