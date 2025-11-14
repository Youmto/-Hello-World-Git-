// ============================================
// FICHIER 1: src/pages/HomePage.jsx
// ============================================

import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FilterBar from '../components/home/FilterBar';
import ProductGrid from '../components/home/ProductGrid';

function HomePage() {
  return (
    <>
      <HeroSection />
      <FilterBar />
      <ProductGrid />
    </>
  );
}

export default HomePage;