// src/components/HeroSection.jsx
import React from 'react';
// Vous pouvez utiliser une image depuis votre dossier assets ou un lien public
import heroImage from '../assets/iphone.jpg';

function HeroSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center text-center overflow-hidden">
      {/* Image de fond avec un overlay sombre */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Contenu de la Hero Section */}
      <div className="relative z-10 p-4">
        {/* Titre et slogan */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Prêt à faire du tri dans tes placards ?
        </h1>
        
        {/* Boutons d'appel à l'action */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button className="btn btn-lg bg-primary text-white hover:bg-orange-600 border-none transition-colors duration-300">
            Commencer à vendre
          </button>
          <a href="#" className="link link-hover text-white text-lg font-semibold mt-4 sm:mt-0">
            Découvrir comment ça marche
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;