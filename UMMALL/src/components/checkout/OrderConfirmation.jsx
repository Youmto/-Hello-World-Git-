// ============================================
// FICHIER 5: src/components/checkout/OrderConfirmation.jsx
// Page de confirmation après paiement
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Package, 
  Mail, 
  Download, 
  Home,
  ArrowRight,
  Truck,
  Calendar
} from 'lucide-react';
import Button from '../common/Button';
import { formatPrice } from '../../utils/formatters';

function OrderConfirmation({ orderId, shippingData, total }) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Animation de succès */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 animate-in zoom-in duration-500">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Commande confirmée ! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Merci pour votre achat ! Votre commande est en cours de traitement.
        </p>

        {/* Numéro de commande */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-pink-50 border-2 border-primary rounded-full px-6 py-3">
          <Package className="w-5 h-5 text-primary" />
          <div className="text-left">
            <p className="text-xs text-gray-600 font-semibold">N° de commande</p>
            <p className="text-lg font-bold text-primary">{orderId}</p>
          </div>
        </div>
      </div>

      {/* Informations importantes */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-pink-500 p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Prochaines étapes</h2>
          <p className="text-sm opacity-90">Voici ce qui va se passer maintenant</p>
        </div>

        {/* Timeline */}
        <div className="p-6 space-y-6">
          
          {/* Étape 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Confirmation envoyée</h3>
              <p className="text-sm text-gray-600">
                Un email de confirmation a été envoyé à{' '}
                <span className="font-semibold">{shippingData.email}</span>
              </p>
            </div>
          </div>

          {/* Connecteur */}
          <div className="ml-6 w-0.5 h-8 bg-gray-200" />

          {/* Étape 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Préparation de la commande</h3>
              <p className="text-sm text-gray-600">
                Votre commande est en cours de préparation. Vous recevrez un email dès son expédition.
              </p>
            </div>
          </div>

          {/* Connecteur */}
          <div className="ml-6 w-0.5 h-8 bg-gray-200" />

          {/* Étape 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Livraison estimée</h3>
              <p className="text-sm text-gray-600">
                Votre colis devrait arriver d'ici le{' '}
                <span className="font-semibold">
                  {estimatedDelivery.toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Récapitulatif de commande */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h3>
        
        <div className="space-y-3 pb-4 border-b">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Montant total</span>
            <span className="font-bold text-gray-900">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mode de paiement</span>
            <span className="font-semibold text-gray-900">Carte bancaire</span>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">Adresse de livraison</p>
          <p className="text-sm text-gray-600">
            {shippingData.firstName} {shippingData.lastName}<br />
            {shippingData.address}<br />
            {shippingData.postalCode} {shippingData.city}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Link to="/profile/orders">
          <Button variant="primary" size="lg" fullWidth icon={Package}>
            Suivre ma commande
          </Button>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all font-semibold text-gray-700">
            <Download className="w-5 h-5" />
            Télécharger la facture
          </button>
          
          <Link to="/">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all font-semibold text-gray-700 w-full">
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </button>
          </Link>
        </div>
      </div>

      {/* Message support */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
        <h4 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h4>
        <p className="text-sm text-gray-700 mb-4">
          Notre équipe est là pour répondre à toutes vos questions.
        </p>
        <Button variant="outline" size="sm">
          Contacter le support
        </Button>
      </div>
    </div>
  );
}

export default OrderConfirmation;