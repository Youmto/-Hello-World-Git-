// ============================================
// FICHIER 7: src/services/favoriteService.js
// ============================================

import { api } from './api';

export const favoriteService = {
  // Récupérer tous les favoris
  getAll: async () => {
    return await api.get('/favorites');
  },

  // Ajouter aux favoris
  add: async (productId) => {
    return await api.post('/favorites', { productId });
  },

  // Retirer des favoris
  remove: async (productId) => {
    return await api.delete(`/favorites/${productId}`);
  },

  // Vérifier si un produit est favori
  check: async (productId) => {
    return await api.get(`/favorites/check/${productId}`);
  }
};