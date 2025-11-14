// ============================================
// FICHIER 8: src/utils/validators.js
// ============================================

// Valider une adresse email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valider un mot de passe (min 8 caractères, 1 majuscule, 1 chiffre)
export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// Valider un numéro de téléphone français
export const validatePhone = (phone) => {
  const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return regex.test(phone);
};

// Valider un code postal français
export const validatePostalCode = (postalCode) => {
  const regex = /^[0-9]{5}$/;
  return regex.test(postalCode);
};

// Valider une carte bancaire (format basique)
export const validateCardNumber = (cardNumber) => {
  const regex = /^[0-9]{16}$/;
  return regex.test(cardNumber.replace(/\s/g, ''));
};

// Valider un CVV
export const validateCVV = (cvv) => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};

// Valider une date d'expiration (MM/YY)
export const validateExpiryDate = (expiry) => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiry)) return false;
  
  const [month, year] = expiry.split('/');
  const now = new Date();
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  
  return expiryDate > now;
};


// ============================================
// FICHIER 9: src/utils/helpers.js
// ============================================

// Calculer la réduction en pourcentage
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Générer un slug à partir d'un texte
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Grouper un tableau par propriété
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

// Mélanger un tableau (shuffle)
export const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Debounce une fonction
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Copier dans le presse-papiers
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Erreur lors de la copie:', error);
    return false;
  }
};
