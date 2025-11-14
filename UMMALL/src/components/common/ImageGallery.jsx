// ============================================
// FICHIER 8: src/components/common/ImageGallery.jsx
// ============================================

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  if (images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg flex items-center justify-center h-96">
        <p className="text-gray-500">Aucune image disponible</p>
      </div>
    );
  }
  
  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <img
          src={images[selectedIndex]}
          alt={`Product image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Boutons navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {/* Indicateur */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Miniatures */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                aspect-square rounded-lg overflow-hidden border-2 transition-all
                ${index === selectedIndex ? 'border-primary' : 'border-transparent hover:border-gray-300'}
              `}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;