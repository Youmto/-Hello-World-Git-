// ============================================
// FICHIER 2: src/components/profile/OrderHistory.jsx
// Historique des commandes
// ============================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, Download, Truck, CheckCircle } from 'lucide-react';
import { formatPrice, formatDate } from '../../utils/formatters';
import Badge from '../common/Badge';
import Button from '../common/Button';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, delivered, cancelled

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      // TODO: Appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Données mockées
      setOrders([
        {
          id: 'UM12345678',
          date: '2025-01-10T10:30:00Z',
          status: 'livree',
          items: 3,
          total: 149.97,
          trackingNumber: 'FR1234567890'
        },
        {
          id: 'UM12345677',
          date: '2025-01-05T14:20:00Z',
          status: 'expediee',
          items: 1,
          total: 89.99,
          trackingNumber: 'FR0987654321'
        },
        {
          id: 'UM12345676',
          date: '2024-12-20T09:15:00Z',
          status: 'livree',
          items: 2,
          total: 125.50,
          trackingNumber: null
        }
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      en_attente: { variant: 'warning', label: 'En attente', icon: Package },
      confirmee: { variant: 'info', label: 'Confirmée', icon: CheckCircle },
      expediee: { variant: 'primary', label: 'Expédiée', icon: Truck },
      livree: { variant: 'success', label: 'Livrée', icon: CheckCircle },
      annulee: { variant: 'danger', label: 'Annulée', icon: Package }
    };

    const config = statusConfig[status] || statusConfig.en_attente;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} size="sm">
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'pending') return ['en_attente', 'confirmee', 'expediee'].includes(order.status);
    if (filter === 'delivered') return order.status === 'livree';
    if (filter === 'cancelled') return order.status === 'annulee';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes commandes</h2>
          
          {/* Filtres */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Toutes' },
              { value: 'pending', label: 'En cours' },
              { value: 'delivered', label: 'Livrées' },
              { value: 'cancelled', label: 'Annulées' }
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`
                  px-4 py-2 rounded-lg font-semibold text-sm transition-all
                  ${filter === f.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">Commande #{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Passée le {formatDate(order.date)}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(order.total)}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{order.items} article{order.items > 1 ? 's' : ''}</span>
                    {order.trackingNumber && (
                      <span className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Suivi: {order.trackingNumber}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon={Eye}>
                      Détails
                    </Button>
                    <Button variant="ghost" size="sm" icon={Download}>
                      Facture
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Aucune commande trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;