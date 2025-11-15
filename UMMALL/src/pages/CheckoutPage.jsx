// ============================================
// FICHIER: src/pages/CheckoutPage.jsx
// Design Premium inspiré de Stripe, Shopify, Apple
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Package,
  CheckCircle,
  ChevronRight,
  Lock,
  Shield,
  AlertCircle,
  ArrowLeft,
  Truck,
  Calendar
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import { formatPrice } from '../utils/formatters';

// Composants spécifiques Checkout
import ProgressStepper from '../components/checkout/ProgressStepper';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderReview from '../components/checkout/OrderReview';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import OrderSummaryPanel from '../components/checkout/OrderSummaryPanel';

function CheckoutPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const { cartItems, total, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Données du formulaire
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderId, setOrderId] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Steps configuration
  const steps = [
    { id: 1, title: 'Livraison', icon: MapPin },
    { id: 2, title: 'Paiement', icon: CreditCard },
    { id: 3, title: 'Vérification', icon: Package },
    { id: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  // Rediriger si panier vide
  useEffect(() => {
    if (cartItems.length === 0 && currentStep < 4) {
      toast.info('Votre panier est vide');
      navigate('/cart');
    }
  }, [cartItems, currentStep]);

  // Calculer les frais d'expédition selon la méthode
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    pickup: 0
  };

  const shippingCost = shippingCosts[shippingMethod];
  const finalTotal = total + shippingCost;

  // Validation étape 1
  const validateShippingForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    const emptyFields = requiredFields.filter(field => !shippingData[field]?.trim());
    
    if (emptyFields.length > 0) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return false;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingData.email)) {
      toast.error('Email invalide');
      return false;
    }

    // Validation téléphone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(shippingData.phone.replace(/\s/g, ''))) {
      toast.error('Numéro de téléphone invalide');
      return false;
    }

    return true;
  };

  // Validation étape 2
  const validatePaymentForm = () => {
    if (paymentMethod === 'card') {
      const { cardNumber, cardName, expiryDate, cvv } = paymentData;
      
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error('Veuillez remplir toutes les informations de paiement');
        return false;
      }

      // Validation numéro de carte (16 chiffres)
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Numéro de carte invalide');
        return false;
      }

      // Validation CVV (3 chiffres)
      if (cvv.length !== 3) {
        toast.error('CVV invalide');
        return false;
      }
    }

    return true;
  };

  // Navigation entre étapes
  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateShippingForm()) return;
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!validatePaymentForm()) return;
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (!acceptTerms) {
        toast.error('Veuillez accepter les conditions générales');
        return;
      }
      await handlePlaceOrder();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Passer la commande
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // TODO: Remplacer par appel API réel
      // const response = await orderService.create({
      //   items: cartItems,
      //   shipping: shippingData,
      //   shippingMethod,
      //   payment: { method: paymentMethod, ...paymentData },
      //   total: finalTotal
      // });

      // Simuler traitement
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Générer un ID de commande
      const newOrderId = 'UM' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);

      // Vider le panier
      clearCart();

      // Passer à la confirmation
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      toast.success('Commande passée avec succès ! 🎉');

    } catch (error) {
      toast.error('Erreur lors du paiement. Veuillez réessayer.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header avec stepper */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Retour au panier</span>
            </button>
            
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-gray-600 font-semibold">Paiement sécurisé</span>
            </div>
          </div>

          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GAUCHE: Formulaires (2/3) */}
          <div className="lg:col-span-2">
            
            {/* Étape 1: Livraison */}
            {currentStep === 1 && (
              <ShippingForm
                data={shippingData}
                onChange={setShippingData}
                shippingMethod={shippingMethod}
                onShippingMethodChange={setShippingMethod}
              />
            )}

            {/* Étape 2: Paiement */}
            {currentStep === 2 && (
              <PaymentForm
                method={paymentMethod}
                onMethodChange={setPaymentMethod}
                data={paymentData}
                onChange={setPaymentData}
              />
            )}

            {/* Étape 3: Vérification */}
            {currentStep === 3 && (
              <OrderReview
                shippingData={shippingData}
                shippingMethod={shippingMethod}
                paymentMethod={paymentMethod}
                cartItems={cartItems}
                total={finalTotal}
                acceptTerms={acceptTerms}
                onAcceptTermsChange={setAcceptTerms}
              />
            )}

            {/* Étape 4: Confirmation */}
            {currentStep === 4 && (
              <OrderConfirmation
                orderId={orderId}
                shippingData={shippingData}
                total={finalTotal}
              />
            )}

            {/* Boutons de navigation */}
            {currentStep < 4 && (
              <div className="mt-8 flex gap-4">
                {currentStep > 1 && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    icon={ArrowLeft}
                    disabled={isProcessing}
                  >
                    Retour
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  fullWidth={currentStep === 1}
                  icon={currentStep === 3 ? Lock : ChevronRight}
                  iconPosition="right"
                  isLoading={isProcessing}
                  className="flex-1"
                >
                  {currentStep === 1 && 'Continuer vers le paiement'}
                  {currentStep === 2 && 'Continuer vers la vérification'}
                  {currentStep === 3 && 'Payer maintenant'}
                </Button>
              </div>
            )}
          </div>

          {/* DROITE: Récapitulatif commande (1/3) */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <OrderSummaryPanel
                cartItems={cartItems}
                shippingCost={shippingCost}
                shippingMethod={shippingMethod}
                total={finalTotal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;