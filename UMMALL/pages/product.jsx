// src/App.jsx
import React from 'react';
import Header from '../src/components/Header'; // Nous allons créer celui-ci
import HeroSection from '../src/components/HeroSection'; // Et celui-là
import ProductGrid from '../src/components/ProductGrid'; // Puis celui-ci
import Footer from '../src/components/Footer'; // Et enfin notre Footer

function Product() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-dark">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default Product; 