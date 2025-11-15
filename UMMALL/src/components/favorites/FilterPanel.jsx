// ============================================
// FICHIER 4: src/components/favorites/FilterPanel.jsx
// Panel de filtres
// ============================================

import React from 'react';
import { X } from 'lucide-react';
import Badge from '../common/Badge';
import { CONDITIONS, CONDITION_LABELS } from '../../utils/constants';

function FilterPanel({ filters, onFiltersChange, availableFavorites }) {
  // Extraire les catégories uniques
  const categories = [...new Set(availableFavorites.map(item => item.category?.slug).filter(Boolean))];

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleConditionToggle = (condition) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter(c => c !== condition)
      : [...filters.condition, condition];
    
    onFiltersChange({ ...filters, condition: newConditions });
  };

  const handleAvailabilityChange = (availability) => {
    onFiltersChange({ ...filters, availability });
  };

  const handlePriceRangeChange = (range) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const resetFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 1000],
      condition: [],
      availability: 'all'
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.condition.length > 0 || 
    filters.availability !== 'all';

  return (
    <div className="mt-4 pt-4 border-t animate-in slide-in-from-top">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Disponibilité */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Disponibilité</h4>
          <div className="space-y-2">
            {['all', 'available', 'sold'].map((avail) => (
              <label key={avail} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={filters.availability === avail}
                  onChange={() => handleAvailabilityChange(avail)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">
                  {avail === 'all' && 'Tous'}
                  {avail === 'available' && 'Disponibles'}
                  {avail === 'sold' && 'Épuisés'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Catégories */}
        {categories.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Catégories</h4>
            <div className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Condition */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">État</h4>
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

        {/* Réinitialiser */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold"
            >
              <X className="w-5 h-5" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;