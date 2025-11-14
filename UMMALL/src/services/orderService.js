// ============================================
// FICHIER 6: src/services/orderService.js
// ============================================

import { api } from './api';

export const orderService = {
  // Créer une commande
  create: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  // Récupérer toutes les commandes de l'utilisateur
  getAll: async () => {
    return await api.get('/orders');
  },

  // Récupérer une commande par ID
  getById: async (orderId) => {
    return await api.get(`/orders/${orderId}`);
  },

  // Annuler une commande
  cancel: async (orderId) => {
    return await api.post(`/orders/${orderId}/cancel`);
  }
};