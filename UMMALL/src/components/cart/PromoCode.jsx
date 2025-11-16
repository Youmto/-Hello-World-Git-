// ============================================
// FICHIER: src/components/cart/PromoCode.jsx
// Design Premium - Code promotionnel
// ============================================

import React, { useState } from 'react';
import { Tag, Check, X, AlertCircle, Loader } from 'lucide-react';
import Button from '../common/Button';

function PromoCode({ onApply, activeCode = null, onRemove }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(!activeCode);

  // Codes promo valides (normalement depuis API)
  const validCodes = {
    'BIENVENUE10': { discount: 10, type: 'percentage' },
    'PROMO20': { discount: 20, type: 'percentage' },
    'FIRST15': { discount: 15, type: 'percentage' },
    'FREESHIP': { discount: 0, type: 'shipping' },
    'SAVE5': { discount: 5, type: 'fixed' },
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length <= 20) {
      setCode(value);
      if (status === 'error') {
        setStatus('idle');
        setErrorMessage('');
      }
    }
  };

  const handleApply = async () => {
    if (code.length < 3) {
      setStatus('error');
      setErrorMessage('Le code doit contenir au moins 3 caractères');
      return;
    }

    setStatus('loading');

    // Simuler appel API
    setTimeout(() => {
      const promoData = validCodes[code];

      if (promoData) {
        setStatus('success');
        if (onApply) {
          onApply(code, promoData);
        }
        setCode('');
        setIsExpanded(false);
      } else {
        setStatus('error');
        setErrorMessage('Code invalide ou expiré');
      }
    }, 800);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    setStatus('idle');
    setIsExpanded(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && code.length >= 3 && status !== 'loading') {
      handleApply();
    }
  };

  // Si code actif et non expanded
  if (activeCode && !isExpanded) {
    return (
      <div className="bg-success-50 border border-success-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
              <Check className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-success-900">
                  Code "{activeCode}" appliqué
                </span>
                <Tag className="w-4 h-4 text-success-600" />
              </div>
              <p className="text-sm text-success-700 mt-0.5">
                Réduction appliquée avec succès !
              </p>
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="
              p-2 rounded-lg
              text-success-700 hover:text-success-900
              hover:bg-success-100
              transition-colors
            "
            aria-label="Retirer le code promo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3">
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-primary-600" />
        <h3 className="font-semibold text-neutral-900">
          Code promotionnel
        </h3>
      </div>

      {/* Input + Bouton */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={code}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ex: BIENVENUE10"
            disabled={status === 'loading'}
            className={`
              w-full px-4 py-3 rounded-lg
              border-2 transition-all duration-200
              font-mono text-sm font-semibold
              placeholder:font-sans placeholder:font-normal
              ${status === 'error' 
                ? 'border-error-500 focus:border-error-600 bg-error-50' 
                : status === 'success'
                ? 'border-success-500 focus:border-success-600 bg-success-50'
                : 'border-neutral-200 focus:border-primary-500 bg-white'
              }
              ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}
              focus:outline-none focus:ring-4 focus:ring-primary-100
            `}
          />

          {/* Icon status dans input */}
          {status === 'loading' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader className="w-5 h-5 text-primary-500 animate-spin" />
            </div>
          )}
        </div>

        <Button
          onClick={handleApply}
          disabled={code.length < 3 || status === 'loading'}
          variant="primary"
          size="medium"
          className="shrink-0"
        >
          {status === 'loading' ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            'Appliquer'
          )}
        </Button>
      </div>

      {/* Messages */}
      {status === 'error' && errorMessage && (
        <div className="flex items-start gap-2 text-sm text-error-600 bg-error-50 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {status === 'success' && !activeCode && (
        <div className="flex items-start gap-2 text-sm text-success-600 bg-success-50 rounded-lg p-3">
          <Check className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Code appliqué avec succès !</span>
        </div>
      )}

      {/* Codes suggérés (optionnel) */}
      {status === 'idle' && !activeCode && (
        <div className="pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-600 mb-2">
            Codes disponibles :
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(validCodes).slice(0, 3).map((validCode) => (
              <button
                key={validCode}
                onClick={() => setCode(validCode)}
                className="
                  px-3 py-1.5 rounded-lg
                  bg-primary-50 text-primary-700
                  text-xs font-mono font-semibold
                  hover:bg-primary-100
                  transition-colors
                "
              >
                {validCode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PromoCode;