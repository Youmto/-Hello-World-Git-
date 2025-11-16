// ============================================
// FICHIER: src/components/profile/OrderHistory.jsx
// Design Premium - Historique commandes
// ============================================

import React, { useState } from 'react';
import { Package, Eye, Download, Truck, Search, Filter, Calendar } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Button from '../common/Button';
import Badge from '../common/Badge';

function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock orders
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '15 Nov 2024',
      status: 'delivered',
      total: 129.99,
      itemCount: 3,
      items: [
        { title: 'Nike Air Max', image: 'https://picsum.photos/80/80?random=1' },
        { title: 'Adidas Shirt', image: 'https://picsum.photos/80/80?random=2' },
      ],
      trackingNumber: '1234567890'
    },
    {
      id: 'ORD-2024-002',
      date: '10 Nov 2024',
      status: 'shipped',
      total: 89.50,
      itemCount: 2,
      items: [
        { title: 'Zara Jacket', image: 'https://picsum.photos/80/80?random=3' },
      ],
      trackingNumber: '0987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '5 Nov 2024',
      status: 'processing',
      total: 199.00,
      itemCount: 1,
      items: [
        { title: 'Designer Bag', image: 'https://picsum.photos/80/80?random=4' },
      ],
    },
  ];

  const statusConfig = {
    processing: { label: 'En préparation', color: 'warning', icon: Package },
    shipped: { label: 'Expédiée', color: 'info', icon: Truck },
    delivered: { label: 'Livrée', color: 'success', icon: Package },
    cancelled: { label: 'Annulée', color: 'error', icon: Package },
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-6 h-6 text-primary-600" />
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Mes commandes
            </h2>
            <p className="text-sm text-neutral-600">
              {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par numéro..."
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none"
            />
          </div>

          {/* Statut */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="processing">En préparation</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>

          {/* Date */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none"
          >
            <option value="all">Toutes les dates</option>
            <option value="month">Ce mois</option>
            <option value="3months">3 derniers mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Liste commandes */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Images */}
                  <div className="flex gap-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img
                        key={i}
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ))}
                    {order.itemCount > 3 && (
                      <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-600">
                        +{order.itemCount - 3}
                      </div>
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-neutral-900 mb-1">
                          Commande {order.id}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {order.date} • {order.itemCount} article{order.itemCount > 1 ? 's' : ''}
                        </p>
                      </div>
                      <Badge variant={config.color}>
                        <StatusIcon className="w-4 h-4" />
                        <span>{config.label}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                      <span className="font-semibold text-neutral-900">
                        Total: {formatPrice(order.total)}
                      </span>
                      {order.trackingNumber && (
                        <>
                          <span>•</span>
                          <span>Suivi: {order.trackingNumber}</span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="small" icon={<Eye className="w-4 h-4" />}>
                        Détails
                      </Button>
                      {order.trackingNumber && (
                        <Button variant="outline" size="small" icon={<Truck className="w-4 h-4" />}>
                          Suivre
                        </Button>
                      )}
                      <Button variant="outline" size="small" icon={<Download className="w-4 h-4" />}>
                        Facture
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-neutral-600">
              Modifiez vos filtres ou passez votre première commande
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;