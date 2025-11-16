// ============================================
// HERO SECTION v2.0 - NIVEAU MONDIAL
// Inspirations: Apple, Farfetch, SSENSE
// ============================================

import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate slides (optionnel)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
      title: 'Découvrez la Mode',
      subtitle: 'Circulaire & Responsable',
      description: 'Des milliers d\'articles uniques vous attendent',
      cta: 'Explorer la collection',
      ctaSecondary: 'Comment ça marche',
      gradient: 'from-orange-600/80 via-pink-600/70 to-purple-600/60'
    },
    {
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
      title: 'Vendez Simplement',
      subtitle: 'Gagnez en Donnant une Seconde Vie',
      description: 'Transformez votre garde-robe en revenus',
      cta: 'Commencer à vendre',
      ctaSecondary: 'Voir les tarifs',
      gradient: 'from-emerald-600/80 via-teal-600/70 to-cyan-600/60'
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
      title: 'Mode Premium',
      subtitle: 'Prix Accessibles',
      description: 'Les plus grandes marques à portée de main',
      cta: 'Voir les nouveautés',
      ctaSecondary: 'Parcourir',
      gradient: 'from-rose-600/80 via-pink-600/70 to-fuchsia-600/60'
    }
  ];

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] w-full overflow-hidden bg-neutral-900">
      
      {/* Background Images avec Parallax */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: isVisible ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 8s ease-out'
            }}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container-fluid mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT: Content */}
            <div 
              className={`
                space-y-8 text-white transform transition-all duration-1000 delay-300
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              `}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 animate-fade-in">
                <Sparkles className="w-5 h-5 text-primary-300" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary-200">
                  Nouveau sur UMMALL
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
                  <span className="block animate-slide-up">
                    {currentSlideData.title}
                  </span>
                  <span 
                    className="block mt-2 bg-gradient-to-r from-primary-300 via-secondary-300 to-pink-300 bg-clip-text text-transparent animate-slide-up"
                    style={{ animationDelay: '100ms' }}
                  >
                    {currentSlideData.subtitle}
                  </span>
                </h1>
                
                <p 
                  className="text-xl md:text-2xl text-white/90 font-light max-w-xl animate-slide-up"
                  style={{ animationDelay: '200ms' }}
                >
                  {currentSlideData.description}
                </p>
              </div>

              {/* CTAs */}
              <div 
                className="flex flex-col sm:flex-row gap-4 animate-slide-up"
                style={{ animationDelay: '300ms' }}
              >
                {/* Primary CTA */}
                <Link to="/search">
                  <button className="group relative px-8 py-4 bg-white text-neutral-900 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    <span className="relative z-10 flex items-center gap-2">
                      {currentSlideData.cta}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </Link>

                {/* Secondary CTA */}
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    {currentSlideData.ctaSecondary}
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div 
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20 animate-fade-in"
                style={{ animationDelay: '400ms' }}
              >
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-white/70">Articles</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-white mb-1">12K+</div>
                  <div className="text-sm text-white/70">Vendeurs</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                  <div className="text-sm text-white/70">Note moyenne</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Featured Product Card (Desktop only) */}
            <div 
              className={`
                hidden lg:block transform transition-all duration-1000 delay-500
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
              `}
            >
              <div className="relative group">
                {/* Glass Card */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105">
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse-glow">
                    <TrendingUp className="w-4 h-4" />
                    Tendance
                  </div>

                  {/* Image */}
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-white/5">
                    <img 
                      src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80" 
                      alt="Featured product"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-sm mb-1">Zara</p>
                        <h3 className="text-white font-bold text-xl">Pull Vintage</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-2xl">45€</div>
                        <div className="text-white/50 line-through text-sm">89€</div>
                      </div>
                    </div>

                    <button className="w-full bg-white text-neutral-900 py-3 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                      Voir le produit
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -z-10 -bottom-10 -left-10 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              h-1.5 rounded-full transition-all duration-500
              ${index === currentSlide 
                ? 'w-12 bg-white' 
                : 'w-6 bg-white/40 hover:bg-white/60'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full p-1">
          <div className="w-1.5 h-2 bg-white rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;