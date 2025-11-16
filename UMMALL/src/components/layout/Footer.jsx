// ============================================
// FOOTER v2.0 - PREMIUM
// Design: Élégant, Informatif, Moderne
// Inspirations: Apple, Shopify, Farfetch
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Instagram, Twitter, Linkedin, Youtube,
  Mail, Phone, MapPin, Send, Heart, Shield, Truck, Award,
  CreditCard, Lock, CheckCircle, ArrowRight
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: {
      title: 'À propos',
      links: [
        { name: 'Notre histoire', path: '/about' },
        { name: 'Carrières', path: '/careers' },
        { name: 'Presse', path: '/press' },
        { name: 'Blog', path: '/blog' },
        { name: 'Partenaires', path: '/partners' }
      ]
    },
    shop: {
      title: 'Shopping',
      links: [
        { name: 'Nouveautés', path: '/new' },
        { name: 'Tendances', path: '/trending' },
        { name: 'Femme', path: '/women' },
        { name: 'Homme', path: '/men' },
        { name: 'Enfants', path: '/kids' }
      ]
    },
    help: {
      title: 'Aide',
      links: [
        { name: 'Centre d\'aide', path: '/help' },
        { name: 'Livraison', path: '/shipping' },
        { name: 'Retours', path: '/returns' },
        { name: 'Suivi commande', path: '/track' },
        { name: 'Tailles', path: '/size-guide' }
      ]
    },
    legal: {
      title: 'Légal',
      links: [
        { name: 'Conditions générales', path: '/terms' },
        { name: 'Politique de confidentialité', path: '/privacy' },
        { name: 'Cookies', path: '/cookies' },
        { name: 'CGV', path: '/cgv' },
        { name: 'Mentions légales', path: '/legal' }
      ]
    }
  };

  const trustBadges = [
    {
      icon: Shield,
      title: 'Paiement Sécurisé',
      description: 'SSL & 3D Secure'
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: '2-5 jours ouvrés'
    },
    {
      icon: Award,
      title: 'Qualité Garantie',
      description: 'Articles vérifiés'
    },
    {
      icon: CheckCircle,
      title: 'Retours Faciles',
      description: '14 jours satisfait'
    }
  ];

  const paymentMethods = [
    'Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', name: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, url: '#', name: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Twitter, url: '#', name: 'Twitter', color: 'hover:text-sky-600' },
    { icon: Linkedin, url: '#', name: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Youtube, url: '#', name: 'YouTube', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-200">
      
      {/* Top Section - Trust Badges */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="container-fluid mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="group text-center p-6 rounded-2xl bg-neutral-50 hover:bg-gradient-to-br hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow duration-300">
                  <badge.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-1 text-sm">
                  {badge.title}
                </h4>
                <p className="text-xs text-neutral-600">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-fluid mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          
          {/* Brand Column - Larger */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">U</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">
                UMMALL
              </span>
            </div>

            {/* Tagline */}
            <p className="text-neutral-600 leading-relaxed max-w-sm">
              La marketplace de la mode circulaire. Achetez et vendez des articles de mode de seconde main en toute confiance.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500" />
                Newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all text-sm"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-neutral-500">
                Recevez nos offres exclusives et nouveautés
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`
                    w-11 h-11 rounded-xl bg-neutral-100 hover:bg-white border-2 border-transparent hover:border-neutral-200
                    flex items-center justify-center
                    text-neutral-600 ${social.color}
                    transition-all duration-300 hover:scale-110 hover:shadow-lg
                  `}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-neutral-600 hover:text-primary-600 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-neutral-200 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-neutral-600">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-0.5">Email</div>
                <a href="mailto:contact@ummall.com" className="text-sm font-semibold hover:text-primary-600 transition-colors">
                  contact@ummall.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-600">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-0.5">Téléphone</div>
                <a href="tel:+33123456789" className="text-sm font-semibold hover:text-primary-600 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-600">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-0.5">Adresse</div>
                <p className="text-sm font-semibold">
                  Paris, France
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 bg-neutral-50/50">
        <div className="container-fluid mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-neutral-600 flex items-center gap-2">
              <span>© {currentYear} UMMALL.</span>
              <span className="hidden md:inline">Tous droits réservés.</span>
              <span className="flex items-center gap-1">
                Fait avec <Heart className="w-3 h-3 fill-red-500 text-red-500" /> à Paris
              </span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                Paiement sécurisé
              </span>
              <div className="flex items-center gap-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Made with Love Badge */}
      <div className="bg-gradient-to-r from-primary-600 via-pink-600 to-purple-600 py-2">
        <div className="container-fluid mx-auto">
          <p className="text-center text-white text-xs font-semibold flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Connexion 100% sécurisée SSL
            <span className="mx-2">•</span>
            <Shield className="w-3 h-3" />
            Vos données sont protégées
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;