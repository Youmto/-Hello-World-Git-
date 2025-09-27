// src/App.jsx
import React from 'react';
import Header from '../src/components/Header'; // Nous allons créer celui-ci
import aboutus from '../src/components/aboutus'; // Et celui-là
import Footer from '../src/components/Footer'; // Et enfin notre Footer
import { Sidebar } from 'lucide-react';

function Product() {
  return (
    <body className="flex flex-col min-h-screen bg-background text-text-dark">
      <header>
        <Header />
      </header>
      <main className="flex-grow">
       <aboutus />
      </main>
      <footer>
        <Footer />
      </footer>
    </body>
  );
}

export default Product; 