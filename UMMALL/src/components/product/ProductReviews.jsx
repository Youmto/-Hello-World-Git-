// ============================================
// FICHIER 4: src/components/product/ProductReviews.jsx
// Section avis clients avec filtres et pagination
// ============================================

import React, { useState } from 'react';
import { Star, ThumbsUp, AlertCircle } from 'lucide-react';
import { formatRelativeDate } from '../../utils/formatters';
import Button from '../common/Button';

function ProductReviews({ reviews = [], productId }) {
  const [sortBy, setSortBy] = useState('recent');

  // Calculer la moyenne des notes
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Distribution des notes
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0
      ? Math.round((reviews.filter((r) => r.rating === rating).length / reviews.length) * 100)
      : 0
  }));

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun avis pour le moment</h3>
        <p className="text-gray-600 mb-6">Soyez le premier à laisser un avis sur ce produit</p>
        <Button variant="primary">Écrire un avis</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Résumé des avis */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Moyenne globale */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="text-5xl font-bold text-gray-900">{averageRating}</span>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
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

        {/* Distribution des notes */}
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 w-12">
                {item.rating} <Star className="w-3 h-3 inline fill-yellow-400 text-yellow-400" />
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres */}
      <div className="flex items-center justify-between border-t border-b py-4">
        <h3 className="font-bold text-gray-900">
          {reviews.length} avis client{reviews.length > 1 ? 's' : ''}
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="recent">Plus récents</option>
          <option value="helpful">Plus utiles</option>
          <option value="rating_high">Note la plus haute</option>
          <option value="rating_low">Note la plus basse</option>
        </select>
      </div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900">{review.user}</span>
                  <span className="text-sm text-gray-500">
                    {formatRelativeDate(review.date)}
                  </span>
                </div>
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
            </div>
            
            <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
            
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Utile ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Bouton voir plus */}
      {reviews.length > 5 && (
        <div className="text-center pt-4">
          <Button variant="outline">Voir tous les avis</Button>
        </div>
      )}
    </div>
  );
}

export default ProductReviews;