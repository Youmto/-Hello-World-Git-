// ============================================
// FICHIER: src/pages/ProfilePage.jsx
// Design Premium - Compte utilisateur complet
// ============================================

import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Lock,
  Heart,
  Bell,
  CreditCard,
  LogOut,
  Settings,
  ChevronRight
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';

// Sous-pages
import ProfileInfo from '../components/profile/ProfileInfo';
import OrderHistory from '../components/profile/OrderHistory';
import AddressBook from '../components/profile/AddressBook';
import SecuritySettings from '../components/profile/SecuritySettings';
import PaymentMethods from '../components/profile/PaymentMethods';
import Notifications from '../components/profile/Notifications';

function ProfilePage() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();

  // Si non connecté, rediriger
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
  };

  // Menu de navigation
  const menuItems = [
    {
      path: '/profile',
      label: 'Mon profil',
      icon: User,
      description: 'Informations personnelles'
    },
    {
      path: '/profile/orders',
      label: 'Mes commandes',
      icon: Package,
      description: 'Historique et suivi'
    },
    {
      path: '/profile/addresses',
      label: 'Adresses',
      icon: MapPin,
      description: 'Adresses de livraison'
    },
    {
      path: '/profile/payment',
      label: 'Moyens de paiement',
      icon: CreditCard,
      description: 'Cartes et comptes'
    },
    {
      path: '/profile/security',
      label: 'Sécurité',
      icon: Lock,
      description: 'Mot de passe et 2FA'
    },
    {
      path: '/profile/notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Préférences d\'alerte'
    }
  ];

  const isActive = (path) => {
    if (path === '/profile') {
      return location.pathname === '/profile';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-pink-500 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.firstName} className="w-full h-full rounded-full object-cover" />
              ) : (
                user?.firstName?.charAt(0)
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bonjour, {user?.firstName} !
              </h1>
              <p className="text-white text-opacity-90">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* GAUCHE: Menu de navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <nav>
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-4 p-4 border-b transition-all group
                      ${isActive(item.path)
                        ? 'bg-orange-50 border-l-4 border-l-primary text-primary'
                        : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                      }
                    `}
                  >
                    <item.icon className={`
                      w-5 h-5 
                      ${isActive(item.path) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}
                    `} />
                    <div className="flex-1">
                      <p className={`
                        font-semibold text-sm
                        ${isActive(item.path) ? 'text-primary' : 'text-gray-900'}
                      `}>
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                    <ChevronRight className={`
                      w-4 h-4
                      ${isActive(item.path) ? 'text-primary' : 'text-gray-400'}
                    `} />
                  </Link>
                ))}

                {/* Déconnexion */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-all text-red-600 border-t"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold text-sm">Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>

          {/* DROITE: Contenu */}
          <div className="lg:col-span-3">
            <Routes>
              <Route index element={<ProfileInfo />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="addresses" element={<AddressBook />} />
              <Route path="payment" element={<PaymentMethods />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="notifications" element={<Notifications />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;