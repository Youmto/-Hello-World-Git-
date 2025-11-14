
// ============================================
// FICHIER 1: src/components/product/ProductImageGallery.jsx
// Galerie d'images avec zoom et navigation fluide
// ============================================

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

function ProductImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-xl flex items-center justify-center h-96">
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
    <>
      <div className="space-y-4">
        {/* Image principale */}
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg aspect-square group">
          <img
            src={images[selectedIndex]}
            alt={`Product image ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Bouton zoom */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all shadow-lg opacity-0 group-hover:opacity-100"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Boutons navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Indicateur */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`
                  aspect-square rounded-lg overflow-hidden border-3 transition-all transform hover:scale-105
                  ${index === selectedIndex
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : 'border-gray-200 hover:border-gray-400'
                  }
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

      {/* Modal Zoom */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 bg-white rounded-full p-3 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[selectedIndex]}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

export default ProductImageGallery;