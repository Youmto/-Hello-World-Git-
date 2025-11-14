// ============================================
// FICHIER 4: src/context/FavoritesContext.jsx
// ============================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis localStorage au montage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const favoriteCount = favorites.length;

  // Ajouter un produit aux favoris
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      // Vérifier si le produit n'est pas déjà dans les favoris
      if (!prevFavorites.some((fav) => fav.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  // Retirer un produit des favoris
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== productId)
    );
  };

  // Toggle favori (ajouter ou retirer)
  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Vérifier si un produit est dans les favoris
  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  // Vider tous les favoris
  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    favoriteCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};