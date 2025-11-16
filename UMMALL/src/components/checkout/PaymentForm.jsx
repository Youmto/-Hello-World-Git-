// ============================================
// FICHIER: src/components/checkout/PaymentForm.jsx
// Design Premium - Formulaire paiement
// ============================================

import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  AlertCircle,
  Check,
  HelpCircle
} from 'lucide-react';
import Button from '../common/Button';

function PaymentForm({ onSubmit, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'paypal'
  
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Détection type de carte
  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return null;
  };

  const cardType = getCardType(cardData.number);

  // Validation Luhn algorithm
  const validateLuhn = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (!/^\d+$/.test(cleaned)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'number':
        const cleaned = value.replace(/\s/g, '');
        if (cleaned.length < 13) return 'Numéro de carte incomplet';
        if (!validateLuhn(cleaned)) return 'Numéro de carte invalide';
        return '';
      
      case 'name':
        return value.trim().length < 3 ? 'Nom invalide' : '';
      
      case 'expiry':
        const [month, year] = value.split('/');
        if (!month || !year) return 'Date invalide';
        const m = parseInt(month);
        const y = parseInt('20' + year);
        const now = new Date();
        if (m < 1 || m > 12) return 'Mois invalide';
        if (y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth() + 1)) {
          return 'Carte expirée';
        }
        return '';
      
      case 'cvv':
        const cvvLength = cardType === 'amex' ? 4 : 3;
        return value.length !== cvvLength ? `CVV invalide (${cvvLength} chiffres)` : '';
      
      default:
        return '';
    }
  };

  const handleCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // Format card number
    if (name === 'number') {
      const cleaned = value.replace(/\s/g, '');
      const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
      newValue = formatted.slice(0, 19);
    }

    // Format expiry
    if (name === 'expiry') {
      let cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }
      newValue = cleaned.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      newValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardData(prev => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'paypal') {
      // Handle PayPal
      if (onSubmit) onSubmit({ method: 'paypal' });
      return;
    }

    // Validate card
    const fields = ['number', 'name', 'expiry', 'cvv'];
    const newErrors = {};
    let hasErrors = false;

    fields.forEach(field => {
      const error = validateField(field, cardData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(Object.fromEntries(fields.map(f => [f, true])));

    if (!hasErrors && onSubmit) {
      onSubmit({
        method: 'card',
        ...cardData,
      });
    }
  };

  const CardIcon = () => {
    if (!cardType) return <CreditCard className="w-6 h-6 text-neutral-400" />;
    
    const icons = {
      visa: <svg className="w-10 h-6" viewBox="0 0 40 24"><path fill="#1434CB" d="M0 0h40v24H0z"/><path fill="#FFF" d="M16.2 16.4l2-12h3.2l-2 12h-3.2zm-6.4 0l-3.1-8.3-.4 1.8-1.3 6.5H2l3.3-12h4l3.1 8.2.3-1.6L14 4.4h3.3l-3.8 12h-3.7zm22.6-12h3l-2.6 12h-3.1l-.7-1.8h-3.4l-.6 1.8h-3.5l4.3-10.9c.3-.7.9-1.1 1.6-1.1h2zm-2.2 7.7l-1-2.7-.7 2.7h1.7zm-12.7 4.3c0-1.9 2.6-2 4.1-2.4 1.5-.3 1.9-.6 1.9-1.2 0-.9-1.1-1.3-2.1-1.3-1.2 0-2.2.3-3.1.7l-.5-2.3c.9-.4 2.3-.7 3.7-.7 3.1 0 5.2 1.3 5.2 3.7 0 2.5-2.4 2.9-4 3.2-1.3.3-1.8.5-1.8 1.1 0 .8 1 1.1 1.9 1.1 1 0 2-.2 2.8-.5l.5 2.2c-.8.3-2 .6-3.3.6-3.3 0-5.3-1.5-5.3-3.7z"/></svg>,
      mastercard: <svg className="w-10 h-6" viewBox="0 0 40 24"><path fill="#FF5F00" d="M15.245 22.315h9.51V1.686h-9.51z"/><path fill="#EB001B" d="M15.87 12c0-3.667 1.77-6.93 4.5-9h-.36C16.575 6.057 14 8.78 14 12s2.575 5.943 6.01 9h.36c-2.73-2.07-4.5-5.333-4.5-9z"/><path fill="#F79E1B" d="M26 12c0 3.22-2.575 5.943-6.01 9h.36c3.435-3.057 6.01-5.78 6.01-9s-2.575-5.943-6.01-9h-.36c3.435 3.07 6.01 5.78 6.01 9z"/></svg>,
      amex: <svg className="w-10 h-6" viewBox="0 0 40 24"><path fill="#006FCF" d="M0 0h40v24H0z"/><path fill="#FFF" d="M6.5 9.5L7.3 7h2l-.8 2.5h1.3l.8-2.5h2l-.8 2.5H13l.8-2.5h2l-1.6 5h-2l.8-2.5h-1.3l-.8 2.5h-2l.8-2.5H8.4l-.8 2.5h-2l1.6-5zm15 0l1.6-5h6v1.5h-4l-.3 1h3.7v1.5h-3.4l-.3 1h4v1.5h-6l-1 3h-2zm8 0l1.6-5h2l2.3 3.5L36.6 4.5h2l-1.6 5h-2l.8-2.5-2.3-3.5-1.5 4.5h-2z"/></svg>
    };
    
    return icons[cardType] || <CreditCard className="w-6 h-6 text-neutral-400" />;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Payment method selection */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h3 className="text-lg font-bold text-neutral-900">
          Méthode de paiement
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${paymentMethod === 'card'
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }
            `}
          >
            <CreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-primary-600' : 'text-neutral-600'}`} />
            <span className={`font-semibold ${paymentMethod === 'card' ? 'text-primary-900' : 'text-neutral-900'}`}>
              Carte bancaire
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200
              ${paymentMethod === 'paypal'
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }
            `}
          >
            <svg className="w-20 h-6 mx-auto mb-2" viewBox="0 0 100 32"><path fill="#003087" d="M12 4.9h8.9c5.9 0 9.8 2.9 9.8 8.5 0 6.7-4.5 11.1-11.3 11.1h-3.2l-1.5 8.4H9.5L12 4.9zm8.5 15.5c3.7 0 6.1-2.2 6.1-5.6 0-3-2.1-4.6-5.5-4.6h-3.5l-1.8 10.2h4.7z"/><path fill="#009cde" d="M35 4.9h8.9c5.9 0 9.8 2.9 9.8 8.5 0 6.7-4.5 11.1-11.3 11.1h-3.2l-1.5 8.4h-5.2L35 4.9zm8.5 15.5c3.7 0 6.1-2.2 6.1-5.6 0-3-2.1-4.6-5.5-4.6H41l-1.8 10.2h4.3z"/></svg>
          </button>
        </div>
      </div>

      {/* Card form */}
      {paymentMethod === 'card' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900">
              Informations de carte
            </h3>
            <div className="flex items-center gap-2 text-sm text-success-600">
              <Lock className="w-4 h-4" />
              <span className="font-medium">Paiement sécurisé</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Card number */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                Numéro de carte <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <CardIcon />
                </div>
                <input
                  name="number"
                  value={cardData.number}
                  onChange={handleCardChange}
                  onBlur={handleBlur}
                  placeholder="1234 5678 9012 3456"
                  className={`
                    w-full pl-16 pr-4 py-3.5 rounded-xl font-mono
                    border-2 transition-all duration-200
                    ${touched.number && errors.number
                      ? 'border-error-500 bg-error-50'
                      : touched.number && !errors.number
                      ? 'border-success-500 bg-success-50'
                      : 'border-neutral-200 focus:border-primary-500 bg-white'
                    }
                    focus:outline-none focus:ring-4 focus:ring-primary-100
                  `}
                />
                {touched.number && !errors.number && cardData.number && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success-500" />
                )}
              </div>
              {touched.number && errors.number && (
                <div className="flex items-center gap-1.5 text-sm text-error-600 mt-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.number}</span>
                </div>
              )}
            </div>

            {/* Card name */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                Nom sur la carte <span className="text-error-500">*</span>
              </label>
              <input
                name="name"
                value={cardData.name}
                onChange={handleCardChange}
                onBlur={handleBlur}
                placeholder="JEAN DUPONT"
                className={`
                  w-full px-4 py-3.5 rounded-xl uppercase
                  border-2 transition-all duration-200
                  ${touched.name && errors.name
                    ? 'border-error-500 bg-error-50'
                    : touched.name && !errors.name
                    ? 'border-success-500 bg-success-50'
                    : 'border-neutral-200 focus:border-primary-500 bg-white'
                  }
                  focus:outline-none focus:ring-4 focus:ring-primary-100
                `}
              />
              {touched.name && errors.name && (
                <div className="flex items-center gap-1.5 text-sm text-error-600 mt-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                  Date d'expiration <span className="text-error-500">*</span>
                </label>
                <input
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleCardChange}
                  onBlur={handleBlur}
                  placeholder="MM/AA"
                  className={`
                    w-full px-4 py-3.5 rounded-xl font-mono
                    border-2 transition-all duration-200
                    ${touched.expiry && errors.expiry
                      ? 'border-error-500 bg-error-50'
                      : touched.expiry && !errors.expiry
                      ? 'border-success-500 bg-success-50'
                      : 'border-neutral-200 focus:border-primary-500 bg-white'
                    }
                    focus:outline-none focus:ring-4 focus:ring-primary-100
                  `}
                />
                {touched.expiry && errors.expiry && (
                  <div className="flex items-center gap-1.5 text-sm text-error-600 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.expiry}</span>
                  </div>
                )}
              </div>

              {/* CVV */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-1.5 flex items-center gap-1">
                  CVV <span className="text-error-500">*</span>
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 text-neutral-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      3 chiffres au dos (4 pour Amex)
                    </div>
                  </div>
                </label>
                <input
                  name="cvv"
                  type="password"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  onBlur={handleBlur}
                  placeholder="123"
                  maxLength={4}
                  className={`
                    w-full px-4 py-3.5 rounded-xl font-mono
                    border-2 transition-all duration-200
                    ${touched.cvv && errors.cvv
                      ? 'border-error-500 bg-error-50'
                      : touched.cvv && !errors.cvv
                      ? 'border-success-500 bg-success-50'
                      : 'border-neutral-200 focus:border-primary-500 bg-white'
                    }
                    focus:outline-none focus:ring-4 focus:ring-primary-100
                  `}
                />
                {touched.cvv && errors.cvv && (
                  <div className="flex items-center gap-1.5 text-sm text-error-600 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.cvv}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Save card */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="saveCard"
                checked={cardData.saveCard}
                onChange={handleCardChange}
                className="w-5 h-5 rounded border-2 border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-neutral-900 group-hover:text-primary-600 transition-colors">
                Sauvegarder cette carte pour mes prochains achats
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Security badges */}
      <div className="bg-gradient-to-r from-success-50 to-primary-50 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-neutral-700">
            <Shield className="w-5 h-5 text-success-600" />
            <span>Paiement 100% sécurisé</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-neutral-300" />
          <div className="flex items-center gap-2 text-neutral-700">
            <Lock className="w-5 h-5 text-primary-600" />
            <span>Cryptage SSL</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-neutral-300" />
          <div className="flex items-center gap-2 text-neutral-700">
            <Check className="w-5 h-5 text-secondary-600" />
            <span>Certifié PCI DSS</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between">
        {onBack && (
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            size="large"
          >
            Retour
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="sm:ml-auto"
          icon={<Lock className="w-5 h-5" />}
        >
          Valider le paiement
        </Button>
      </div>
    </form>
  );
}

export default PaymentForm;