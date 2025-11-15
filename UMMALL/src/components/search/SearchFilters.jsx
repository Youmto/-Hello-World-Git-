// ============================================
// FICHIER 3: src/components/search/SearchFilters.jsx
// Panel de filtres
// ============================================

import React from 'react';
import { Star } from 'lucide-react';
import { CONDITIONS, CONDITION_LABELS } from '../../utils/constants';

function SearchFilters({ filters, onFiltersChange, availableResults }) {
  // Extraire catégories et marques uniques
  const categories = [...new Set(availableResults.map(item => item.category?.slug).filter(Boolean))];
  const brands = [...new Set(availableResults.map(item => item.brand).filter(Boolean))];

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleConditionToggle = (condition) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter(c => c !== condition)
      : [...filters.condition, condition];
    
    onFiltersChange({ ...filters, condition: newConditions });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Filtrer par</h2>

      <div className="space-y-6">
        
        {/* Stock */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Disponibilité</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm text-gray-700">En stock uniquement</span>
          </label>
        </div>

        {/* Prix */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Prix</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filters.priceRange[0]} €</span>
              <span>{filters.priceRange[1]} €</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange[1]}
              onChange={(e) => onFiltersChange({
                ...filters,
                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
              })}
              className="w-full"
            />
          </div>
        </div>

        {/* Catégories */}
        {categories.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Catégories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Marques */}
        {brands.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Marques</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.slice(0, 10).map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* État */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">État</h3>
          <div className="space-y-2">
            {Object.entries(CONDITIONS).map(([key, value]) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.condition.includes(value)}
                  onChange={() => handleConditionToggle(value)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">
                  {CONDITION_LABELS[value]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Note minimum</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={filters.rating === rating}
                  onChange={() => onFiltersChange({ ...filters, rating })}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-700 ml-1">& plus</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;