// ============================================
// FICHIER 2: src/components/checkout/ShippingForm.jsx
// Formulaire adresse de livraison
// ============================================

import React from 'react';
import { MapPin, Truck, Clock, Store } from 'lucide-react';
import Input from '../common/Input';

function ShippingForm({ data, onChange, shippingMethod, onShippingMethodChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Livraison Standard',
      price: 5.99,
      duration: '3-5 jours ouvrés',
      icon: Truck,
      description: 'Livraison à domicile'
    },
    {
      id: 'express',
      name: 'Livraison Express',
      price: 12.99,
      duration: '1-2 jours ouvrés',
      icon: Clock,
      description: 'Livraison rapide garantie'
    },
    {
      id: 'pickup',
      name: 'Retrait en magasin',
      price: 0,
      duration: 'Dès demain',
      icon: Store,
      description: 'Gratuit - Disponible sous 24h'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Adresse de livraison</h2>
            <p className="text-sm text-gray-600">Où souhaitez-vous recevoir votre commande ?</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom *"
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="Jean"
            />
            <Input
              label="Nom *"
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Dupont"
            />
          </div>

          <Input
            label="Email *"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="jean.dupont@example.com"
          />

          <Input
            label="Téléphone *"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="0612345678"
          />

          <Input
            label="Adresse *"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="12 Rue de la Paix"
          />

          <Input
            label="Complément d'adresse (optionnel)"
            value={data.address2}
            onChange={(e) => handleChange('address2', e.target.value)}
            placeholder="Appartement, étage, etc."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Code postal *"
              value={data.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              placeholder="75001"
            />
            <Input
              label="Ville *"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Paris"
              className="md:col-span-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pays *
            </label>
            <select
              value={data.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
            >
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Luxembourg">Luxembourg</option>
            </select>
          </div>
        </div>
      </div>

      {/* Options de livraison */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mode de livraison</h3>
        
        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onShippingMethodChange(option.id)}
              className={`
                w-full p-4 rounded-lg border-2 transition-all text-left
                ${shippingMethod === option.id
                  ? 'border-primary bg-orange-50 ring-2 ring-primary ring-offset-2'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${shippingMethod === option.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                  `}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <p className="font-bold text-gray-900">{option.name}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                    <p className="text-sm font-semibold text-primary mt-1">{option.duration}</p>
                  </div>
                </div>

                <span className="text-lg font-bold text-gray-900">
                  {option.price === 0 ? 'Gratuit' : `${option.price.toFixed(2)} €`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShippingForm;