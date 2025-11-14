import { api } from './api';

export const authService = {
  // Connexion
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },

  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Récupérer le profil utilisateur
  getProfile: async () => {
    return await api.get('/auth/profile');
  },

  // Mettre à jour le profil
  updateProfile: async (userData) => {
    return await api.put('/auth/profile', userData);
  },

  // Changer le mot de passe
  changePassword: async (oldPassword, newPassword) => {
    return await api.post('/auth/change-password', { oldPassword, newPassword });
  },

  // Réinitialiser le mot de passe
  resetPassword: async (email) => {
    return await api.post('/auth/reset-password', { email });
  }
};
