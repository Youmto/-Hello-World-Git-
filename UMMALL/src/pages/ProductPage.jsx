// ============================================
// FICHIER: src/pages/ProductPage.jsx
// Design Premium inspiré des meilleurs sites e-commerce
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  ShoppingBag,
  Shield,
  Truck,
  RefreshCw,
  Star,
  MapPin,
  MessageCircle,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Package,
  Award
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Breadcrumb from '../components/common/Breadcrumb';
import { ProductCardSkeleton } from '../components/common/Loader';
import { formatPrice, formatRelativeDate } from '../utils/formatters';
import { CONDITION_LABELS } from '../utils/constants';

// Import des composants spécifiques
import ProductImageGallery from '../components/product/ProductImageGallery';
import SellerCard from '../components/product/SellerCard';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';
import TrustBadges from '../components/product/TrustBadges';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Charger le produit
  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      // TODO: Remplacer par l'appel API réel
      // const data = await productService.getById(id);
      
      // Données mockées pour la démo
      setTimeout(() => {
        setProduct({
          id: parseInt(id),
          title: "Nike Air Max 90 - Édition Limitée",
          brand: "Nike",
          category: { id: 2, name: "Chaussures", slug: "chaussures" },
          price: 89.99,
          originalPrice: 149.99,
          condition: "comme_neuf",
          stock: 3,
          description: `Découvrez les iconiques Nike Air Max 90 dans cette édition limitée qui célèbre le style intemporel et le confort légendaire.

**Caractéristiques principales :**
• Amorti Air Max visible pour un confort optimal
• Empiècements en cuir et mesh pour une durabilité accrue
• Design emblématique qui traverse les décennies
• Semelle en caoutchouc avec motif gaufré pour une adhérence supérieure

**Détails du produit :**
• État : Comme neuf, porté 2-3 fois seulement
• Aucun défaut visible
• Boîte d'origine incluse
• Livré avec facture d'achat

Parfait pour compléter un look streetwear ou casual. Ces baskets iconiques s'adaptent à tous les styles !`,
          sizes: ['38', '39', '40', '41', '42', '43'],
          colors: ['Blanc/Rouge', 'Noir/Blanc'],
          images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
            'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800',
            'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'
          ],
          seller: {
            id: 1,
            name: "Marie Dubois",
            avatar: "https://i.pravatar.cc/150?img=5",
            rating: 4.9,
            reviewCount: 234,
            responseTime: "< 2h",
            memberSince: "2022-03-15",
            verifiedSeller: true
          },
          likes: 247,
          views: 1523,
          createdAt: "2025-01-10T10:30:00Z",
          shipping: {
            methods: [
              { name: "Standard", price: 5.99, duration: "3-5 jours" },
              { name: "Express", price: 12.99, duration: "1-2 jours" },
              { name: "Retrait en main propre", price: 0, duration: "À convenir" }
            ],
            freeShippingThreshold: 50
          },
          reviews: [
            {
              id: 1,
              user: "Jean Martin",
              rating: 5,
              comment: "Produit conforme à la description, livraison rapide. Très satisfait !",
              date: "2025-01-08T14:20:00Z",
              helpful: 12
            },
            {
              id: 2,
              user: "Sophie Laurent",
              rating: 5,
              comment: "Excellent état, comme neuf effectivement. Vendeur très réactif.",
              date: "2025-01-05T09:15:00Z",
              helpful: 8
            }
          ]
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error("Erreur lors du chargement du produit");
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.warning("Veuillez sélectionner une taille");
      return;
    }
    
    addToCart(product, quantity);
    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        <span>Produit ajouté au panier !</span>
      </div>
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    if (isFavorite(product.id)) {
      toast.info("Retiré des favoris");
    } else {
      toast.success("Ajouté aux favoris ❤️");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Découvrez ${product.title} sur UMMALL`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      setShowShareModal(true);
    }
  };

  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Produit non trouvé</h2>
        <p className="text-gray-600 mb-6">Ce produit n'existe pas ou a été supprimé.</p>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: product.category.name, href: `/category/${product.category.slug}` },
    { label: product.title }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* GAUCHE: Galerie d'images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} />
            
            {/* Trust badges sous les images */}
            <TrustBadges />
          </div>

          {/* DROITE: Informations produit */}
          <div className="space-y-6">
            
            {/* En-tête avec titre et actions */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                </div>
                
                {/* Actions: Favoris & Partage */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={handleToggleFavorite}
                    className="p-3 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isFavorite(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all"
                    aria-label="Partager"
                  >
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Badges et statistiques */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success">{CONDITION_LABELS[product.condition]}</Badge>
                {discount > 0 && (
                  <Badge variant="danger">-{discount}%</Badge>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{product.likes} favoris</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>•</span>
                  <span className="ml-2">{product.views} vues</span>
                </div>
              </div>
            </div>

            {/* Prix */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600 font-semibold">
                Vous économisez {formatPrice(product.originalPrice - product.price)} !
              </p>
              
              {/* Stock disponible */}
              <div className="mt-4 flex items-center gap-2">
                {product.stock > 5 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      En stock - Livraison rapide
                    </span>
                  </>
                ) : product.stock > 0 ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-600">
                      Plus que {product.stock} en stock !
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-red-600">
                      Rupture de stock
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Sélection taille (si applicable) */}
            {product.sizes && (
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Choisissez votre taille
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        py-3 px-4 rounded-lg border-2 font-semibold transition-all
                        ${selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-primary hover:bg-orange-50'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Quantité
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-16 h-10 text-center border-2 border-gray-200 rounded-lg font-bold text-lg focus:outline-none focus:border-primary"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                >
                  +
                </button>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.stock} disponibles)
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                variant="primary"
                size="lg"
                fullWidth
                disabled={product.stock === 0}
                className="text-lg font-bold py-4"
              >
                <ShoppingBag className="w-6 h-6" />
                Acheter maintenant
              </Button>
              
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="lg"
                fullWidth
                disabled={product.stock === 0 || isInCart(product.id)}
                className="text-lg font-bold py-4"
              >
                {isInCart(product.id) ? 'Déjà dans le panier' : 'Ajouter au panier'}
              </Button>
            </div>

            {/* Avantages */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Livraison rapide</p>
                  <p className="text-sm text-gray-600">Reçu en 3-5 jours ouvrés</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Achat sécurisé</p>
                  <p className="text-sm text-gray-600">Paiement 100% sécurisé</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Retour facile</p>
                  <p className="text-sm text-gray-600">14 jours pour changer d'avis</p>
                </div>
              </div>
            </div>

            {/* Carte vendeur */}
            <SellerCard seller={product.seller} />
          </div>
        </div>

        {/* Tabs: Description, Avis, Livraison */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="border-b">
            <div className="flex">
              {['description', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-4 font-semibold text-sm transition-all border-b-2
                    ${activeTab === tab
                      ? 'border-primary text-primary bg-orange-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {tab === 'description' && 'Description'}
                  {tab === 'reviews' && `Avis (${product.reviews.length})`}
                  {tab === 'shipping' && 'Livraison & Retours'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {product.description}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews reviews={product.reviews} productId={product.id} />
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Options de livraison</h3>
                  <div className="space-y-3">
                    {product.shipping.methods.map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-semibold">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.duration}</p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">
                          {method.price === 0 ? 'Gratuit' : formatPrice(method.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {product.shipping.freeShippingThreshold && (
                    <p className="mt-4 text-sm text-green-600 font-semibold">
                      🎉 Livraison gratuite dès {formatPrice(product.shipping.freeShippingThreshold)} d'achat
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Politique de retour</h3>
                  <p className="text-gray-700">
                    Vous avez 14 jours pour retourner votre article s'il ne vous convient pas.
                    Le produit doit être dans son état d'origine avec tous les accessoires.
                    Les frais de retour sont à votre charge sauf en cas de défaut.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Produits similaires */}
        <RelatedProducts currentProductId={product.id} categoryId={product.category.id} />
      </div>
    </div>
  );
}

// Skeleton de chargement
function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-200 rounded-lg h-96 animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;