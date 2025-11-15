// ============================================
// FICHIER 3: src/components/checkout/PaymentForm.jsx
// Formulaire de paiement
// ============================================

import React from 'react';
import { CreditCard, Smartphone, Building, Wallet } from 'lucide-react';
import Input from '../common/Input';

function PaymentForm({ method, onMethodChange, data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Formater le numéro de carte (espaces tous les 4 chiffres)
  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value;
  };

  // Formater la date d'expiration (MM/YY)
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: CreditCard,
      description: 'Visa, Mastercard, Amex'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Orange Money, MTN, Moov'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Paiement sécurisé PayPal'
    },
    {
      id: 'bank_transfer',
      name: 'Virement bancaire',
      icon: Building,
      description: 'Virement SEPA'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mode de paiement</h2>
            <p className="text-sm text-gray-600">Vos informations sont 100% sécurisées</p>
          </div>
        </div>

        {/* Sélection méthode de paiement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {paymentMethods.map((pm) => (
            <button
              key={pm.id}
              onClick={() => onMethodChange(pm.id)}
              className={`
                p-4 rounded-lg border-2 transition-all text-left
                ${method === pm.id
                  ? 'border-primary bg-orange-50 ring-2 ring-primary ring-offset-2'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${method === pm.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <pm.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{pm.name}</p>
                  <p className="text-xs text-gray-600">{pm.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Formulaire carte bancaire */}
        {method === 'card' && (
          <div className="space-y-4 pt-4 border-t">
            <Input
              label="Numéro de carte *"
              value={data.cardNumber}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                if (formatted.replace(/\s/g, '').length <= 16) {
                  handleChange('cardNumber', formatted);
                }
              }}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />

            <Input
              label="Nom sur la carte *"
              value={data.cardName}
              onChange={(e) => handleChange('cardName', e.target.value.toUpperCase())}
              placeholder="JEAN DUPONT"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date d'expiration *"
                value={data.expiryDate}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value);
                  if (formatted.length <= 5) {
                    handleChange('expiryDate', formatted);
                  }
                }}
                placeholder="MM/YY"
                maxLength={5}
              />
              <Input
                label="CVV *"
                type="password"
                value={data.cvv}
                onChange={(e) => {
                  if (e.target.value.length <= 3) {
                    handleChange('cvv', e.target.value);
                  }
                }}
                placeholder="123"
                maxLength={3}
              />
            </div>

            {/* Logos cartes */}
            <div className="flex items-center gap-3 pt-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6" />
            </div>
          </div>
        )}

        {/* Mobile Money */}
        {method === 'mobile_money' && (
          <div className="space-y-4 pt-4 border-t">
            <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-4">
              📱 Vous serez redirigé vers votre opérateur mobile pour finaliser le paiement.
            </p>
            <Input
              label="Numéro de téléphone *"
              value={data.mobileNumber || ''}
              onChange={(e) => handleChange('mobileNumber', e.target.value)}
              placeholder="0612345678"
            />
          </div>
        )}

        {/* PayPal */}
        {method === 'paypal' && (
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-4">
              💳 Vous serez redirigé vers PayPal pour finaliser le paiement en toute sécurité.
            </p>
          </div>
        )}

        {/* Virement bancaire */}
        {method === 'bank_transfer' && (
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              ⏱️ Votre commande sera traitée après réception du virement (2-3 jours ouvrés).
              Les coordonnées bancaires vous seront envoyées par email.
            </p>
          </div>
        )}
      </div>

      {/* Sécurité */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Paiement 100% sécurisé</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Vos informations de paiement sont cryptées avec le protocole SSL 256-bit.
              Nous ne stockons jamais vos données bancaires. Certifié PCI-DSS niveau 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;