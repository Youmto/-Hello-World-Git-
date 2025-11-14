// ============================================
// FICHIER 4: src/components/common/Loader.jsx
// ============================================

import React from 'react';
import { Loader2 } from 'lucide-react';

// Loader spinner simple
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <Loader2 className={`${sizes[size]} animate-spin text-primary ${className}`} />
  );
};

// Loader pleine page
export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    </div>
  );
};

// Skeleton loader pour les cartes produits
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4">
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
};

// Skeleton loader générique
export const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${width} ${height} ${className}`} />
  );
};

const Loader = {
  Spinner,
  PageLoader,
  ProductCardSkeleton,
  Skeleton
};

export default Loader;