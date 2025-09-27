// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from '../src/components/Header'; // Nous allons créer celui-ci
import HeroSection from '../src/components/HeroSection'; // Et celui-là
import ProductGrid from '../src/components/ProductGrid'; // Puis celui-ci
import Footer from '../src/components/Footer'; // Et enfin notre Footer
import SideBar from '../src/components/SideBar'; // Et enfin notre Footer
import StickyHeader from '../src/components/stickyheader'; // Et enfin notre Footer
import { Sidebar } from 'lucide-react';



function Product() {
const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // attach listener
    window.addEventListener("scroll", handleScroll);

    // cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <body className="flex flex-col min-h-screen bg-background text-text-dark">
      <header>
        <Header />

      </header>
      <main className="flex-grow">
        {scrolled && <StickyHeader />}
        <section className="flex">
          <div className='hidden'>
            <SideBar />
          </div>

          <div className="flex-grow">
          <HeroSection />
          <ProductGrid />
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </body>
  );
}

export default Product; 