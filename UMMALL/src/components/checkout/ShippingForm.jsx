// ============================================
// FICHIER: src/components/checkout/ShippingForm.jsx
// Design Premium - Formulaire livraison
// ============================================

import React, { useState } from 'react';
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Map, 
  Globe,
  AlertCircle,
  Check 
} from 'lucide-react';
import Button from '../common/Button';

function ShippingForm({ initialData = {}, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    address2: initialData.address2 || '',
    postalCode: initialData.postalCode || '',
    city: initialData.city || '',
    country: initialData.country || 'France',
    instructions: initialData.instructions || '',
    saveAddress: false,
    sameAsBilling: true,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length < 2 ? 'Minimum 2 caractères' : '';
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Email invalide' : '';
      
      case 'phone':
        const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
        const cleanPhone = value.replace(/\s/g, '');
        return !phoneRegex.test(cleanPhone) ? 'Téléphone invalide (ex: 06 12 34 56 78)' : '';
      
      case 'address':
        return value.trim().length < 5 ? 'Adresse trop courte' : '';
      
      case 'postalCode':
        return !/^\d{5}$/.test(value) ? 'Code postal invalide (5 chiffres)' : '';
      
      case 'city':
        return value.trim().length < 2 ? 'Ville invalide' : '';
      
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Auto-format phone
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      const formatted = cleaned.match(/.{1,2}/g)?.join(' ') || cleaned;
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }

    // Validate on change if already touched
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

    // Validate all fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'postalCode', 'city'];
    const newErrors = {};
    let hasErrors = false;

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(Object.fromEntries(requiredFields.map(f => [f, true])));

    if (!hasErrors && onSubmit) {
      onSubmit(formData);
    }
  };

  const InputField = ({ 
    name, 
    label, 
    icon: Icon, 
    type = 'text', 
    required = false,
    placeholder,
    ...props 
  }) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && formData[name];

    return (
      <div className="space-y-1.5">
        <label htmlFor={name} className="block text-sm font-semibold text-neutral-900">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
        
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className={`w-5 h-5 ${hasError ? 'text-error-500' : isValid ? 'text-success-500' : 'text-neutral-400'}`} />
          </div>
          
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
              w-full pl-12 pr-12 py-3.5 rounded-xl
              border-2 transition-all duration-200
              ${hasError
                ? 'border-error-500 focus:border-error-600 bg-error-50'
                : isValid
                ? 'border-success-500 focus:border-success-600 bg-success-50'
                : 'border-neutral-200 focus:border-primary-500 bg-white'
              }
              focus:outline-none focus:ring-4 focus:ring-primary-100
            `}
            {...props}
          />

          {isValid && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Check className="w-5 h-5 text-success-500" />
            </div>
          )}
        </div>

        {hasError && (
          <div className="flex items-center gap-1.5 text-sm text-error-600">
            <AlertCircle className="w-4 h-4" />
            <span>{errors[name]}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Informations personnelles */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-500" />
          Informations personnelles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="firstName"
            label="Prénom"
            icon={User}
            placeholder="Jean"
            required
          />

          <InputField
            name="lastName"
            label="Nom"
            icon={User}
            placeholder="Dupont"
            required
          />

          <InputField
            name="email"
            label="Email"
            icon={Mail}
            type="email"
            placeholder="jean.dupont@email.com"
            required
          />

          <InputField
            name="phone"
            label="Téléphone"
            icon={Phone}
            type="tel"
            placeholder="06 12 34 56 78"
            required
          />
        </div>
      </div>

      {/* Adresse de livraison */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-500" />
          Adresse de livraison
        </h3>

        <div className="space-y-4">
          <InputField
            name="address"
            label="Adresse"
            icon={Home}
            placeholder="123 Rue de la République"
            required
          />

          <InputField
            name="address2"
            label="Complément d'adresse"
            icon={Home}
            placeholder="Appartement, étage, bâtiment... (optionnel)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              name="postalCode"
              label="Code postal"
              icon={Map}
              placeholder="75001"
              required
              maxLength={5}
            />

            <div className="md:col-span-2">
              <InputField
                name="city"
                label="Ville"
                icon={MapPin}
                placeholder="Paris"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-semibold text-neutral-900 mb-1.5">
              Pays <span className="text-error-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="
                  w-full pl-12 pr-4 py-3.5 rounded-xl
                  border-2 border-neutral-200 focus:border-primary-500
                  bg-white
                  focus:outline-none focus:ring-4 focus:ring-primary-100
                  transition-all duration-200
                "
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Luxembourg">Luxembourg</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="instructions" className="block text-sm font-semibold text-neutral-900 mb-1.5">
              Instructions de livraison (optionnel)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              placeholder="Code d'accès, instructions spéciales..."
              className="
                w-full px-4 py-3 rounded-xl
                border-2 border-neutral-200 focus:border-primary-500
                focus:outline-none focus:ring-4 focus:ring-primary-100
                transition-all duration-200
                resize-none
              "
            />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="saveAddress"
            checked={formData.saveAddress}
            onChange={handleChange}
            className="mt-1 w-5 h-5 rounded border-2 border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          />
          <div>
            <span className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
              Sauvegarder cette adresse
            </span>
            <p className="text-sm text-neutral-600 mt-0.5">
              Pour vos prochaines commandes
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="sameAsBilling"
            checked={formData.sameAsBilling}
            onChange={handleChange}
            className="mt-1 w-5 h-5 rounded border-2 border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          />
          <div>
            <span className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
              Utiliser comme adresse de facturation
            </span>
            <p className="text-sm text-neutral-600 mt-0.5">
              L'adresse de facturation sera identique
            </p>
          </div>
        </label>
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
        >
          Continuer vers le paiement
        </Button>
      </div>
    </form>
  );
}

export default ShippingForm;