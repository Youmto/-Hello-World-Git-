// ============================================
// FICHIER: src/components/product/ProductReviews.jsx
// Section avis clients
// ============================================

import React from 'react';
import { Star, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

function ProductReviews({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun avis pour le moment</h3>
        <p className="text-gray-600 mb-6">Soyez le premier à laisser un avis sur ce produit</p>
        <Button>Écrire un avis</Button>
      </div>
    );
  }

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
          <div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Basé sur {reviews.length} avis</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.slice(0, 3).map((review, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-gray-900">{review.user || 'Utilisateur'}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment || 'Très bon produit !'}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <Button variant="outline">Voir tous les avis</Button>
        </div>
      )}
    </div>
  );
}

export default ProductReviews;