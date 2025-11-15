// ============================================
// FICHIER 6: src/components/profile/Notifications.jsx
// Préférences de notifications
// ============================================

import React, { useState } from 'react';
import { Bell, Mail, Smartphone, MessageSquare } from 'lucide-react';
import { useToast } from '../common/Toast';

function Notifications() {
  const toast = useToast();
  const [preferences, setPreferences] = useState({
    orderUpdates: { email: true, push: true, sms: false },
    promotions: { email: true, push: false, sms: false },
    recommendations: { email: false, push: false, sms: false },
    newsletter: { email: true, push: false, sms: false }
  });

  const handleToggle = (category, channel) => {
    setPreferences({
      ...preferences,
      [category]: {
        ...preferences[category],
        [channel]: !preferences[category][channel]
      }
    });
    toast.success('Préférences mises à jour');
  };

  const notificationTypes = [
    {
      id: 'orderUpdates',
      icon: Package,
      title: 'Commandes',
      description: 'Statut de vos commandes et livraisons'
    },
    {
      id: 'promotions',
      icon: Bell,
      title: 'Promotions',
      description: 'Offres spéciales et codes promo'
    },
    {
      id: 'recommendations',
      icon: MessageSquare,
      title: 'Recommandations',
      description: 'Produits qui pourraient vous plaire'
    },
    {
      id: 'newsletter',
      icon: Mail,
      title: 'Newsletter',
      description: 'Actualités et nouveautés UMMALL'
    }
  ];

  const channels = [
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'push', icon: Bell, label: 'Push' },
    { id: 'sms', icon: Smartphone, label: 'SMS' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Préférences de notifications</h2>

        <div className="space-y-6">
          {notificationTypes.map((type) => (
            <div key={type.id} className="border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center flex-shrink-0">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pl-16">
                {channels.map((channel) => (
                  <label
                    key={channel.id}
                    className="flex items-center gap-2 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={preferences[type.id][channel.id]}
                      onChange={() => handleToggle(type.id, channel.id)}
                      className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <channel.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">{channel.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;