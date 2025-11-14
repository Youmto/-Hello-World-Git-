// ============================================
// FICHIER 5: src/hooks/useLocalStorage.js
// ============================================

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Récupérer la valeur depuis localStorage ou utiliser la valeur initiale
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Erreur lors de la lecture de localStorage:', error);
      return initialValue;
    }
  });

  // Sauvegarder dans localStorage à chaque changement
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Erreur lors de l\'écriture dans localStorage:', error);
    }
  };

  return [storedValue, setValue];
};