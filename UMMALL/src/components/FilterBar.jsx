// src/components/FilterBar.jsx
import React from 'react';

const categories = [
  "Tous", "Mode", "Chaussures", "Maison", "Enfants",
  "Beauté", "Livres", "Jeux vidéo", "Sports", "Technologie"
];

function FilterBar() {
  return (
    <div className="bg-white sticky top-16 md:top-20 z-10 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide px-4 py-2">
      <div className="flex space-x-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`btn btn-sm rounded-full text-sm font-semibold border-2 border-transparent transition-all duration-200
              ${index === 0 ? 'bg-primary text-white hover:bg-orange-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;