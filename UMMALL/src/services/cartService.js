// ============================================
// FICHIER 5: src/services/cartService.js
// ============================================

import { api } from './api';

export const cartService = {
  // Récupérer le panier
  getCart: async () => {
    return await api.get('/cart');
  },

  // Ajouter un produit au panier
  addItem: async (productId, quantity = 1) => {
    return await api.post('/cart/items', { productId, quantity });
  },

  // Mettre à jour la quantité
  updateItem: async (itemId, quantity) => {
    return await api.put(`/cart/items/${itemId}`, { quantity });
  },

  // Supprimer un article
  removeItem: async (itemId) => {
    return await api.delete(`/cart/items/${itemId}`);
  },

  // Vider le panier
  clear: async () => {
    return await api.delete('/cart');
  },

  // Appliquer un code promo
  applyPromo: async (code) => {
    return await api.post('/cart/promo', { code });
  }
};