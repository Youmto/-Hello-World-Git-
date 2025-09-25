// src/components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

function ProductGrid() {
  return (
    <section className="container mx-auto p-4 my-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text-dark">
        Articles du moment
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;