// ============================================
// FICHIER 3: src/components/favorites/FavoritesStats.jsx
// Statistiques des favoris
// ============================================

import React from 'react';
import { Heart, DollarSign, Package, TrendingDown } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

function FavoritesStats({ stats }) {
  const statsData = [
    {
      icon: Heart,
      label: "Total favoris",
      value: stats.total,
      color: "from-red-400 to-pink-500"
    },
    {
      icon: DollarSign,
      label: "Valeur totale",
      value: formatPrice(stats.totalValue),
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Package,
      label: "Disponibles",
      value: stats.available,
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: TrendingDown,
      label: "Prix moyen",
      value: formatPrice(stats.avgPrice),
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-primary transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default FavoritesStats;