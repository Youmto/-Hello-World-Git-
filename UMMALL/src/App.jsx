// src/App.jsx
import React from 'react';
import Header from './components/Header'; // Nous allons créer celui-ci
import HeroSection from './components/HeroSection.jsx'; // Et celui-là
import ProductGrid from './components/ProductGrid'; // Puis celui-ci
import Footer from './components/Footer'; // Et enfin notre Footer

function App() {
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

export default App;