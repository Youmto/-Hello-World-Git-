// ============================================
// FICHIER 4: src/components/cart/PromoCode.jsx
// Champ code promo avec validation
// ============================================

import React, { useState } from 'react';
import { Tag, CheckCircle, XCircle } from 'lucide-react';
import Button from '../common/Button';

function PromoCode({ code, onCodeChange, onApply }) {
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  // Codes promo mockés
  const validCodes = {
    'BIENVENUE10': { discount: 10, type: 'percentage' },
    'PROMO20': { discount: 20, type: 'percentage' },
    'NOEL2025': { discount: 15, type: 'fixed' }
  };

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Veuillez entrer un code promo');
      return;
    }

    setIsApplying(true);
    setError('');

    // Simuler un appel API
    setTimeout(() => {
      const promoData = validCodes[code.toUpperCase()];
      
      if (promoData) {
        setIsApplied(true);
        onApply(promoData.discount);
      } else {
        setError('Code promo invalide');
        setIsApplied(false);
      }
      
      setIsApplying(false);
    }, 800);
  };

  const handleRemove = () => {
    setIsApplied(false);
    onCodeChange('');
    onApply(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-gray-900">Code promo</h3>
      </div>

      {!isApplied ? (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                onCodeChange(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Entrez votre code"
              className={`
                flex-1 px-4 py-3 border-2 rounded-lg font-semibold uppercase
                focus:outline-none focus:ring-2 focus:ring-primary
                ${error ? 'border-red-500' : 'border-gray-200'}
              `}
            />
            <Button
              onClick={handleApply}
              variant="primary"
              isLoading={isApplying}
              disabled={!code.trim()}
            >
              Appliquer
            </Button>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-600">
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">{error}</span>
            </div>
          )}

          {/* Codes disponibles (pour la démo) */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              Codes disponibles pour tester :
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(validCodes).map((validCode) => (
                <button
                  key={validCode}
                  onClick={() => onCodeChange(validCode)}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono hover:bg-blue-200 transition-colors"
                >
                  {validCode}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-bold text-green-900">{code}</p>
                <p className="text-sm text-green-700">Code appliqué avec succès</p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="text-sm text-red-600 hover:text-red-700 font-semibold"
            >
              Retirer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromoCode;
