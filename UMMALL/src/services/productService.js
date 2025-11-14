// ============================================
// FICHIER 3: src/services/productService.js
// ============================================

import { api } from './api';

export const productService = {
  // Récupérer tous les produits avec filtres
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return await api.get(`/products?${params}`);
  },

  // Récupérer un produit par ID
  getById: async (id) => {
    return await api.get(`/products/${id}`);
  },

  // Récupérer les produits d'une catégorie
  getByCategory: async (categorySlug, filters = {}) => {
    const params = new URLSearchParams(filters);
    return await api.get(`/categories/${categorySlug}/products?${params}`);
  },

  // Rechercher des produits
  search: async (query, filters = {}) => {
    const params = new URLSearchParams({ q: query, ...filters });
    return await api.get(`/products/search?${params}`);
  },

  // Récupérer les produits similaires
  getRelated: async (productId) => {
    return await api.get(`/products/${productId}/related`);
  },

  // Récupérer les avis d'un produit
  getReviews: async (productId) => {
    return await api.get(`/products/${productId}/reviews`);
  }
};