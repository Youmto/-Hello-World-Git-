// ============================================
// FICHIER 3: src/components/product/TrustBadges.jsx
// Badges de confiance pour rassurer l'acheteur
// ============================================

import React from 'react';
import { Shield, Truck, RefreshCw, Award } from 'lucide-react';

function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Paiement sécurisé",
      description: "SSL & 3D Secure"
    },
    {
      icon: Truck,
      title: "Livraison suivie",
      description: "Suivi en temps réel"
    },
    {
      icon: RefreshCw,
      title: "Retour 14 jours",
      description: "Satisfait ou remboursé"
    },
    {
      icon: Award,
      title: "Garantie qualité",
      description: "Articles vérifiés"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg p-4 text-center border border-orange-100"
        >
          <badge.icon className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-900 mb-1">{badge.title}</p>
          <p className="text-xs text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;