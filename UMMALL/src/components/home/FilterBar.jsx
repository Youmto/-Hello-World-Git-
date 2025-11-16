// ============================================
// FILTER BAR v2.0 - MODERNE & SOPHISTIQUÉ
// Design: Sticky, Smooth, Interactive
// Inspirations: Airbnb, Booking, Farfetch
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

function FilterBar({ onFilterChange, activeFilters = [] }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les articles', icon: '🌟', color: 'from-primary-500 to-orange-600' },
    { id: 'new', name: 'Nouveautés', icon: '✨', color: 'from-blue-500 to-cyan-600' },
    { id: 'trending', name: 'Tendances', icon: '🔥', color: 'from-red-500 to-pink-600' },
    { id: 'women', name: 'Femme', icon: '👗', color: 'from-pink-500 to-rose-600' },
    { id: 'men', name: 'Homme', icon: '👔', color: 'from-indigo-500 to-blue-600' },
    { id: 'kids', name: 'Enfants', icon: '🧸', color: 'from-purple-500 to-pink-600' },
    { id: 'shoes', name: 'Chaussures', icon: '👟', color: 'from-amber-500 to-orange-600' },
    { id: 'accessories', name: 'Accessoires', icon: '👜', color: 'from-teal-500 to-emerald-600' },
    { id: 'beauty', name: 'Beauté', icon: '💄', color: 'from-rose-500 to-pink-600' },
    { id: 'home', name: 'Maison', icon: '🏠', color: 'from-green-500 to-emerald-600' },
    { id: 'tech', name: 'Tech', icon: '📱', color: 'from-slate-500 to-gray-600' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'from-lime-500 to-green-600' },
  ];

  // Détecter si on peut scroller
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onFilterChange) {
      onFilterChange({ category: categoryId });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    if (onFilterChange) {
      onFilterChange({ category: 'all' });
    }
  };

  return (
    <div className="sticky top-[8.5rem] z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
      <div className="container-fluid mx-auto">
        <div className="relative py-4">
          
          {/* Left Scroll Button */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-neutral-200 hover:border-primary-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
          )}

          {/* Categories Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    group relative flex-shrink-0 px-5 py-3 rounded-2xl font-semibold text-sm
                    transition-all duration-300 transform
                    ${isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:scale-105'
                    }
                  `}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {category.icon}
                    </span>
                    <span>{category.name}</span>
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse" />
                  )}

                  {/* Hover Glow */}
                  {!isActive && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Button */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-neutral-200 hover:border-primary-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          )}
        </div>

        {/* Active Filters & Advanced Filters Row */}
        {(activeFilters.length > 0 || selectedCategory !== 'all') && (
          <div className="pb-4 flex items-center justify-between gap-4">
            
            {/* Active Filters Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {selectedCategory !== 'all' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-semibold border border-primary-200">
                  <span>
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="hover:bg-primary-100 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl text-sm font-semibold"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => filter.onRemove?.()}
                    className="hover:bg-neutral-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Advanced Filters Button */}
            <button className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-neutral-200 hover:border-primary-500 rounded-xl font-semibold text-sm text-neutral-700 hover:text-primary-600 transition-all duration-300 hover:shadow-lg">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres avancés</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;