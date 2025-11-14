// ============================================
// FICHIER 2: src/components/product/SellerCard.jsx
// Carte vendeur avec informations et actions
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageCircle, MapPin, Clock, Award, ChevronRight } from 'lucide-react';
import { formatRelativeDate } from '../../utils/formatters';

function SellerCard({ seller }) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Vendu par</h3>
      
      <div className="flex items-start gap-4 mb-4">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{seller.name}</h4>
            {seller.verifiedSeller && (
              <Award className="w-5 h-5 text-blue-500" title="Vendeur vérifié" />
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{seller.rating}</span>
              <span>({seller.reviewCount} avis)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Répond en {seller.responseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Membre depuis {new Date(seller.memberSince).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Contacter le vendeur
        </button>
        
        <Link to={`/seller/${seller.id}`}>
          <button className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
            Voir la boutique
            <ChevronRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SellerCard;