// ============================================
// FICHIER 3: src/context/CartContext.jsx
// ============================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculer le nombre total d'articles
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculer le sous-total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculer la livraison (gratuite si > 50€, sinon 5€)
  const shipping = subtotal > 50 ? 0 : 5;

  // Calculer les taxes (20%)
  const tax = (subtotal + shipping) * 0.2;

  // Total
  const total = subtotal + shipping + tax;

  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        // Augmenter la quantité si le produit existe déjà
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Ajouter un nouveau produit
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Vérifier si un produit est dans le panier
  const isInCart = (productId) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const value = {
    cartItems,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
