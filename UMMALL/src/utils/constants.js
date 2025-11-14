// ============================================
// FICHIER 8: src/utils/constants.js
// ============================================

export const CONDITIONS = {
  NEUF: 'neuf',
  COMME_NEUF: 'comme_neuf',
  BON_ETAT: 'bon_etat',
  ACCEPTABLE: 'acceptable'
};

export const CONDITION_LABELS = {
  [CONDITIONS.NEUF]: 'Neuf',
  [CONDITIONS.COMME_NEUF]: 'Comme neuf',
  [CONDITIONS.BON_ETAT]: 'Bon état',
  [CONDITIONS.ACCEPTABLE]: 'Acceptable'
};

export const ORDER_STATUS = {
  EN_ATTENTE: 'en_attente',
  CONFIRMEE: 'confirmee',
  EXPEDIEE: 'expediee',
  LIVREE: 'livree',
  ANNULEE: 'annulee'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.EN_ATTENTE]: 'En attente',
  [ORDER_STATUS.CONFIRMEE]: 'Confirmée',
  [ORDER_STATUS.EXPEDIEE]: 'Expédiée',
  [ORDER_STATUS.LIVREE]: 'Livrée',
  [ORDER_STATUS.ANNULEE]: 'Annulée'
};

export const PAYMENT_METHODS = {
  CARTE: 'carte_bancaire',
  MOBILE_MONEY: 'mobile_money',
  PAYPAL: 'paypal',
  VIREMENT: 'virement'
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CARTE]: 'Carte bancaire',
  [PAYMENT_METHODS.MOBILE_MONEY]: 'Mobile Money',
  [PAYMENT_METHODS.PAYPAL]: 'PayPal',
  [PAYMENT_METHODS.VIREMENT]: 'Virement bancaire'
};

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'popular', label: 'Plus populaires' }
];

export const PRICE_RANGES = [
  { min: 0, max: 20, label: 'Moins de 20€' },
  { min: 20, max: 50, label: '20€ - 50€' },
  { min: 50, max: 100, label: '50€ - 100€' },
  { min: 100, max: 200, label: '100€ - 200€' },
  { min: 200, max: null, label: 'Plus de 200€' }
];