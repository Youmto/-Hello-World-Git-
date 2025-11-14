// ============================================
// FICHIER 10: src/pages/CategoryPage.jsx (PLACEHOLDER)
// ============================================

import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { slug } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Catégorie: {slug}</h1>
      <p className="text-gray-600 mt-4">Cette page sera développée dans la Phase 3</p>
    </div>
  );
}

export default CategoryPage;